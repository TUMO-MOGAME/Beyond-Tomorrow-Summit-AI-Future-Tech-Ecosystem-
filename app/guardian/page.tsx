"use client";

import { useState } from "react";
import Link from "next/link";
import { FIXTURES, fixtureToText, type Fixture } from "@/lib/fixtures";

interface Tactic {
  name: string;
  severity: "low" | "medium" | "high";
  quote: string;
  explanation: string;
}
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

const VERDICT_STYLES: Record<string, { ring: string; text: string; label: string }> = {
  safe: { ring: "border-green-500/50 bg-green-500/10", text: "text-green-400", label: "SAFE" },
  caution: { ring: "border-amber-500/50 bg-amber-500/10", text: "text-amber-400", label: "CAUTION" },
  danger: { ring: "border-red-500/50 bg-red-500/10", text: "text-red-400", label: "DANGER" },
};

const SEVERITY_DOT: Record<string, string> = {
  low: "bg-amber-400",
  medium: "bg-orange-500",
  high: "bg-red-500",
};

export default function Guardian() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  function loadFixture(f: Fixture) {
    setText(fixtureToText(f));
    setResult(null);
    setError(null);
  }

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const v = result ? VERDICT_STYLES[result.verdict] : null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          ← Aegis
        </Link>
        <span className="text-sm text-slate-500">Guardian (Day 1 engine test)</span>
      </div>

      <h1 className="text-3xl font-bold text-white">🛡️ The Guardian</h1>
      <p className="mt-2 text-slate-400">
        Paste a conversation, or load a sample, and let the Scam DNA Engine analyze it.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Input */}
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {FIXTURES.map((f) => (
              <button
                key={f.id}
                onClick={() => loadFixture(f)}
                className="rounded-md border border-aegis-border bg-aegis-panel px-3 py-1.5 text-xs text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                {f.title}
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a phone call transcript, SMS, or chat here…"
            className="h-80 w-full resize-none rounded-xl border border-aegis-border bg-aegis-panel p-4 text-sm text-slate-200 outline-none focus:border-blue-500"
          />
          <button
            onClick={analyze}
            disabled={loading || text.trim().length < 4}
            className="mt-3 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analyzing…" : "Analyze with Aegis"}
          </button>
        </div>

        {/* Output */}
        <div>
          {error && (
            <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {!result && !error && (
            <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-aegis-border text-slate-600">
              Analysis will appear here
            </div>
          )}

          {result && v && (
            <div className="space-y-4">
              <div className={`flex items-center justify-between rounded-xl border p-5 ${v.ring}`}>
                <div>
                  <div className={`text-2xl font-extrabold ${v.text}`}>{v.label}</div>
                  <div className="text-xs text-slate-400">
                    via {result.provider} · {result.model}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-black ${v.text}`}>{result.riskScore}</div>
                  <div className="text-xs text-slate-400">risk score</div>
                </div>
              </div>

              <div className="rounded-xl border border-aegis-border bg-aegis-panel p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  What this means
                </div>
                <p className="mt-1 text-sm text-slate-200">{result.plainLanguageSummary}</p>
                <div className="mt-3 rounded-lg bg-blue-500/10 p-3 text-sm text-blue-200">
                  👉 {result.recommendedAction}
                </div>
                {result.voiceAuthenticitySignal &&
                  result.voiceAuthenticitySignal !== "N/A" && (
                    <div className="mt-2 text-xs text-amber-300">
                      🎙️ {result.voiceAuthenticitySignal}
                    </div>
                  )}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Manipulation tactics ({result.tactics.length})
                </div>
                {result.tactics.length === 0 && (
                  <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-sm text-green-300">
                    No manipulation tactics detected. ✅
                  </div>
                )}
                {result.tactics.map((t, i) => (
                  <div key={i} className="rounded-lg border border-aegis-border bg-aegis-panel p-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${SEVERITY_DOT[t.severity]}`} />
                      <span className="font-semibold text-white">{t.name}</span>
                      <span className="text-xs uppercase text-slate-500">{t.severity}</span>
                    </div>
                    <p className="mt-1.5 border-l-2 border-slate-600 pl-3 text-sm italic text-slate-300">
                      “{t.quote}”
                    </p>
                    <p className="mt-1.5 text-sm text-slate-400">{t.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
