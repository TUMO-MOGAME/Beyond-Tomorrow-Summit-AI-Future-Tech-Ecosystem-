"use client";

import { motion } from "framer-motion";
import Icon, { type IconName } from "./Icon";

export interface Tactic {
  name: string;
  severity: "low" | "medium" | "high";
  quote: string;
  explanation: string;
}

const SEVERITY: Record<string, { dot: string; ring: string; label: string }> = {
  low: { dot: "bg-caution", ring: "border-caution/25", label: "text-caution" },
  medium: { dot: "bg-clay/80", ring: "border-clay/30", label: "text-clay" },
  high: { dot: "bg-clay", ring: "border-clay/45", label: "text-clay" },
};

const ICONS: Record<string, IconName> = {
  Urgency: "clock",
  "Authority Impersonation": "mask",
  Authority: "mask",
  Impersonation: "mask",
  Secrecy: "whisper",
  "Fear / Threat": "alert",
  "Fear/Threat": "alert",
  Fear: "alert",
  "Irreversible Payment": "money",
  "Too-Good Reward": "gift",
  "Trust Grooming": "heart-crack",
  "Verification Evasion": "ban",
};

export default function TacticCard({ tactic, index }: { tactic: Tactic; index: number }) {
  const s = SEVERITY[tactic.severity] ?? SEVERITY.high;
  const icon: IconName =
    ICONS[tactic.name] ??
    (Object.entries(ICONS).find(([k]) => tactic.name.includes(k))?.[1] as IconName) ??
    "flag";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl border bg-ink-panel/70 p-3.5 ${s.ring}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-raised text-clay">
          <Icon name={icon} size={16} />
        </span>
        <span className="font-medium text-cream">{tactic.name}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          <span className={`font-mono text-[10px] font-medium uppercase tracking-wider ${s.label}`}>
            {tactic.severity}
          </span>
        </span>
      </div>
      <p className="mt-2.5 border-l-2 border-ink-line2 pl-3 font-display text-sm italic text-sand">
        &ldquo;{tactic.quote}&rdquo;
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sand">{tactic.explanation}</p>
    </motion.div>
  );
}
