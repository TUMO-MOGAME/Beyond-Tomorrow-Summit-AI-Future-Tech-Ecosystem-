"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, ShieldCheck, Check } from "lucide-react";

export type AlertState = "idle" | "sending" | "sent";

/**
 * Trusted Circle: when risk crosses the threshold, Aegis notifies a loved one —
 * the real-world circuit-breaker for elder fraud. Shows the alert text arriving.
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
    <div className="rounded-3xl border border-line bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink">
          <Users size={17} className="text-brand" />
          <span className="text-sm font-semibold">Trusted Circle</span>
        </div>
        <span className="eyebrow">Alerting {contactName}</span>
      </div>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-line text-xs text-faint">
            Family is alerted automatically if a scam is detected
          </motion.div>
        )}

        {state === "sending" && (
          <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex h-24 items-center justify-center gap-2 rounded-2xl border border-caution/30 bg-caution/[0.06] text-sm text-caution">
            <span className="h-2 w-2 animate-ping rounded-full bg-caution" />
            Notifying {contactName}…
          </motion.div>
        )}

        {state === "sent" && (
          <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }} className="space-y-2.5">
            <div className="rounded-2xl rounded-bl-md bg-brand/[0.07] p-3.5 ring-1 ring-brand/15">
              <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-deep">
                <ShieldCheck size={12} /> Aegis Alert · now
              </div>
              <p className="text-sm leading-relaxed text-ink">
                Aegis detected a likely <strong className="text-danger">scam</strong> targeting{" "}
                <strong>{protectedName}</strong> on a phone call right now. Tactics: fake emergency,
                impersonation, urgent wire transfer. <strong>Please call {protectedName} now.</strong>
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-safe">
              <Check size={14} /> Alert delivered to {contactName}
              <span className="text-faint">
                ({channel === "mock" ? "demo mode" : `via ${channel}`})
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
