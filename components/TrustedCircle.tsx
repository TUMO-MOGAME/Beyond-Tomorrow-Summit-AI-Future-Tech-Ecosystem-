"use client";

import { motion, AnimatePresence } from "framer-motion";

export type AlertState = "idle" | "sending" | "sent";

/**
 * Trusted Circle: when risk crosses the threshold, Aegis notifies a pre-designated
 * family member — the real-world circuit-breaker for elder fraud. Renders as a phone
 * mockup showing the alert text arriving.
 */
export default function TrustedCircle({
  state,
  contactName = "Sarah (daughter)",
  protectedName = "Margaret",
  channel = "mock",
}: {
  state: AlertState;
  contactName?: string;
  protectedName?: string;
  channel?: string;
}) {
  return (
    <div className="rounded-xl border border-aegis-border bg-aegis-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">👨‍👩‍👧</span>
          <span className="text-sm font-semibold text-white">Trusted Circle</span>
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">
          Alerting {contactName}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-24 items-center justify-center rounded-lg border border-dashed border-aegis-border text-xs text-slate-600"
          >
            Family is alerted automatically if a scam is detected
          </motion.div>
        )}

        {state === "sending" && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-24 items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 text-sm text-amber-300"
          >
            <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
            Notifying {contactName}…
          </motion.div>
        )}

        {state === "sent" && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="space-y-2"
          >
            {/* phone-style alert bubble */}
            <div className="rounded-2xl bg-red-500/15 p-3 ring-1 ring-red-500/30">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase text-red-300">
                🛡️ Aegis Alert · now
              </div>
              <p className="text-sm text-slate-100">
                ⚠️ Aegis detected a likely <strong>scam</strong> targeting{" "}
                <strong>{protectedName}</strong> on a phone call right now. Tactics: fake emergency,
                impersonation, urgent wire transfer. <strong>Please call {protectedName} now.</strong>
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-400">
              ✓ Alert delivered to {contactName}
              <span className="text-slate-600">
                ({channel === "mock" ? "demo mode" : `via ${channel}`})
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
