"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface FeedLine {
  speaker: string;
  text: string;
}

/**
 * Streaming transcript view. Lines appear one-by-one as the "call" plays.
 * The most recent line is highlighted to draw the eye.
 */
export default function TranscriptFeed({
  lines,
  activeIndex,
}: {
  lines: FeedLine[];
  activeIndex: number;
}) {
  const isVictim = (speaker: string) =>
    /margaret|you|victim/i.test(speaker);

  return (
    <div className="flex h-80 flex-col gap-2 overflow-y-auto rounded-xl border border-aegis-border bg-aegis-bg p-4">
      {lines.length === 0 && (
        <div className="flex h-full items-center justify-center text-sm text-slate-600">
          Press “Simulate live call” to begin
        </div>
      )}
      <AnimatePresence initial={false}>
        {lines.map((line, i) => {
          const victim = isVictim(line.speaker);
          const active = i === activeIndex;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: active ? 1 : 0.7, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${victim ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                  victim
                    ? "bg-blue-600/20 text-blue-100"
                    : active
                    ? "bg-red-500/15 text-slate-100 ring-1 ring-red-500/40"
                    : "bg-aegis-panel text-slate-200"
                }`}
              >
                <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {line.speaker}
                </div>
                {line.text}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
