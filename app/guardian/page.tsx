"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FIXTURES, fixtureToText, type Fixture } from "@/lib/fixtures";
import RiskMeter from "@/components/RiskMeter";
import TacticCard, { type Tactic } from "@/components/TacticCard";
import VerdictBanner from "@/components/VerdictBanner";
import TranscriptFeed, { type FeedLine } from "@/components/TranscriptFeed";
import TransactionShield, { type ShieldState } from "@/components/TransactionShield";
import TrustedCircle, { type AlertState } from "@/components/TrustedCircle";
import AegisLogo from "@/components/AegisLogo";
import { Radio, ClipboardList, Play, Square, ArrowRight, Check, PhoneCall } from "lucide-react";

interface AnalyzeResult {
  provider: string;
  model: string;
  riskScore: number;
  verdict: "safe" | "caution" | "danger";
  tactics: Tactic[];
  plainLanguageSummary: string;
  recommendedAction: string;
  voiceAuthenticitySignal: string;
}

const STREAM_DELAY = 1400; // ms between lines
const DANGER_THRESHOLD = 75; // risk score that triggers intervention

// Fixtures that involve a payment → show the Transaction Shield, with the
// amount/recipient that fits each scam so the demo reads true to life.
const MONEY_FIXTURES: Record<string, { amount: string; recipient: string }> = {
  "grandparent-scam": { amount: "$4,000.00", recipient: "Bail Bonds Wire — Acct ****7781" },
  "spanish-grandparent-scam": { amount: "$4,000.00", recipient: "Transferencia Fianza — ****7781" },
  "bank-impersonation": { amount: "$2,300.00", recipient: "“Secure Account” — Acct ****2210" },
  "romance-pig-butchering": { amount: "$1,000.00", recipient: "Crypto Wallet — bc1q…f4k2" },
  "tech-support-scam": { amount: "$299.00", recipient: "Apple Gift Cards ×3" },
  "crypto-investment-scam": { amount: "$500.00", recipient: "BTC Wallet — bc1q…9xz7" },
  "job-offer-scam": { amount: "$150.00", recipient: "“Onboarding Fee” — Gift Card" },
  "sextortion-scam": { amount: "$1,500.00", recipient: "BTC Wallet — bc1q…k8d3" },
};

