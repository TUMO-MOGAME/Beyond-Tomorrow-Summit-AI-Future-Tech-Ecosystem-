"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface FeedLine {
  speaker: string;
  text: string;
}

/**
 * Streaming transcript — soft chat bubbles. The protected person is on the right
 * in brand blue; the caller on the left, with the live line gently highlighted.
 */
export default function TranscriptFeed({
  lines,
  activeIndex,
}: {
  lines: FeedLine[];
  activeIndex: number;
}) {
  const isVictim = (speaker: string) => /margaret|you|victim/i.test(speaker);

  return (
    <div className="scroll-soft flex h-80 flex-col gap-2.5 overflow-y-auto rounded-3xl border border-line bg-haze p-4">
      {lines.length === 0 && (
        <div className="flex h-full items-center justify-center text-sm text-faint">
          Press &ldquo;Simulate live call&rdquo; to begin
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
              animate={{ opacity: active ? 1 : 0.85, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${victim ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-soft ${
                  victim
                    ? "rounded-br-md bg-brand text-white"
                    : active
                    ? "rounded-bl-md bg-white text-ink ring-2 ring-danger/30"
                    : "rounded-bl-md bg-white text-slatey"
                }`}
              >
                <div
                  className={`mb-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    victim ? "text-white/70" : "text-faint"
                  }`}
                >
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
