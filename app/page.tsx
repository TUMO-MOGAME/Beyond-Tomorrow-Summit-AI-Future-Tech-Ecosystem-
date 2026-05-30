import Link from "next/link";

const STATS = [
  { value: "$40B", label: "projected AI-fraud losses by 2027" },
  { value: "3 sec", label: "of audio to clone a voice" },
  { value: "1 in 4", label: "adults have hit an AI voice scam" },
  { value: "every 5 min", label: "a deepfake fraud attempt occurs" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aegis-border bg-aegis-panel px-4 py-1.5 text-sm text-blue-300">
          🛡️ Beyond Tomorrow Summit 2026 · Cybersecurity × Fintech × Health
        </div>
        <h1 className="bg-gradient-to-b from-white to-blue-200 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl">
          Aegis
        </h1>
        <p className="mt-4 text-2xl font-semibold text-white">
          Stop scams before they happen.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          An AI guardian that detects manipulation in any conversation — voice, SMS, or chat —
          and intervenes in real time to protect vulnerable people and their money.
        </p>
        <div className="mt-9 flex items-center justify-center gap-4">
          <Link
            href="/guardian"
            className="rounded-lg bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
          >
            Try the Guardian →
          </Link>
          <a
            href="https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-aegis-border px-7 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-aegis-panel"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-aegis-border bg-aegis-panel p-5 text-center"
            >
              <div className="text-3xl font-bold text-blue-400">{s.value}</div>
              <div className="mt-2 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">How Aegis protects you</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: "🧠",
              title: "Detect",
              body: "The Scam DNA Engine reads any conversation and spots the manipulation playbook — urgency, impersonation, secrecy, irreversible payment — not just keywords.",
            },
            {
              icon: "👨‍👩‍👧",
              title: "Warn & Alert",
              body: "It explains the danger in plain language and instantly alerts a trusted family member — the real-world circuit breaker for elder fraud.",
            },
            {
              icon: "🏦",
              title: "Protect",
              body: "It holds the suspicious transfer before the money leaves the account, stopping the loss at the moment it matters.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-aegis-border bg-aegis-panel p-6">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-aegis-border py-8 text-center text-sm text-slate-500">
        Aegis · Beyond Tomorrow Summit 2026 · <em>Scammers got an AI. It&apos;s time the rest of us got one too.</em>
      </footer>
    </main>
  );
}
