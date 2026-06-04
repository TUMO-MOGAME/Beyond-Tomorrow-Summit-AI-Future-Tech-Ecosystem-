"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanLine,
  Radio,
  Mic,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Users,
  Check,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FIXTURES, type Fixture } from "@/lib/fixtures";
import TranscriptFeed, { type FeedLine } from "@/components/TranscriptFeed";
import RiskMeter from "@/components/RiskMeter";
import TrustedCircle, { type AlertState } from "@/components/TrustedCircle";
import AegisLogo from "@/components/AegisLogo";

/**
 * Guardian Number — a self-contained, scripted walk-through of how Aegis screens
 * a real unknown call: consent → live screening → hold the caller → conference in
 * a loved one → safe resolution (or no-answer fallback). No Twilio, no API keys,
 * no network — it always plays cleanly (ideal for the demo video).
 */

type Stage = "idle" | "ringing" | "live" | "held" | "conferencing" | "joined" | "fallback";

const STREAM_MS = 1500;
const THRESHOLD = 75;
const CALLER_NUMBER = "Unknown · +1 (415) 555-0142";
const SENIOR = "Margaret";
const CONTACT = "Sarah (daughter)";

function ramp(i: number, n: number): number {
  if (n <= 1) return 90;
  return Math.min(98, Math.round(8 + (i / (n - 1)) * 90));
}

const CALLABLE = FIXTURES.filter((f) =>
  ["grandparent-scam", "spanish-grandparent-scam"].includes(f.id)
);

