"use client";

import { motion, AnimatePresence } from "framer-motion";
import Icon, { type IconName } from "./Icon";

type Verdict = "safe" | "caution" | "danger";

const STYLES: Record<
  Verdict,
  { ring: string; text: string; label: string; icon: IconName; chip: string }
> = {
  safe: {
    ring: "border-sage/30 bg-sage/[0.07]",
    text: "text-sage",
    label: "SAFE",
    icon: "shield-check",
    chip: "bg-sage/10 text-sage",
  },
  caution: {
    ring: "border-caution/35 bg-caution/[0.07]",
    text: "text-caution",
    label: "CAUTION",
    icon: "alert",
    chip: "bg-caution/10 text-caution",
  },
  danger: {
    ring: "border-clay/40 bg-clay/[0.08]",
    text: "text-clay",
    label: "DANGER",
    icon: "shield",
    chip: "bg-clay/10 text-clay",
  },
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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={verdict}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl border p-4 ${s.ring}`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.chip}`}>
            <Icon name={s.icon} size={18} />
          </span>
          <span className={`font-mono text-sm font-semibold tracking-[0.2em] ${s.text}`}>
            {s.label}
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-cream">{summary}</p>
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-gold/20 bg-gold/[0.06] p-3 text-sm text-gold-soft">
          <Icon name="pointer" size={16} className="mt-0.5 shrink-0" />
          <span>{recommendedAction}</span>
        </div>
        {voiceSignal && voiceSignal !== "N/A" && (
          <div className="mt-2.5 flex items-start gap-2 text-xs text-caution">
            <Icon name="mic" size={14} className="mt-0.5 shrink-0" />
            <span>{voiceSignal}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
