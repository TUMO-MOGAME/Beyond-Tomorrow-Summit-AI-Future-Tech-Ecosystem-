"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

type Verdict = "safe" | "caution" | "danger";

function colorFor(score: number): string {
  if (score >= 75) return "#F0613F"; // clay — danger
  if (score >= 40) return "#E0B448"; // amber — caution
  return "#7FD6A6"; // sage — safe
}

function labelFor(score: number): Verdict {
  if (score >= 75) return "danger";
  if (score >= 40) return "caution";
  return "safe";
}

/**
 * Animated semicircular risk gauge. The needle + arc + number all animate
 * smoothly to the target score — the "climbing meter" moment. Tuned to the
 * calm palette so a high score reads as decisive, not as a blaring alarm.
 */
export default function RiskMeter({ score }: { score: number }) {
  const radius = 120;
  const circumference = Math.PI * radius; // half circle
  const progress = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  const dash = useTransform(progress, (v) => (v / 100) * circumference);

  useEffect(() => {
    const controls = animate(progress, score, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [score, progress]);

  const color = colorFor(display);
  const verdict = labelFor(display);
  const angle = -90 + (display / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 280, height: 160 }}>
        <svg width="280" height="160" viewBox="0 0 280 160">
          <defs>
            <filter id="meterGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* track */}
          <path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke="#1C1C1F"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* animated value arc */}
          <motion.path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            filter="url(#meterGlow)"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: useTransform(dash, (d) => circumference - d) }}
          />
          {/* needle */}
          <motion.line
            x1="140"
            y1="150"
            x2="140"
            y2="58"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ originX: "140px", originY: "150px" }}
            animate={{ rotate: angle }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          <circle cx="140" cy="150" r="7" fill="#000000" stroke={color} strokeWidth="2.5" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <motion.span
            key={verdict}
            className="font-mono text-5xl font-bold tabular-nums"
            style={{ color }}
          >
            {display}
          </motion.span>
          <span
            className="mt-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color }}
          >
            {verdict}
          </span>
        </div>
      </div>
      <div className="eyebrow mt-2">Live risk score</div>
    </div>
  );
}
