"use client";

import { motion, AnimatePresence } from "framer-motion";

export type ShieldState = "idle" | "pending" | "held";

/**
 * Mock banking panel. A pending transfer sits here; when Aegis detects danger,
 * it flips to HELD BY AEGIS — the fintech "money shot" of the demo.
 */
export default function TransactionShield({
  state,
  amount = "$4,000.00",
  recipient = "Bail Bonds Wire — Acct ****7781",
}: {
  state: ShieldState;
  amount?: string;
  recipient?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-aegis-border bg-aegis-panel">
      <div className="flex items-center justify-between border-b border-aegis-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏦</span>
          <span className="text-sm font-semibold text-white">First National — Transfers</span>
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">Transaction Shield</span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Outgoing wire transfer</div>
            <div className="mt-0.5 text-2xl font-bold text-white tabular-nums">{amount}</div>
            <div className="mt-0.5 text-xs text-slate-400">to {recipient}</div>
          </div>

          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full bg-slate-700/50 px-3 py-1 text-xs text-slate-400"
              >
                No activity
              </motion.span>
            )}
            {state === "pending" && (
              <motion.span
                key="pending"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                Pending…
              </motion.span>
            )}
            {state === "held" && (
              <motion.span
                key="held"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300"
              >
                🛡️ HELD BY AEGIS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {state === "held" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3"
            >
              <div className="flex items-start gap-2 text-sm text-red-200">
                <span className="text-base">🛑</span>
                <div>
                  <div className="font-semibold">Transfer frozen before completion.</div>
                  <div className="mt-0.5 text-xs text-red-300/90">
                    Aegis detected a high-risk scam during this conversation and paused the
                    payment. No money has left the account. Confirm with a trusted contact before
                    releasing.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
