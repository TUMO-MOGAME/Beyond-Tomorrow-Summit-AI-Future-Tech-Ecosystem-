"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FIXTURES, fixtureToText, type Fixture } from "@/lib/fixtures";
import RiskMeter from "@/components/RiskMeter";
import TacticCard, { type Tactic } from "@/components/TacticCard";
import VerdictBanner from "@/components/VerdictBanner";
import TranscriptFeed, { type FeedLine } from "@/components/TranscriptFeed";

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

  const cancelRef = useRef(false);

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
        if (!cancelRef.current) setResult(data);
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
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          ← Aegis
        </Link>
        <div className="flex gap-1 rounded-lg border border-aegis-border bg-aegis-panel p-1">
          <button
            onClick={() => setMode("simulate")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              mode === "simulate" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            🔴 Simulate live call
          </button>
          <button
            onClick={() => setMode("paste")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              mode === "paste" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            📝 Paste your own
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-white">🛡️ The Guardian</h1>
      <p className="mt-1 text-sm text-slate-400">
        Watch Aegis analyze a conversation in real time and intervene before money is lost.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
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
                    }}
                    disabled={playing}
                    className={`rounded-md border px-3 py-1.5 text-xs transition disabled:opacity-50 ${
                      activeFixture.id === f.id
                        ? "border-blue-500 bg-blue-600/20 text-white"
                        : "border-aegis-border bg-aegis-panel text-slate-300 hover:border-blue-500"
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
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                  >
                    ▶ Simulate live call
                  </button>
                ) : (
                  <button
                    onClick={stop}
                    className="flex-1 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
                  >
                    ■ Stop
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
                    className="rounded-md border border-aegis-border bg-aegis-panel px-3 py-1.5 text-xs text-slate-300 transition hover:border-blue-500"
                  >
                    {f.title}
                  </button>
                ))}
              </div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste a phone call transcript, SMS, or chat here…"
                className="h-72 w-full resize-none rounded-xl border border-aegis-border bg-aegis-panel p-4 text-sm text-slate-200 outline-none focus:border-blue-500"
              />
              <button
                onClick={analyzePaste}
                disabled={analyzing || pasteText.trim().length < 4}
                className="mt-3 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-40"
              >
                {analyzing ? "Analyzing…" : "Analyze with Aegis"}
              </button>
            </>
          )}
        </div>

        {/* RIGHT: live analysis */}
        <div className="space-y-4">
          <div className="rounded-xl border border-aegis-border bg-aegis-panel p-5">
            <RiskMeter score={score} />
            {result && (
              <div className="mt-2 text-center text-[11px] text-slate-500">
                analyzed via {result.provider} · {result.model}
                {analyzing && <span className="ml-2 animate-pulse text-blue-400">● live</span>}
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
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
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Manipulation tactics detected ({result.tactics.length})
              </div>
              {result.tactics.length === 0 ? (
                <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-sm text-green-300">
                  No manipulation tactics detected. ✅
                </div>
              ) : (
                result.tactics.map((t, i) => <TacticCard key={`${t.name}-${i}`} tactic={t} index={i} />)
              )}
            </div>
          )}

          {!result && !error && (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-aegis-border text-sm text-slate-600">
              Analysis will appear here as the conversation unfolds
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
