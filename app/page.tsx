import Link from "next/link";
import AegisLogo from "@/components/AegisLogo";
import Photo from "@/components/Photo";
import Icon, { type IconName } from "@/components/Icon";

const STATS = [
  { value: "$40B", label: "projected AI-fraud losses by 2027" },
  { value: "3 sec", label: "of audio to clone a loved one's voice" },
  { value: "1 in 4", label: "adults have hit an AI voice scam" },
  { value: "5 min", label: "between deepfake fraud attempts" },
];

const STEPS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "scan",
    title: "It listens",
    body: "The Scam DNA Engine reads any conversation and hears the manipulation playbook — urgency, impersonation, secrecy, a payment that can't be undone. Intent, not keywords.",
  },
  {
    icon: "users",
    title: "It speaks up",
    body: "It explains the danger in plain, kind language and quietly alerts someone in the family — the person you'd want to get that call.",
  },
  {
    icon: "landmark",
    title: "It steps in",
    body: "It holds the suspicious transfer before the money can leave the account — stopping the loss at the one moment that matters.",
  },
];

const CARE: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "You set it up",
    body: "You configure the Trusted Circle and settings from your own phone, in a few minutes. The person you love touches nothing.",
  },
  {
    icon: "mute",
    title: "It stays invisible",
    body: "Installed once, never opened again. Aegis works quietly in the background — there's no app to launch when the phone rings.",
  },
  {
    icon: "shield-check",
    title: "It never asks them to decide",
    body: "When danger hits, family is alerted and the payment is frozen automatically. No split-second judgment call in a frightening moment.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <AegisLogo size={30} />
        <div className="flex items-center gap-6 text-sm">
          <Link href="/care" className="text-sand transition hover:text-cream">
            Care Mode
          </Link>
          <a
            href="https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sand transition hover:text-cream"
          >
            GitHub <Icon name="arrow-right" size={14} className="-rotate-45" />
          </a>
        </div>
      </nav>

      {/* Hero — asymmetric editorial split, human photo + the product moment */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <div className="animate-fade-up">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-panel/70 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-cream" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-sand">
              Beyond Tomorrow Summit 2026
            </span>
          </div>
          <h1 className="font-display text-6xl font-light leading-[0.95] tracking-tightest text-cream sm:text-7xl">
            Stop scams
            <br />
            <span className="italic">before</span> they happen.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-sand">
            Someone is about to talk your father into wiring money he&apos;ll never see again. Aegis
            hears the manipulation as it happens — on a call, a text, a chat — and steps in{" "}
            <em className="text-cream not-italic">during</em> the attack, before a single dollar leaves
            the account.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/guardian"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-base font-semibold text-ink shadow-gold transition hover:bg-gold-soft"
            >
              See it in action
              <Icon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/care"
              className="inline-flex items-center gap-2 rounded-full border border-ink-line2 px-7 py-3.5 text-base font-medium text-cream transition hover:border-cream/40 hover:bg-ink-panel"
            >
              Protect someone you love
            </Link>
          </div>
        </div>

        {/* Hero scene — a real person on a device, with the product moment overlaid */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-white/[0.04] blur-2xl" />
          <Photo
            src="/images/grandfather-tablet.webp"
            alt="A grandfather on a video call on his tablet, his grandchild resting beside him"
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="aspect-[4/5] rounded-4xl border border-ink-line shadow-lift"
          />
          {/* floating intervention card */}
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-clay/35 bg-ink/80 p-4 shadow-lift backdrop-blur">
            <div className="flex items-center gap-2">
              <Icon name="shield-check" size={16} className="text-clay" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-clay">
                Aegis intervened · risk 94
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-cream">
              &ldquo;Don&apos;t tell mom — wire $4,000 now.&rdquo; Fake-emergency impersonation. Transfer{" "}
              <strong className="text-clay">frozen</strong>; his daughter Sarah alerted.
            </p>
          </div>
        </div>
      </section>

      {/* Stats — editorial ledger row */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-2 divide-ink-line border-y border-ink-line sm:grid-cols-4 sm:divide-x">
          {STATS.map((s) => (
            <div key={s.label} className="px-5 py-7">
              <div className="font-display text-4xl font-light text-cream">{s.value}</div>
              <div className="mt-2 text-sm leading-snug text-sand">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Emotional band — turn the statistics back into people */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid items-stretch overflow-hidden rounded-4xl border border-ink-line bg-ink-panel/40 lg:grid-cols-2">
          <Photo
            src="/images/generations.webp"
            alt="An elderly woman gazing tenderly at her sleeping great-grandchild"
            sizes="(max-width: 1024px) 100vw, 50vw"
            overlay="none"
            className="min-h-[20rem] lg:min-h-full"
            imgClassName="grayscale"
          />
          <div className="p-8 sm:p-12">
            <div className="eyebrow mb-3">Why we built this</div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-cream sm:text-4xl">
              Behind every one of those numbers is someone&apos;s mother. Someone&apos;s grandfather.
            </h2>
            <p className="mt-5 leading-relaxed text-sand">
              Scammers now use AI to clone a voice, fake a crisis, and rush a good person into a
              decision they&apos;d never make with a clear head. The people most at risk are often the
              ones we love most — and the least able to spot it in the moment.
            </p>
            <p className="mt-4 leading-relaxed text-sand">
              Aegis exists so that no family has to learn this the hard way. It watches over the people
              who can&apos;t always watch over themselves — gently, and without ever taking away their
              independence.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 max-w-2xl">
          <div className="eyebrow mb-3">How Aegis protects them</div>
          <h2 className="font-display text-3xl font-light tracking-tight text-cream sm:text-4xl">
            It understands intent — so one guardian works on every call, text, and chat.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink-line bg-ink-line sm:grid-cols-3">
          {STEPS.map((c, i) => (
            <div key={c.title} className="bg-ink-panel p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-cream">
                  <Icon name={c.icon} size={22} />
                </span>
                <span className="font-mono text-xs text-taupe">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl text-cream">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Care Mode */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="overflow-hidden rounded-4xl border border-ink-line bg-ink-panel/60 shadow-panel">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink px-3.5 py-1.5">
                <Icon name="heart-crack" size={14} className="text-cream" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sand">
                  For the people who can&apos;t protect themselves
                </span>
              </div>
              <h2 className="font-display text-3xl font-light tracking-tight text-cream sm:text-4xl">
                They do <span className="italic">nothing</span>. You set it up once.
              </h2>
              <p className="mt-4 leading-relaxed text-sand">
                Aegis isn&apos;t one more app your grandmother has to learn. It&apos;s a guardian you
                install <em className="text-cream not-italic">for</em> her — managed from your phone,
                running quietly on hers. No buttons during a call. No screens to read. No new habits at
                eighty.
              </p>
              <Link
                href="/care"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 font-semibold text-ink transition hover:bg-gold-soft"
              >
                Set up Care Mode
                <Icon name="arrow-right" size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <Photo
              src="/images/family-care.webp"
              alt="A family gathered close around their grandmother, arms around her"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="min-h-[22rem] lg:min-h-full"
            />
          </div>

          <div className="grid gap-px border-t border-ink-line bg-ink-line sm:grid-cols-3">
            {CARE.map((c) => (
              <div key={c.title} className="bg-ink-panel/60 p-6">
                <Icon name={c.icon} size={22} className="text-cream" />
                <h3 className="mt-3 font-medium text-cream">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-line py-10 text-center">
        <p className="mx-auto max-w-xl font-display text-lg italic leading-relaxed text-cream">
          Scammers got an AI. It&apos;s time the people we love got one too.
        </p>
        <p className="eyebrow mt-3">Aegis · Beyond Tomorrow Summit 2026</p>
      </footer>
    </main>
  );
}
