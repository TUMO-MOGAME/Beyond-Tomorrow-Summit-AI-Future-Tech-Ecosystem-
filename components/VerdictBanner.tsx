"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, ShieldAlert, ArrowRight, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Verdict = "safe" | "caution" | "danger";

const STYLES: Record<
  Verdict,
  { ring: string; text: string; chip: string; label: string; icon: LucideIcon }
> = {
  safe: { ring: "border-safe/25 bg-safe/[0.07]", text: "text-safe", chip: "bg-safe/12 text-safe", label: "SAFE", icon: ShieldCheck },
  caution: { ring: "border-caution/30 bg-caution/[0.08]", text: "text-caution", chip: "bg-caution/12 text-caution", label: "CAUTION", icon: AlertTriangle },
  danger: { ring: "border-danger/30 bg-danger/[0.08]", text: "text-danger", chip: "bg-danger/12 text-danger", label: "DANGER", icon: ShieldAlert },
};

export default function VerdictBanner({
  verdict,
  summary,
  recommendedAction,
  voiceSignal,
}: {
  verdict: Verdict;
  summary: string;
  recommendedAction: string;
  voiceSignal?: string;
}) {
  const s = STYLES[verdict];
  const Ico = s.icon;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={verdict}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className={`rounded-3xl border p-4 ${s.ring}`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${s.chip}`}>
            <Ico size={18} />
          </span>
          <span className={`text-sm font-bold tracking-[0.18em] ${s.text}`}>{s.label}</span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-ink">{summary}</p>
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-brand/15 bg-brand/[0.06] p-3 text-sm text-brand-deep">
          <ArrowRight size={16} className="mt-0.5 shrink-0" />
          <span>{recommendedAction}</span>
        </div>
        {voiceSignal && voiceSignal !== "N/A" && (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-caution">
            <Mic size={14} className="mt-0.5 shrink-0" />
            <span>{voiceSignal}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