export default function Guardian() {
  const [mode, setMode] = useState<"simulate" | "paste">("simulate");
  const [activeFixture, setActiveFixture] = useState<Fixture>(FIXTURES[0]);

  // streaming state
  const [feed, setFeed] = useState<FeedLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);

  // analysis state
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // paste mode
  const [pasteText, setPasteText] = useState("");

  // intervention layer
  const [shield, setShield] = useState<ShieldState>("idle");
  const [alert, setAlert] = useState<AlertState>("idle");
  const [alertChannel, setAlertChannel] = useState<string>("mock");
  const interveneRef = useRef(false); // guards single-fire per run

  const cancelRef = useRef(false);

  async function fireIntervention(summary: string) {
    if (interveneRef.current) return;
    interveneRef.current = true;

    // Freeze the money immediately.
    setShield("held");

    // Alert the Trusted Circle.
    setAlert("sending");
    try {
      const res = await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protectedName: "Margaret",
          contactName: "Sarah (daughter)",
          summary,
        }),
      });
      const data = await res.json();
      setAlertChannel(data.channel ?? "mock");
    } catch {
      setAlertChannel("mock");
    }
    setAlert("sent");
  }

  function resetIntervention(fixtureId?: string) {
    interveneRef.current = false;
    setAlert("idle");
    setAlertChannel("mock");
    // Pending transfer is shown only for money-related scams.
    setShield(fixtureId && fixtureId in MONEY_FIXTURES ? "pending" : "idle");
  }

  const analyze = useCallback(async (conversation: string, meta?: { channel?: string; caller?: string }) => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation, metadata: meta }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data as AnalyzeResult;
  }, []);

  // ── Simulate live call ────────────────────────────────────────────────
  async function simulate() {
    cancelRef.current = false;
    setError(null);
    setResult(null);
    setFeed([]);
    setActiveIndex(-1);
    resetIntervention(activeFixture.id);
    setPlaying(true);

    const lines = activeFixture.lines;
    const shown: FeedLine[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (cancelRef.current) break;
      shown.push(lines[i]);
      setFeed([...shown]);
      setActiveIndex(i);

      // re-analyze the conversation-so-far → risk meter climbs in real time
      const soFar = shown.map((l) => `${l.speaker}: ${l.text}`).join("\n");
      setAnalyzing(true);
      try {
        const data = await analyze(soFar, {
          channel: activeFixture.channel,
          caller: activeFixture.caller,
        });
        if (!cancelRef.current) {
          setResult(data);
          // Intervene the moment risk crosses into danger.
          if (data.riskScore >= DANGER_THRESHOLD && activeFixture.id in MONEY_FIXTURES) {
            void fireIntervention(data.plainLanguageSummary);
          }
        }
      } catch (e) {
        if (!cancelRef.current) setError(e instanceof Error ? e.message : "Analysis failed");
      } finally {
        setAnalyzing(false);
      }

      if (i < lines.length - 1) {
        await new Promise((r) => setTimeout(r, STREAM_DELAY));
      }
    }
    setPlaying(false);
    setActiveIndex(-1);
  }

  function stop() {
    cancelRef.current = true;
    setPlaying(false);
  }

  // ── Paste mode ────────────────────────────────────────────────────────
  async function analyzePaste() {
    setError(null);
    setResult(null);
    setAnalyzing(true);
    try {
      const data = await analyze(pasteText);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  const score = result?.riskScore ?? 0;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* header */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="transition hover:opacity-80">
          <AegisLogo size={26} />
        </Link>
        <div className="flex gap-1 rounded-full border border-line bg-white p-1 shadow-soft">
          <button
            onClick={() => setMode("simulate")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              mode === "simulate" ? "bg-brand text-white shadow-glow" : "text-muted hover:text-ink"
            }`}
          >
            <Radio size={14} /> Simulate live call
          </button>
          <button
            onClick={() => setMode("paste")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              mode === "paste" ? "bg-brand text-white shadow-glow" : "text-muted hover:text-ink"
            }`}
          >
            <ClipboardList size={14} /> Paste your own
          </button>
        </div>
      </div>

      <div className="eyebrow mb-2">The Guardian · real-time analysis</div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Watch a scam get caught, live.
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slatey">
        Aegis reads the conversation line-by-line and steps in the moment risk crosses into
        danger — before the money is gone.
      </p>
      <Link
        href="/call"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition hover:text-brand-deep"
      >
        <PhoneCall size={15} /> See the real phone-call flow (Guardian Number)
        <ArrowRight size={15} />
      </Link>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* LEFT: input / transcript */}
        <div>
          {mode === "simulate" ? (
            <>
              <div className="mb-3 flex flex-wrap gap-2">
                {FIXTURES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      if (playing) return;
                      setActiveFixture(f);
                      setFeed([]);
                      setResult(null);
                      setActiveIndex(-1);
                      resetIntervention(f.id);
                    }}
                    disabled={playing}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition disabled:opacity-50 ${
                      activeFixture.id === f.id
                        ? "border-brand bg-brand/10 text-brand-deep"
                        : "border-line bg-white text-muted hover:border-brand/40 hover:text-ink"
                    }`}
                  >
                    {f.title}
                  </button>
                ))}
              </div>
              <TranscriptFeed lines={feed} activeIndex={activeIndex} />
              <div className="mt-3 flex gap-2">
                {!playing ? (
                  <button
                    onClick={simulate}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-deep"
                  >
                    <Play size={16} /> Simulate live call
                  </button>
                ) : (
                  <button
                    onClick={stop}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-danger/40 bg-danger/10 px-6 py-3 font-semibold text-danger transition hover:bg-danger/15"
                  >
                    <Square size={14} /> Stop
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-3 flex flex-wrap gap-2">
                {FIXTURES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPasteText(fixtureToText(f))}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-muted transition hover:border-brand/40 hover:text-ink"
                  >
                    {f.title}
                  </button>
                ))}
              </div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste a phone call transcript, SMS, or chat here…"
                className="focus-brand scroll-soft h-72 w-full resize-none rounded-2xl border border-line bg-white p-4 text-sm leading-relaxed text-ink placeholder:text-faint"
              />
              <button
                onClick={analyzePaste}
                disabled={analyzing || pasteText.trim().length < 4}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-brand-deep disabled:opacity-40 disabled:shadow-none"
              >
                {analyzing ? "Analyzing…" : "Analyze with Aegis"}
              </button>
            </>
          )}
        </div>

        {/* RIGHT: live analysis */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
            <RiskMeter score={score} />
            {result && (
              <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-faint">
                analyzed via {result.provider} · {result.model}
                {analyzing && (
                  <span className="flex items-center gap-1 text-brand">
                    <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-brand" /> live
                  </span>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-2xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
              {error}
            </div>
          )}

          {/* Intervention layer — the cross-theme payoff */}
          {(shield !== "idle" || alert !== "idle") && (
            <div className="space-y-3">
              {shield !== "idle" && (
                <TransactionShield
                  state={shield}
                  amount={MONEY_FIXTURES[activeFixture.id]?.amount}
                  recipient={MONEY_FIXTURES[activeFixture.id]?.recipient}
                />
              )}
              {alert !== "idle" && <TrustedCircle state={alert} channel={alertChannel} />}
            </div>
          )}

          {result && (
            <VerdictBanner
              verdict={result.verdict}
              summary={result.plainLanguageSummary}
              recommendedAction={result.recommendedAction}
              voiceSignal={result.voiceAuthenticitySignal}
            />
          )}

          {result && (
            <div className="space-y-2.5">
              <div className="eyebrow">
                Manipulation tactics detected ({result.tactics.length})
              </div>
              {result.tactics.length === 0 ? (
                <div className="flex items-center gap-2 rounded-2xl border border-safe/30 bg-safe/[0.07] p-3 text-sm text-safe">
                  <Check size={16} /> No manipulation tactics detected.
                </div>
              ) : (
                result.tactics.map((t, i) => <TacticCard key={`${t.name}-${i}`} tactic={t} index={i} />)
              )}
            </div>
          )}

          {!result && !error && (
            <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-line text-sm text-faint">
              Analysis will appear here as the conversation unfolds
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
