import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { SCAM_SYSTEM_PROMPT, TOOL_NAME, TOOL_DESCRIPTION } from "./prompts";
import { SCAM_JSON_SCHEMA, ScamAnalysisSchema, type ScamAnalysis } from "./scamSchema";
import { mockAnalyze } from "./mockEngine";

// Anthropic uses its own SDK; every other provider below speaks the OpenAI
// chat-completions protocol, so they share one code path (just a different
// baseURL + key + model). This is what lets free providers plug straight in.
export type Provider =
  | "anthropic"
  | "openai"
  | "groq"
  | "gemini"
  | "openrouter"
  | "compatible"
  | "mock";

export interface AnalyzeMeta {
  channel?: string; // "phone call" | "sms" | "chat" | "email"
  caller?: string; // claimed identity, if known
}

const OPENAI_PROVIDERS: Provider[] = ["openai", "groq", "gemini", "openrouter", "compatible"];

/** Resolved connection details for an OpenAI-compatible provider. */
interface CompatConfig {
  apiKey: string;
  model: string;
  baseURL?: string; // undefined → official OpenAI endpoint
}

/**
 * Map a provider to its OpenAI-compatible {baseURL, key, model}.
 * Returns null if that provider has no key configured.
 *
 * Free-tier friendly defaults:
 *   GROQ_API_KEY        → llama-3.3-70b-versatile  (fast, open, free)
 *   GEMINI_API_KEY      → gemini-2.0-flash         (free, multilingual, multimodal)
 *   OPENROUTER_API_KEY  → meta-llama/llama-3.3-70b-instruct:free
 *   OPENAI_API_KEY      → gpt-4o (or any model via a custom OPENAI_BASE_URL)
 */
function compatConfig(provider: Provider): CompatConfig | null {
  switch (provider) {
    case "groq":
      return process.env.GROQ_API_KEY
        ? {
            apiKey: process.env.GROQ_API_KEY,
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            baseURL: "https://api.groq.com/openai/v1",
          }
        : null;
    case "gemini": {
      const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      return key
        ? {
            apiKey: key,
            model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
          }
        : null;
    }
    case "openrouter":
      return process.env.OPENROUTER_API_KEY
        ? {
            apiKey: process.env.OPENROUTER_API_KEY,
            model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free",
            baseURL: "https://openrouter.ai/api/v1",
          }
        : null;
    case "compatible": {
      // A bare "bring your own endpoint" escape hatch.
      const key = process.env.COMPATIBLE_API_KEY || process.env.OPENAI_API_KEY;
      const baseURL = process.env.COMPATIBLE_BASE_URL || process.env.OPENAI_BASE_URL;
      return key && baseURL
        ? { apiKey: key, model: process.env.COMPATIBLE_MODEL || process.env.OPENAI_MODEL || "gpt-4o", baseURL }
        : null;
    }
    case "openai":
    default:
      return process.env.OPENAI_API_KEY
        ? {
            apiKey: process.env.OPENAI_API_KEY,
            model: process.env.OPENAI_MODEL || "gpt-4o",
            baseURL: process.env.OPENAI_BASE_URL, // optional → official endpoint
          }
        : null;
  }
}

/** Decide which provider to use based on env (with optional override). */
export function getProvider(): Provider {
  const override = process.env.LLM_PROVIDER?.toLowerCase() as Provider | undefined;
  if (override === "mock") return "mock";
  if (override === "anthropic" && process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (override && OPENAI_PROVIDERS.includes(override) && compatConfig(override)) return override;

  // Auto-detect: Anthropic first, then the free providers, then OpenAI, then mock.
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) return "gemini";
  if (process.env.OPENROUTER_API_KEY) return "openrouter";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "mock";
}

