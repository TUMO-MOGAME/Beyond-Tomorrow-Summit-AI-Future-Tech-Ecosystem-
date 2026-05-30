import { z } from "zod";

/** Zod schema — used to validate (and retry on) model output. */
export const TacticSchema = z.object({
  name: z.string(),
  severity: z.enum(["low", "medium", "high"]),
  quote: z.string(),
  explanation: z.string(),
});

export const ScamAnalysisSchema = z.object({
  riskScore: z.number().int().min(0).max(100),
  verdict: z.enum(["safe", "caution", "danger"]),
  tactics: z.array(TacticSchema),
  plainLanguageSummary: z.string(),
  recommendedAction: z.string(),
  voiceAuthenticitySignal: z.string(),
});

export type Tactic = z.infer<typeof TacticSchema>;
export type ScamAnalysis = z.infer<typeof ScamAnalysisSchema>;

/**
 * JSON Schema for structured output. Shared by:
 *  - Anthropic tool use (input_schema)
 *  - OpenAI structured outputs (response_format json_schema, strict mode)
 * Every property is required and additionalProperties:false for OpenAI strict compatibility.
 */
export const SCAM_JSON_SCHEMA = {
  type: "object",
  properties: {
    riskScore: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description: "Overall fraud risk, 0 (safe) to 100 (definite scam).",
    },
    verdict: {
      type: "string",
      enum: ["safe", "caution", "danger"],
      description: "safe (0-39), caution (40-74), danger (75-100).",
    },
    tactics: {
      type: "array",
      description: "Manipulation tactics detected. Empty if the conversation is benign.",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "Tactic name, e.g. 'Urgency', 'Authority Impersonation', 'Secrecy', 'Fear/Threat', 'Irreversible Payment', 'Too-Good Reward', 'Trust Grooming', 'Verification Evasion'.",
          },
          severity: { type: "string", enum: ["low", "medium", "high"] },
          quote: {
            type: "string",
            description: "The EXACT text span from the conversation that triggered this tactic.",
          },
          explanation: {
            type: "string",
            description: "One plain-language sentence explaining why this is dangerous.",
          },
        },
        required: ["name", "severity", "quote", "explanation"],
        additionalProperties: false,
      },
    },
    plainLanguageSummary: {
      type: "string",
      description: "2-3 short sentences a worried 70-year-old can understand.",
    },
    recommendedAction: {
      type: "string",
      description: "One concrete next step for the user.",
    },
    voiceAuthenticitySignal: {
      type: "string",
      description: "Note on possible cloned/synthetic voice, or 'N/A'.",
    },
  },
  required: [
    "riskScore",
    "verdict",
    "tactics",
    "plainLanguageSummary",
    "recommendedAction",
    "voiceAuthenticitySignal",
  ],
  additionalProperties: false,
} as const;
