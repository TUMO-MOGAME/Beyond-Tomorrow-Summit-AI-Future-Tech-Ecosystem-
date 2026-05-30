import type { ScamAnalysis, Tactic } from "./scamSchema";

/**
 * Offline heuristic analyzer used when no LLM API key is configured (LLM_PROVIDER=mock
 * or no key present). Lets you develop and demo the UI without a key. It is intentionally
 * simple — the real intelligence is the LLM-powered Scam DNA Engine in llm.ts.
 */
const SIGNALS: Array<{
  name: string;
  severity: Tactic["severity"];
  patterns: RegExp[];
  explanation: string;
  weight: number;
}> = [
  {
    name: "Urgency",
    severity: "high",
    patterns: [/right now/i, /immediately/i, /within \d+ (minutes|hours)/i, /before it'?s too late/i, /hurry/i, /act now/i, /ahora mismo/i, /no hay (mucho )?tiempo/i, /en los próximos minutos/i],
    explanation: "Real institutions give you time; scammers manufacture panic so you can't think.",
    weight: 22,
  },
  {
    name: "Authority Impersonation",
    severity: "high",
    patterns: [/this is your (bank|grandson|grandma|son|daughter)/i, /from the (irs|bank|police|government|court)/i, /officer\b/i, /attorney/i, /it'?s me/i, /soy yo/i, /soy (tu )?(mateo|nieto|hijo|abogado)/i, /tu abogado/i],
    explanation: "Claiming to be a trusted authority or relative is the core of impersonation scams.",
    weight: 20,
  },
  {
    name: "Secrecy",
    severity: "high",
    patterns: [/don'?t tell (anyone|mom|dad|your family)/i, /keep this (between us|a secret)/i, /just between you and me/i, /no le digas a (mamá|nadie|tu familia)/i, /que quede entre nosotros/i],
    explanation: "Demanding secrecy isolates the victim from people who would spot the scam.",
    weight: 20,
  },
  {
    name: "Fear / Threat",
    severity: "high",
    patterns: [/arrest(ed)?/i, /jail/i, /lawsuit|sued|legal action/i, /account (will be )?(closed|suspended|frozen)/i, /deport/i, /warrant/i, /me arrestaron/i, /(en la )?cárcel/i, /accidente/i],
    explanation: "Threats of arrest, loss, or harm pressure victims into compliance.",
    weight: 18,
  },
  {
    name: "Irreversible Payment",
    severity: "high",
    patterns: [/gift card/i, /wire (transfer|the money)/i, /bitcoin|crypto|usdt/i, /western union|moneygram/i, /zelle|cash app|venmo/i, /bail/i, /transferencia bancaria/i, /fianza/i],
    explanation: "Gift cards, wires, and crypto can't be reversed — the scammer's preferred payment.",
    weight: 22,
  },
  {
    name: "Too-Good Reward",
    severity: "medium",
    patterns: [/you'?ve won/i, /lottery|prize|sweepstakes/i, /tax refund/i, /guaranteed returns?/i, /double your (money|investment)/i],
    explanation: "Unexpected winnings or guaranteed returns are classic bait.",
    weight: 16,
  },
  {
    name: "Verification Evasion",
    severity: "medium",
    patterns: [/don'?t hang up/i, /stay on the (line|phone)/i, /don'?t call (them |him |her )?back/i, /i can'?t talk long/i, /no cuelgues/i, /quédate en la línea/i],
    explanation: "Discouraging you from independently checking the story is a major red flag.",
    weight: 14,
  },
];

export function mockAnalyze(conversation: string): ScamAnalysis {
  const tactics: Tactic[] = [];
  let score = 0;

  for (const sig of SIGNALS) {
    for (const re of sig.patterns) {
      const m = conversation.match(re);
      if (m) {
        const idx = m.index ?? 0;
        const start = Math.max(0, idx - 20);
        const end = Math.min(conversation.length, idx + m[0].length + 25);
        tactics.push({
          name: sig.name,
          severity: sig.severity,
          quote: conversation.slice(start, end).trim(),
          explanation: sig.explanation,
        });
        score += sig.weight;
        break; // one hit per tactic
      }
    }
  }

  score = Math.min(100, score);
  const verdict: ScamAnalysis["verdict"] = score >= 75 ? "danger" : score >= 40 ? "caution" : "safe";

  const summary =
    tactics.length === 0
      ? "This conversation looks normal. No manipulation tactics were detected."
      : `This message shows ${tactics.length} sign${tactics.length > 1 ? "s" : ""} of a scam, including ${tactics
          .slice(0, 3)
          .map((t) => t.name.toLowerCase())
          .join(", ")}. Be very careful — do not send money or share information.`;

  const recommendedAction =
    verdict === "safe"
      ? "No action needed. Stay alert as usual."
      : "Stop. Do not send money. Hang up and contact the person or organization using a number you already trust.";

  const voiceAuthenticitySignal = /grandson|grandma|grandpa|it'?s me|son|daughter|abuela|nieto|soy yo|mateo/i.test(conversation)
    ? "Possible cloned-voice scam: an unexpected emergency call from a relative asking for money."
    : "N/A";

  return { riskScore: score, verdict, tactics, plainLanguageSummary: summary, recommendedAction, voiceAuthenticitySignal };
}
