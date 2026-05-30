"use client";

import { motion, AnimatePresence } from "framer-motion";

type Verdict = "safe" | "caution" | "danger";

const STYLES: Record<Verdict, { ring: string; text: string; label: string; icon: string }> = {
  safe: { ring: "border-green-500/50 bg-green-500/10", text: "text-green-400", label: "SAFE", icon: "✅" },
  caution: { ring: "border-amber-500/50 bg-amber-500/10", text: "text-amber-400", label: "CAUTION", icon: "⚠️" },
  danger: { ring: "border-red-500/50 bg-red-500/10", text: "text-red-400", label: "DANGER", icon: "🛑" },
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
        className={`rounded-xl border p-4 ${s.ring}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{s.icon}</span>
          <span className={`text-lg font-extrabold tracking-wide ${s.text}`}>{s.label}</span>
        </div>
        <p className="mt-2 text-sm text-slate-200">{summary}</p>
        <div className="mt-3 rounded-lg bg-blue-500/10 p-3 text-sm text-blue-200">
          👉 {recommendedAction}
        </div>
        {voiceSignal && voiceSignal !== "N/A" && (
          <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-300">
            <span>🎙️</span>
            <span>{voiceSignal}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
