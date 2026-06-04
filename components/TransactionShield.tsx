"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Landmark, ShieldCheck, Lock } from "lucide-react";

export type ShieldState = "idle" | "pending" | "held";

/**
 * Mock banking panel. A pending transfer sits here; when Aegis detects danger it
 * flips to HELD BY AEGIS — the fintech "money shot".
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
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 text-ink">
          <Landmark size={17} className="text-brand" />
          <span className="text-sm font-semibold">First National — Transfers</span>
        </div>
        <span className="eyebrow">Transaction Shield</span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="eyebrow">Outgoing wire transfer</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-ink">{amount}</div>
            <div className="mt-0.5 text-xs text-muted">to {recipient}</div>
          </div>

          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="rounded-full bg-haze px-3 py-1 text-xs text-muted">
                No activity
              </motion.span>
            )}
            {state === "pending" && (
              <motion.span key="pending" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 rounded-full bg-caution/12 px-3 py-1 text-xs font-medium text-caution">
                <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-caution" />
                Pending…
              </motion.span>
            )}
            {state === "held" && (
              <motion.span key="held" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-1.5 rounded-full bg-danger/12 px-3 py-1 text-xs font-bold text-danger">
                <ShieldCheck size={14} /> HELD BY AEGIS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {state === "held" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mt-4 rounded-2xl border border-danger/25 bg-danger/[0.06] p-3">
              <div className="flex items-start gap-2.5 text-sm text-ink">
                <Lock size={18} className="mt-0.5 shrink-0 text-danger" />
                <div>
                  <div className="font-semibold">Transfer frozen before completion.</div>
                  <div className="mt-1 text-xs leading-relaxed text-muted">
                    Aegis detected a high-risk scam during this conversation and paused the payment.
                    No money has left the account. Confirm with a trusted contact before releasing.
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
