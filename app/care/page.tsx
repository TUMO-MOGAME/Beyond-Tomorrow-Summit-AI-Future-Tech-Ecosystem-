"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AegisLogo from "@/components/AegisLogo";

/**
 * Care Mode setup — the zero-effort story made interactive.
 * A family member configures protection FOR a senior in 3 steps, from THEIR phone.
 * The senior never touches anything. This is the answer to "can old people use it?"
 */
export default function CareMode() {
  const [step, setStep] = useState(1);
  const [senior, setSenior] = useState("Margaret");
  const [relation, setRelation] = useState("Grandmother");
  const [contact, setContact] = useState("Sarah");
  const [autoFreeze, setAutoFreeze] = useState(true);
  const [silent, setSilent] = useState(true);

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="transition hover:opacity-80">
          <AegisLogo size={26} />
        </Link>
        <span className="text-sm text-slate-500">Care Mode setup</span>
      </div>

      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-aegis-border bg-aegis-panel px-4 py-1.5 text-sm text-blue-300">
          👨‍👩‍👧 You set this up once — for someone you love
        </div>
        <h1 className="text-3xl font-bold text-white">Protect a family member in 3 steps</h1>
        <p className="mx-auto mt-2 max-w-xl text-slate-400">
          Configure everything from <em>your</em> phone. {senior || "Your relative"} does nothing —
          no app to open, no buttons to press. Aegis just watches over them, quietly.
        </p>
      </div>

      {/* progress */}
      <div className="mx-auto mt-8 flex max-w-md items-center justify-between">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                step >= n ? "bg-blue-600 text-white" : "bg-aegis-panel text-slate-500"
              }`}
            >
              {step > n ? "✓" : n}
            </div>
            {n < 3 && (
              <div className={`mx-2 h-0.5 flex-1 ${step > n ? "bg-blue-600" : "bg-aegis-border"}`} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 rounded-2xl border border-aegis-border bg-aegis-panel p-6"
      >
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">1. Who are you protecting?</h2>
            <label className="block text-sm text-slate-400">
              Their name
              <input
                value={senior}
                onChange={(e) => setSenior(e.target.value)}
                className="mt-1 w-full rounded-lg border border-aegis-border bg-aegis-bg p-3 text-white outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm text-slate-400">
              Your relationship to them
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-aegis-border bg-aegis-bg p-3 text-white outline-none focus:border-blue-500"
              >
                <option>Grandmother</option>
                <option>Grandfather</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Aunt / Uncle</option>
                <option>Other relative</option>
              </select>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">2. Who should we alert?</h2>
            <p className="text-sm text-slate-400">
              The Trusted Circle. If Aegis detects a scam targeting {senior || "them"}, these people are
              notified instantly — the real-world circuit breaker for elder fraud.
            </p>
            <label className="block text-sm text-slate-400">
              Primary contact name
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 w-full rounded-lg border border-aegis-border bg-aegis-bg p-3 text-white outline-none focus:border-blue-500"
              />
            </label>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-sm text-blue-200">
              💡 You can add more contacts later. The first to respond can confirm or release a held payment.
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">3. How should Aegis protect them?</h2>
            <button
              onClick={() => setAutoFreeze((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg border border-aegis-border bg-aegis-bg p-4 text-left"
            >
              <div>
                <div className="font-medium text-white">🏦 Auto-freeze risky payments</div>
                <div className="text-sm text-slate-400">
                  Hold wires, gift cards & crypto to new payees until you approve.
                </div>
              </div>
              <Toggle on={autoFreeze} />
            </button>
            <button
              onClick={() => setSilent((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg border border-aegis-border bg-aegis-bg p-4 text-left"
            >
              <div>
                <div className="font-medium text-white">🔇 Silent mode on their phone</div>
                <div className="text-sm text-slate-400">
                  Runs invisibly. {senior || "They"} sees nothing unless danger is high.
                </div>
              </div>
              <Toggle on={silent} />
            </button>
          </div>
        )}

        {/* nav */}
        <div className="mt-6 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="rounded-lg border border-aegis-border px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-aegis-bg"
            >
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="ml-auto rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={() => setStep(4)}
              className="ml-auto rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Activate protection
            </button>
          )}
        </div>
      </motion.div>

      {/* activated summary */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-2xl border border-green-500/40 bg-green-500/10 p-6 text-center"
        >
          <div className="text-4xl">🛡️</div>
          <h2 className="mt-2 text-xl font-bold text-white">
            {senior} is now protected by Aegis
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-green-200">
            {contact} will be alerted instantly if a scam is detected.
            {autoFreeze && " Risky payments will be auto-held."}
            {silent && ` ${senior} won't have to do a thing.`}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/guardian" className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-500">
              See the Guardian in action →
            </Link>
            <button
              onClick={() => setStep(1)}
              className="rounded-lg border border-aegis-border px-5 py-2.5 font-medium text-slate-300 hover:bg-aegis-panel"
            >
              Set up another
            </button>
          </div>
        </motion.div>
      )}

      <p className="mt-8 text-center text-xs text-slate-600">
        {relation} · {senior} · protected by their family, not by themselves.
      </p>
    </main>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        on ? "bg-blue-600" : "bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </span>
  );
}
