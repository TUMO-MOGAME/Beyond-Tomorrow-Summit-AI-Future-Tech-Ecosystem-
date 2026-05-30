"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

type Verdict = "safe" | "caution" | "danger";

function colorFor(score: number): string {
  if (score >= 75) return "#ef4444"; // danger
  if (score >= 40) return "#f59e0b"; // caution
  return "#22c55e"; // safe
}

function labelFor(score: number): Verdict {
  if (score >= 75) return "danger";
  if (score >= 40) return "caution";
  return "safe";
}

/**
 * Animated semicircular risk gauge. The needle + arc + number all animate
 * smoothly to the target score — this is the "climbing meter" wow moment.
 */
export default function RiskMeter({ score }: { score: number }) {
  const radius = 120;
  const circumference = Math.PI * radius; // half circle
  const progress = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  // arc length shown = fraction of the semicircle
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
  // needle angle: -90deg (left) to +90deg (right)
  const angle = -90 + (display / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 280, height: 160 }}>
        <svg width="280" height="160" viewBox="0 0 280 160">
          {/* track */}
          <path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke="#1e2740"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* animated value arc */}
          <motion.path
            d="M 20 150 A 120 120 0 0 1 260 150"
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: useTransform(dash, (d) => circumference - d) }}
          />
          {/* needle */}
          <motion.line
            x1="140"
            y1="150"
            x2="140"
            y2="55"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            style={{ originX: "140px", originY: "150px" }}
            animate={{ rotate: angle }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          <circle cx="140" cy="150" r="8" fill={color} />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <motion.span
            key={verdict}
            className="text-5xl font-black tabular-nums"
            style={{ color }}
          >
            {display}
          </motion.span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color }}
          >
            {verdict}
          </span>
        </div>
      </div>
      <div className="mt-1 text-xs text-slate-500">Live risk score</div>
    </div>
  );
}
