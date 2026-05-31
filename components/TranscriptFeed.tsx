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
  const isVictim = (speaker: string) => /margaret|you|victim/i.test(speaker);

  return (
    <div className="scroll-soft flex h-80 flex-col gap-2.5 overflow-y-auto rounded-2xl border border-ink-line bg-ink/60 p-4">
      {lines.length === 0 && (
        <div className="flex h-full items-center justify-center text-sm text-taupe">
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
              animate={{ opacity: active ? 1 : 0.72, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${victim ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  victim
                    ? "rounded-br-md bg-gold/[0.12] text-gold-soft"
                    : active
                    ? "rounded-bl-md bg-clay/[0.12] text-cream ring-1 ring-clay/35"
                    : "rounded-bl-md bg-ink-raised text-cream/90"
                }`}
              >
                <div className="mb-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-taupe">
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
