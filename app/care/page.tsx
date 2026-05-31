"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AegisLogo from "@/components/AegisLogo";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";

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

  const inputCls =
    "focus-gold mt-1.5 w-full rounded-xl border border-ink-line bg-ink p-3 text-cream placeholder:text-taupe";

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/" className="transition hover:opacity-80">
          <AegisLogo size={26} />
        </Link>
        <span className="eyebrow">Care Mode setup</span>
      </div>

      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-panel/70 px-3.5 py-1.5">
          <Icon name="users" size={14} className="text-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sand">
            You set this up once — for someone you love
          </span>
        </div>
        <h1 className="font-display text-4xl font-light tracking-tight text-cream">
          Protect someone you love, in three steps
        </h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-sand">
          You set it all up from <em className="text-cream not-italic">your</em> phone, in a few
          minutes. {senior || "Your relative"} does nothing — no app to open, no buttons to press.
          Aegis just watches over them, so they can keep living the way they always have.
        </p>
      </div>

      {/* warm header banner — the people you're protecting, living freely */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-ink-line shadow-lift">
        <Photo
          src="/images/couple-connected.webp"
          alt="An older couple sitting together on their sofa, smiling and waving on a video call"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="aspect-[16/7]"
        />
        <p className="absolute bottom-4 left-5 right-5 font-display text-lg italic text-cream sm:text-xl">
          They stay free to call, chat, and connect. Aegis only steps in when something&apos;s wrong.
        </p>
      </div>

      {/* progress */}
      <div className="mx-auto mt-10 flex max-w-md items-center justify-between">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold transition ${
                step >= n ? "bg-gold text-ink" : "border border-ink-line2 bg-ink-panel text-taupe"
              }`}
            >
              {step > n ? <Icon name="check" size={16} /> : n}
            </div>
            {n < 3 && (
              <div className={`mx-2 h-px flex-1 ${step > n ? "bg-gold" : "bg-ink-line"}`} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 rounded-3xl border border-ink-line bg-ink-panel p-7 shadow-panel"
      >
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-display text-xl text-cream">1. Who are you protecting?</h2>
            <label className="block text-sm text-sand">
              Their name
              <input value={senior} onChange={(e) => setSenior(e.target.value)} className={inputCls} />
            </label>
            <label className="block text-sm text-sand">
              Your relationship to them
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className={inputCls}
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
          <div className="space-y-5">
            <h2 className="font-display text-xl text-cream">2. Who should we alert?</h2>
            <p className="text-sm leading-relaxed text-sand">
              The Trusted Circle. If Aegis detects a scam targeting {senior || "them"}, these people
              are notified instantly — the real-world circuit breaker for elder fraud.
            </p>
            <label className="block text-sm text-sand">
              Primary contact name
              <input value={contact} onChange={(e) => setContact(e.target.value)} className={inputCls} />
            </label>
            <div className="flex items-start gap-2 rounded-xl border border-gold/20 bg-gold/[0.06] p-3 text-sm text-gold-soft">
              <Icon name="bulb" size={16} className="mt-0.5 shrink-0" />
              <span>
                You can add more contacts later. The first to respond can confirm or release a held
                payment.
              </span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-cream">3. How should Aegis protect them?</h2>
            <button
              onClick={() => setAutoFreeze((v) => !v)}
              className="flex w-full items-center justify-between gap-4 rounded-xl border border-ink-line bg-ink p-4 text-left transition hover:border-gold/30"
            >
              <div className="flex items-start gap-3">
                <Icon name="landmark" size={20} className="mt-0.5 text-gold" />
                <div>
                  <div className="font-medium text-cream">Auto-freeze risky payments</div>
                  <div className="text-sm text-sand">
                    Hold wires, gift cards &amp; crypto to new payees until you approve.
                  </div>
                </div>
              </div>
              <Toggle on={autoFreeze} />
            </button>
            <button
              onClick={() => setSilent((v) => !v)}
              className="flex w-full items-center justify-between gap-4 rounded-xl border border-ink-line bg-ink p-4 text-left transition hover:border-gold/30"
            >
              <div className="flex items-start gap-3">
                <Icon name="mute" size={20} className="mt-0.5 text-gold" />
                <div>
                  <div className="font-medium text-cream">Silent mode on their phone</div>
                  <div className="text-sm text-sand">
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
              className="rounded-full border border-ink-line px-5 py-2.5 text-sm font-medium text-sand transition hover:border-ink-line2 hover:text-cream"
            >
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="ml-auto flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-soft"
            >
              Continue <Icon name="arrow-right" size={16} />
            </button>
          ) : (
            <button
              onClick={() => setStep(4)}
              className="ml-auto flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink shadow-gold transition hover:bg-gold-soft"
            >
              <Icon name="shield-check" size={16} /> Activate protection
            </button>
          )}
        </div>
      </motion.div>

      {/* activated summary */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-3xl border border-sage/35 bg-sage/[0.07] p-8 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/15 text-sage">
            <Icon name="shield-check" size={30} />
          </span>
          <h2 className="mt-4 font-display text-2xl text-cream">
            {senior} is now protected by Aegis
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-sage">
            {contact} will be alerted instantly if a scam is detected.
            {autoFreeze && " Risky payments will be auto-held."}
            {silent && ` ${senior} won't have to do a thing.`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/guardian"
              className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-semibold text-ink transition hover:bg-gold-soft"
            >
              See the Guardian in action <Icon name="arrow-right" size={16} />
            </Link>
            <button
              onClick={() => setStep(1)}
              className="rounded-full border border-ink-line px-5 py-2.5 font-medium text-sand transition hover:text-cream"
            >
              Set up another
            </button>
          </div>
        </motion.div>
      )}

      <p className="eyebrow mt-10 text-center">
        {relation} · {senior} · protected by their family, not by themselves
      </p>
    </main>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        on ? "bg-gold" : "bg-ink-line2"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-ink transition ${
          on ? "translate-x-6" : "translate-x-1 bg-sand"
        }`}
      />
    </span>
  );
}
