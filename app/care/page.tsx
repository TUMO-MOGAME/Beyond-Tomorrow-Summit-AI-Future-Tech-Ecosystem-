"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Check, Lightbulb, Landmark, VolumeX, ArrowRight, ShieldCheck } from "lucide-react";
import AegisLogo from "@/components/AegisLogo";
import Photo from "@/components/Photo";

/**
 * Care Mode setup — a family member configures protection FOR a senior in 3
 * steps, from THEIR phone. The senior never touches anything.
 */
export default function CareMode() {
  const [step, setStep] = useState(1);
  const [senior, setSenior] = useState("Margaret");
  const [relation, setRelation] = useState("Grandmother");
  const [contact, setContact] = useState("Sarah");
  const [autoFreeze, setAutoFreeze] = useState(true);
  const [silent, setSilent] = useState(true);

  const inputCls =
    "focus-brand mt-1.5 w-full rounded-2xl border border-line bg-haze p-3 text-ink placeholder:text-faint";

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/" className="transition hover:opacity-80">
          <AegisLogo size={26} />
        </Link>
        <span className="eyebrow">Care Mode setup</span>
      </div>

      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-1.5">
          <Users size={14} className="text-brand" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
            You set this up once — for someone you love
          </span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink">
          Protect someone you love, in three steps
        </h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slatey">
          You set it all up from <em className="not-italic font-medium text-ink">your</em> phone, in a few
          minutes. {senior || "Your relative"} does nothing — no app to open, no buttons to press.
          Aegis just watches over them, so they can keep living the way they always have.
        </p>
      </div>

      {/* warm header banner */}
      <div className="relative mt-8 overflow-hidden rounded-4xl border border-line shadow-card">
        <Photo
          src="/images/couple-connected.webp"
          alt="An older couple sitting together on their sofa, smiling and waving on a video call"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="aspect-[16/7]"
          overlay="none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <p className="absolute bottom-4 left-5 right-5 font-hand text-xl text-white sm:text-2xl">
          They stay free to call, chat, and connect. Aegis only steps in when something&apos;s wrong.
        </p>
      </div>

      {/* progress */}
      <div className="mx-auto mt-10 flex max-w-md items-center justify-between">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                step >= n ? "bg-brand text-white shadow-glow" : "border border-line bg-white text-faint"
              }`}
            >
              {step > n ? <Check size={16} /> : n}
            </div>
            {n < 3 && <div className={`mx-2 h-0.5 flex-1 rounded-full ${step > n ? "bg-brand" : "bg-line"}`} />}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 rounded-4xl border border-line bg-white p-7 shadow-card"
      >
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-ink">1. Who are you protecting?</h2>
            <label className="block text-sm font-medium text-slatey">
              Their name
              <input value={senior} onChange={(e) => setSenior(e.target.value)} className={inputCls} />
            </label>
            <label className="block text-sm font-medium text-slatey">
              Your relationship to them
              <select value={relation} onChange={(e) => setRelation(e.target.value)} className={inputCls}>
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
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-ink">2. Who should we alert?</h2>
            <p className="text-sm leading-relaxed text-slatey">
              The Trusted Circle. If Aegis detects a scam targeting {senior || "them"}, these people
              are notified instantly — the real-world circuit breaker for elder fraud.
            </p>
            <label className="block text-sm font-medium text-slatey">
              Primary contact name
              <input value={contact} onChange={(e) => setContact(e.target.value)} className={inputCls} />
            </label>
            <div className="flex items-start gap-2 rounded-2xl border border-brand/15 bg-brand/[0.06] p-3 text-sm text-brand-deep">
              <Lightbulb size={16} className="mt-0.5 shrink-0" />
              <span>
                You can add more contacts later. The first to respond can confirm or release a held payment.
              </span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">3. How should Aegis protect them?</h2>
            <button
              onClick={() => setAutoFreeze((v) => !v)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-haze p-4 text-left transition hover:border-brand/30"
            >
              <div className="flex items-start gap-3">
                <Landmark size={20} className="mt-0.5 text-brand" />
                <div>
                  <div className="font-semibold text-ink">Auto-freeze risky payments</div>
                  <div className="text-sm text-muted">
                    Hold wires, gift cards &amp; crypto to new payees until you approve.
                  </div>
                </div>
              </div>
              <Toggle on={autoFreeze} />
            </button>
            <button
              onClick={() => setSilent((v) => !v)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-haze p-4 text-left transition hover:border-brand/30"
            >
              <div className="flex items-start gap-3">
                <VolumeX size={20} className="mt-0.5 text-brand" />
                <div>
                  <div className="font-semibold text-ink">Silent mode on their phone</div>
                  <div className="text-sm text-muted">
                    Runs invisibly. {senior || "They"} sees nothing unless danger is high.
                  </div>
                </div>
              </div>
              <Toggle on={silent} />
            </button>
          </div>
        )}

        {/* nav */}
        <div className="mt-7 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-slatey transition hover:bg-mist hover:text-ink"
            >
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="ml-auto flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-deep"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setStep(4)}
              className="ml-auto flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-deep"
            >
              <ShieldCheck size={16} /> Activate protection
            </button>
          )}
        </div>
      </motion.div>

      {/* activated summary */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-4xl border border-safe/30 bg-safe/[0.07] p-8 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-safe/15 text-safe">
            <ShieldCheck size={30} />
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-ink">{senior} is now protected by Aegis</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slatey">
            {contact} will be alerted instantly if a scam is detected.
            {autoFreeze && " Risky payments will be auto-held."}
            {silent && ` ${senior} won't have to do a thing.`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/guardian"
              className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-white shadow-glow transition hover:bg-brand-deep"
            >
              See the Guardian in action <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setStep(1)}
              className="rounded-full border border-line px-5 py-2.5 font-semibold text-slatey transition hover:bg-mist hover:text-ink"
            >
              Set up another
            </button>
          </div>
        </motion.div>
      )}

      <p className="font-hand mt-10 text-center text-xl text-brand-deep/80">
        {relation} · {senior} · protected by their family, not by themselves
      </p>
    </main>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        on ? "bg-brand" : "bg-line"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-soft transition ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </span>
  );
}
