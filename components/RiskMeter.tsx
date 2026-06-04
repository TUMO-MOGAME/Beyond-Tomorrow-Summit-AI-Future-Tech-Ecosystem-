"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

type Verdict = "safe" | "caution" | "danger";

function colorFor(score: number): string {
  if (score >= 75) return "#E5564B"; // danger
  if (score >= 40) return "#E0A23C"; // caution
  return "#1FA97A"; // safe
}

function labelFor(score: number): Verdict {
  if (score >= 75) return "danger";
  if (score >= 40) return "caution";
  return "safe";
}

/**
 * Animated semicircular risk gauge — soft light theme. The arc, needle and
 * number animate up to the score; color shifts safe → caution → danger.
 */
export default function RiskMeter({ score }: { score: number }) {
  const radius = 120;
  const circumference = Math.PI * radius;
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
          {/* track */}
          <path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke="#E3EAF6"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* value arc */}
          <motion.path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
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
          <circle cx="140" cy="150" r="7" fill="#FFFFFF" stroke={color} strokeWidth="3" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-5xl font-semibold tabular-nums" style={{ color }}>
            {display}
          </span>
          <span
            className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.2em]"
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
