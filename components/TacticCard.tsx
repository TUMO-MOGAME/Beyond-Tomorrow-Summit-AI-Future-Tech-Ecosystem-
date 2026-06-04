"use client";

import { motion } from "framer-motion";
import {
  Clock,
  VenetianMask,
  EyeOff,
  AlertTriangle,
  Banknote,
  Gift,
  HeartCrack,
  Ban,
  Flag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Tactic {
  name: string;
  severity: "low" | "medium" | "high";
  quote: string;
  explanation: string;
}

const SEVERITY: Record<string, { dot: string; ring: string; label: string }> = {
  low: { dot: "bg-caution", ring: "border-caution/25", label: "text-caution" },
  medium: { dot: "bg-danger/80", ring: "border-danger/25", label: "text-danger" },
  high: { dot: "bg-danger", ring: "border-danger/35", label: "text-danger" },
};

const ICONS: Record<string, LucideIcon> = {
  Urgency: Clock,
  "Authority Impersonation": VenetianMask,
  Authority: VenetianMask,
  Impersonation: VenetianMask,
  Secrecy: EyeOff,
  "Fear / Threat": AlertTriangle,
  "Fear/Threat": AlertTriangle,
  Fear: AlertTriangle,
  "Irreversible Payment": Banknote,
  "Too-Good Reward": Gift,
  "Trust Grooming": HeartCrack,
  "Verification Evasion": Ban,
};

export default function TacticCard({ tactic, index }: { tactic: Tactic; index: number }) {
  const s = SEVERITY[tactic.severity] ?? SEVERITY.high;
  const Ico: LucideIcon =
    ICONS[tactic.name] ??
    Object.entries(ICONS).find(([k]) => tactic.name.includes(k))?.[1] ??
    Flag;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 18, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border bg-white p-3.5 shadow-soft ${s.ring}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-danger/10 text-danger">
          <Ico size={16} />
        </span>
        <span className="font-semibold text-ink">{tactic.name}</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${s.label}`}>
            {tactic.severity}
          </span>
        </span>
      </div>
      <p className="mt-2.5 border-l-2 border-line pl-3 font-hand text-base italic text-slatey">
        &ldquo;{tactic.quote}&rdquo;
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{tactic.explanation}</p>
    </motion.div>
  );
}
