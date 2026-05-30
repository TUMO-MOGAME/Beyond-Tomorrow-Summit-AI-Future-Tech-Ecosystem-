"use client";

import { motion } from "framer-motion";

export interface Tactic {
  name: string;
  severity: "low" | "medium" | "high";
  quote: string;
  explanation: string;
}

const SEVERITY: Record<string, { dot: string; ring: string; label: string }> = {
  low: { dot: "bg-amber-400", ring: "border-amber-500/30", label: "text-amber-300" },
  medium: { dot: "bg-orange-500", ring: "border-orange-500/40", label: "text-orange-300" },
  high: { dot: "bg-red-500", ring: "border-red-500/50", label: "text-red-300" },
};

const ICONS: Record<string, string> = {
  Urgency: "⏱️",
  "Authority Impersonation": "🎭",
  Authority: "🎭",
  Impersonation: "🎭",
  Secrecy: "🤫",
  "Fear / Threat": "⚠️",
  "Fear/Threat": "⚠️",
  Fear: "⚠️",
  "Irreversible Payment": "💸",
  "Too-Good Reward": "🎁",
  "Trust Grooming": "💔",
  "Verification Evasion": "🚫",
};

export default function TacticCard({ tactic, index }: { tactic: Tactic; index: number }) {
  const s = SEVERITY[tactic.severity] ?? SEVERITY.high;
  const icon =
    ICONS[tactic.name] ??
    Object.entries(ICONS).find(([k]) => tactic.name.includes(k))?.[1] ??
    "🚩";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className={`rounded-lg border bg-aegis-panel p-3 ${s.ring}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-white">{tactic.name}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
          <span className={`text-[10px] font-bold uppercase ${s.label}`}>
            {tactic.severity}
          </span>
        </span>
      </div>
      <p className="mt-2 border-l-2 border-slate-600 pl-3 text-sm italic text-slate-300">
        “{tactic.quote}”
      </p>
      <p className="mt-1.5 text-sm text-slate-400">{tactic.explanation}</p>
    </motion.div>
  );
}
