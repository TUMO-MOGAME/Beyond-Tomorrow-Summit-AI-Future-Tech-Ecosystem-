import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { SCAM_SYSTEM_PROMPT, TOOL_NAME, TOOL_DESCRIPTION } from "./prompts";
import { SCAM_JSON_SCHEMA, ScamAnalysisSchema, type ScamAnalysis } from "./scamSchema";
import { mockAnalyze } from "./mockEngine";

export type Provider = "anthropic" | "openai" | "mock";

export interface AnalyzeMeta {
  channel?: string; // "phone call" | "sms" | "chat" | "email"
  caller?: string; // claimed identity, if known
}

/** Decide which provider to use based on env (with optional override). */
export function getProvider(): Provider {
  const override = process.env.LLM_PROVIDER?.toLowerCase();
  if (override === "mock") return "mock";
  if (override === "anthropic" && process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (override === "openai" && process.env.OPENAI_API_KEY) return "openai";
  // Auto-detect: prefer Anthropic, then OpenAI, then mock.
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
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

async function analyzeWithOpenAI(conversation: string, meta?: AnalyzeMeta): Promise<ScamAnalysis> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL || "gpt-4o";

  const resp = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SCAM_SYSTEM_PROMPT },
      { role: "user", content: buildUserContent(conversation, meta) },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "scam_analysis",
        schema: SCAM_JSON_SCHEMA as unknown as Record<string, unknown>,
        strict: true,
      },
    },
  });

  const content = resp.choices[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned empty content");
  return ScamAnalysisSchema.parse(JSON.parse(content));
}

export interface AnalyzeResult extends ScamAnalysis {
  provider: Provider;
  model: string;
}

/**
 * Analyze a conversation for scam risk.
 * Provider-agnostic: routes to Anthropic / OpenAI / mock and validates output.
 * Retries once on a validation/parse failure before giving up.
 */
export async function analyzeConversation(
  conversation: string,
  meta?: AnalyzeMeta
): Promise<AnalyzeResult> {
  const provider = getProvider();

  if (provider === "mock") {
    return { provider, model: "heuristic-mock", ...mockAnalyze(conversation) };
  }

  const run = provider === "anthropic" ? analyzeWithAnthropic : analyzeWithOpenAI;
  const model =
    provider === "anthropic"
      ? process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6"
      : process.env.OPENAI_MODEL || "gpt-4o";

  try {
    const result = await run(conversation, meta);
    return { provider, model, ...result };
  } catch (err) {
    // One retry — covers transient errors and the occasional schema miss.
    try {
      const result = await run(conversation, meta);
      return { provider, model, ...result };
    } catch (err2) {
      throw new Error(
        `Scam DNA Engine failed (${provider}/${model}): ${
          err2 instanceof Error ? err2.message : String(err2)
        }`
      );
    }
  }
}