export default function GuardianCall() {
  const [fixture, setFixture] = useState<Fixture>(CALLABLE[0] ?? FIXTURES[0]);
  const [stage, setStage] = useState<Stage>("idle");
  const [feed, setFeed] = useState<FeedLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [risk, setRisk] = useState(0);
  const [alert, setAlert] = useState<AlertState>("idle");

  const cancel = useRef(false);
  const autoJoin = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    cancel.current = true;
    if (autoJoin.current) clearTimeout(autoJoin.current);
    setStage("idle");
    setFeed([]);
    setActiveIndex(-1);
    setRisk(0);
    setAlert("idle");
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function intervene() {
    if (cancel.current) return;
    setStage("held");
    setAlert("sending");
    await sleep(1300);
    if (cancel.current) return;
    setStage("conferencing");
    await sleep(1200);
    setAlert("sent");
    autoJoin.current = setTimeout(() => {
      setStage((s) => (s === "conferencing" ? "joined" : s));
    }, 6000);
  }

  async function start() {
    cancel.current = false;
    if (autoJoin.current) clearTimeout(autoJoin.current);
    setFeed([]);
    setActiveIndex(-1);
    setRisk(0);
    setAlert("idle");

    setStage("ringing");
    await sleep(1800);
    if (cancel.current) return;
    setStage("live");

    const lines = fixture.lines;
    const shown: FeedLine[] = [];
    let fired = false;
    for (let i = 0; i < lines.length; i++) {
      if (cancel.current) return;
      shown.push(lines[i]);
      setFeed([...shown]);
      setActiveIndex(i);
      const score = ramp(i, lines.length);
      setRisk(score);
      if (score >= THRESHOLD && !fired) {
        fired = true;
        void intervene();
      }
      if (i < lines.length - 1) await sleep(STREAM_MS);
    }
    setActiveIndex(-1);
    if (!fired && !cancel.current) {
      setRisk(92);
      void intervene();
    }
  }

  function choose(outcome: "joined" | "fallback") {
    if (autoJoin.current) clearTimeout(autoJoin.current);
    setStage(outcome);
  }

  const playing = stage !== "idle";
  const intervened = ["held", "conferencing", "joined", "fallback"].includes(stage);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="transition hover:opacity-80">
          <AegisLogo size={26} />
        </Link>
        <Link href="/guardian" className="flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink">
          <ScanLine size={15} /> Open the analysis dashboard
        </Link>
      </div>

      <div className="eyebrow mb-2">Guardian Number · live call screening</div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        When an unknown number calls.
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slatey">
        Family calls ring straight through, untouched. Only <em className="not-italic font-medium text-ink">unknown</em>{" "}
        callers are screened by Aegis — and if it hears a scam, it holds the call and brings in a loved one.
      </p>

      {/* scenario picker */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {CALLABLE.map((f) => (
          <button
            key={f.id}
            disabled={playing}
            onClick={() => setFixture(f)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition disabled:opacity-50 ${
              fixture.id === f.id
                ? "border-brand bg-brand/10 text-brand-deep"
                : "border-line bg-white text-muted hover:border-brand/40 hover:text-ink"
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>

      <CallStatus stage={stage} />

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* LEFT: the call */}
        <div>
          <div className="mb-3 flex items-center justify-between rounded-3xl border border-line bg-white px-4 py-3 shadow-soft">
            <div className="flex items-center gap-2.5">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${stage === "ringing" ? "bg-danger/10 text-danger" : "bg-haze text-muted"}`}>
                {stage === "ringing" ? <Radio size={16} /> : <Mic size={16} />}
              </span>
              <div>
                <div className="text-sm font-semibold text-ink">{CALLER_NUMBER}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-faint">
                  {stage === "idle" ? "not in your contacts" : stage === "ringing" ? "incoming…" : "screened by Aegis"}
                </div>
              </div>
            </div>
            {intervened && stage !== "fallback" && (
              <span className="flex items-center gap-1.5 rounded-full bg-danger/12 px-3 py-1 text-[11px] font-bold text-danger">
                <Lock size={12} /> ON HOLD
              </span>
            )}
          </div>

          {playing && (
            <div className="mb-2 flex items-start gap-2 rounded-2xl border border-line bg-mist p-3 text-xs leading-relaxed text-slatey">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand" />
              &ldquo;This call may be monitored to protect against scams. Automated tools and a trusted contact may assist in real time.&rdquo;
            </div>
          )}
          <TranscriptFeed lines={feed} activeIndex={activeIndex} />

          <div className="mt-3">
            {stage === "idle" && (
              <button
                onClick={start}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-deep"
              >
                <Radio size={16} /> Receive the call
              </button>
            )}
            {playing && stage !== "conferencing" && (
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-semibold text-slatey transition hover:text-ink"
              >
                <X size={14} /> Reset
              </button>
            )}
            {stage === "conferencing" && (
              <div className="flex gap-2">
                <button
                  onClick={() => choose("joined")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-safe px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105"
                >
                  <Check size={15} /> {CONTACT.split(" ")[0]} answers
                </button>
                <button
                  onClick={() => choose("fallback")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-danger/40 bg-danger/10 px-4 py-3 text-sm font-semibold text-danger transition hover:bg-danger/15"
                >
                  <X size={14} /> No one answers
                </button>
              </div>
            )}
            {(stage === "joined" || stage === "fallback") && (
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-semibold text-slatey transition hover:text-ink"
              >
                <Radio size={14} /> Replay
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Aegis */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
            <RiskMeter score={risk} />
            {playing && (
              <div className="mt-2 text-center text-[11px] text-faint">Aegis · screening unknown caller</div>
            )}
          </div>

          <AnimatePresence>
            {intervened && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-line bg-white p-4 shadow-soft"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink">
                    <Users size={17} className="text-brand" />
                    <span className="text-sm font-semibold">The call</span>
                  </div>
                  <span className="eyebrow">
                    {stage === "joined" ? "family on the line" : stage === "fallback" ? "call ended safely" : "bringing in family"}
                  </span>
                </div>
                <div className="space-y-2">
                  <Participant icon={Mic} name={CALLER_NUMBER} role={stage === "fallback" ? "Disconnected" : "On hold"} tone="held" />
                  <Participant icon={ShieldCheck} name={SENIOR} role={stage === "fallback" ? "Advised: hang up, send no money" : "Protected"} tone="senior" />
                  <Participant
                    icon={Users}
                    name={CONTACT}
                    role={stage === "joined" ? "Joined the call" : stage === "fallback" ? "Missed — alerted to call back" : "Ringing…"}
                    tone={stage === "joined" ? "joined" : stage === "fallback" ? "missed" : "ringing"}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {alert !== "idle" && <TrustedCircle state={alert} channel="mock" />}

          <AnimatePresence>
            {(stage === "joined" || stage === "fallback") && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl border p-4 text-sm leading-relaxed ${
                  stage === "joined" ? "border-safe/30 bg-safe/[0.07] text-ink" : "border-danger/30 bg-danger/[0.08] text-ink"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  {stage === "joined" ? <ShieldCheck size={16} className="text-safe" /> : <ShieldAlert size={16} className="text-danger" />}
                  <span className={`text-xs font-bold uppercase tracking-wider ${stage === "joined" ? "text-safe" : "text-danger"}`}>
                    {stage === "joined" ? "Loved one took over" : "Safe fallback"}
                  </span>
                </div>
                {stage === "joined"
                  ? `${CONTACT.split(" ")[0]} joined the call and is handling it. Margaret never had to decide anything — and no money moved.`
                  : `No one answered in time, so Aegis told Margaret to hang up and send nothing, and ended the call. Her family was alerted to call her back.`}
              </motion.div>
            )}
          </AnimatePresence>

          {!playing && (
            <div className="flex h-28 items-center justify-center rounded-3xl border border-dashed border-line text-sm text-faint">
              Press &ldquo;Receive the call&rdquo; to watch Aegis screen it
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Participant({
  icon: Ico,
  name,
  role,
  tone,
}: {
  icon: LucideIcon;
  name: string;
  role: string;
  tone: "held" | "senior" | "joined" | "ringing" | "missed";
}) {
  const toneCls: Record<string, string> = {
    held: "text-faint",
    senior: "text-ink",
    joined: "text-safe",
    ringing: "text-brand",
    missed: "text-danger",
  };
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-haze px-3 py-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-muted shadow-soft">
        <Ico size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-ink">{name}</div>
        <div className={`text-xs ${toneCls[tone]} ${tone === "ringing" ? "animate-breathe" : ""}`}>{role}</div>
      </div>
    </div>
  );
}

const STAGE_META: Record<Stage, { label: string; icon: LucideIcon; cls: string }> = {
  idle: { label: "Ready", icon: Radio, cls: "text-muted" },
  ringing: { label: "Incoming call — not in contacts", icon: Radio, cls: "text-danger" },
  live: { label: "Screening the caller live", icon: ScanLine, cls: "text-brand" },
  held: { label: "Scam detected — holding the call", icon: Lock, cls: "text-danger" },
  conferencing: { label: "Bringing in the Trusted Circle", icon: Users, cls: "text-brand" },
  joined: { label: "Loved one joined — crisis handled", icon: ShieldCheck, cls: "text-safe" },
  fallback: { label: "Safe fallback — call ended, family alerted", icon: ShieldAlert, cls: "text-danger" },
};

function CallStatus({ stage }: { stage: Stage }) {
  const m = STAGE_META[stage];
  const Ico = m.icon;
  return (
    <div className="mt-5 flex items-center gap-2.5 rounded-3xl border border-line bg-white px-4 py-3 shadow-soft">
      <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-haze ${m.cls}`}>
        <Ico size={15} />
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={stage}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.2 }}
          className={`text-sm font-semibold ${m.cls}`}
        >
          {m.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