function buildUserContent(conversation: string, meta?: AnalyzeMeta): string {
  const header = [
    meta?.channel ? `Channel: ${meta.channel}` : null,
    meta?.caller ? `Caller claims to be: ${meta.caller}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  return `${header ? header + "\n\n" : ""}Conversation to analyze:\n"""\n${conversation}\n"""`;
}

/** Pull a JSON object out of a model reply that may be fenced or chatty. */
function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  const slice = start >= 0 && end > start ? candidate.slice(start, end + 1) : candidate;
  return JSON.parse(slice);
}

async function analyzeWithAnthropic(conversation: string, meta?: AnalyzeMeta): Promise<ScamAnalysis> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  const msg = await client.messages.create({
    model,
    max_tokens: 1500,
    // cache_control enables prompt caching on the static system prompt. Cast to
    // bypass a typing gap in @anthropic-ai/sdk 0.32 (the API accepts it at runtime).
    system: [
      { type: "text", text: SCAM_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ] as unknown as Anthropic.MessageCreateParams["system"],
    tools: [
      {
        name: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input_schema: SCAM_JSON_SCHEMA as any,
      },
    ],
    tool_choice: { type: "tool", name: TOOL_NAME },
    messages: [{ role: "user", content: buildUserContent(conversation, meta) }],
  });

  const toolUse = msg.content.find((c) => c.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Anthropic did not return a tool_use block");
  }
  return ScamAnalysisSchema.parse(toolUse.input);
}

const JSON_ONLY_INSTRUCTION =
  "Respond with ONLY a single JSON object that matches this exact JSON schema — " +
  "no markdown, no code fences, no commentary:\n" +
  JSON.stringify(SCAM_JSON_SCHEMA);

/**
 * One analysis call against any OpenAI-compatible endpoint, tiered for
 * portability across providers that differ in JSON support:
 *   1) strict json_schema   (OpenAI, some others)
 *   2) json_object mode      (Groq, most)
 *   3) plain text + extract  (lowest common denominator)
 * Whichever succeeds first wins; output is always Zod-validated.
 */
async function analyzeWithCompatible(
  cfg: CompatConfig,
  conversation: string,
  meta?: AnalyzeMeta
): Promise<ScamAnalysis> {
  const client = new OpenAI({ apiKey: cfg.apiKey, baseURL: cfg.baseURL });
  const user = buildUserContent(conversation, meta);

  const attempt = async (mode: "schema" | "object" | "plain"): Promise<ScamAnalysis> => {
    const system =
      mode === "schema" ? SCAM_SYSTEM_PROMPT : `${SCAM_SYSTEM_PROMPT}\n\n${JSON_ONLY_INSTRUCTION}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {
      model: cfg.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    };
    if (mode === "schema") {
      params.response_format = {
        type: "json_schema",
        json_schema: { name: "scam_analysis", schema: SCAM_JSON_SCHEMA, strict: true },
      };
    } else if (mode === "object") {
      params.response_format = { type: "json_object" };
    }

    const resp = await client.chat.completions.create(params);
    const content = resp.choices[0]?.message?.content;
    if (!content) throw new Error("compatible provider returned empty content");
    return ScamAnalysisSchema.parse(extractJson(content));
  };

  // Cascade: try the richest mode, fall back gracefully.
  try {
    return await attempt("schema");
  } catch {
    try {
      return await attempt("object");
    } catch {
      return await attempt("plain");
    }
  }
}

export interface AnalyzeResult extends ScamAnalysis {
  provider: Provider;
  model: string;
}

/**
 * Analyze a conversation for scam risk.
 * Provider-agnostic: routes to Anthropic / any OpenAI-compatible provider / mock
 * and validates output. Retries once on a validation/parse failure before giving up.
 */
export async function analyzeConversation(
  conversation: string,
  meta?: AnalyzeMeta
): Promise<AnalyzeResult> {
  const provider = getProvider();

  if (provider === "mock") {
    return { provider, model: "heuristic-mock", ...mockAnalyze(conversation) };
  }

  if (provider === "anthropic") {
    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
    try {
      return { provider, model, ...(await analyzeWithAnthropic(conversation, meta)) };
    } catch {
      // One retry — covers transient errors and the occasional schema miss.
      return { provider, model, ...(await analyzeWithAnthropic(conversation, meta)) };
    }
  }

  // Every other provider is OpenAI-compatible.
  const cfg = compatConfig(provider);
  if (!cfg) {
    // Shouldn't happen (getProvider only returns configured providers), but be safe.
    return { provider: "mock", model: "heuristic-mock", ...mockAnalyze(conversation) };
  }

  try {
    return { provider, model: cfg.model, ...(await analyzeWithCompatible(cfg, conversation, meta)) };
  } catch (err) {
    try {
      return { provider, model: cfg.model, ...(await analyzeWithCompatible(cfg, conversation, meta)) };
    } catch (err2) {
      throw new Error(
        `Scam DNA Engine failed (${provider}/${cfg.model}): ${
          err2 instanceof Error ? err2.message : String(err2)
        }`
      );
    }
  }
}
