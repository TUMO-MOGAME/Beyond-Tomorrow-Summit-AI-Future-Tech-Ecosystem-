"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  PhoneIncoming,
  Users,
  Landmark,
  ScanLine,
  ArrowRight,
  Wifi,
  Signal,
  BatteryFull,
  Heart,
  Lock,
} from "lucide-react";

/** GitHub mark (lucide removed brand icons in v1). */
function GithubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

const STATS = [
  { value: "$40B", label: "AI-fraud losses projected by 2027" },
  { value: "3 sec", label: "of audio to clone a loved one's voice" },
  { value: "1 in 4", label: "adults have hit an AI voice scam" },
  { value: "5 min", label: "between deepfake fraud attempts" },
];

const STEPS = [
  {
    icon: ScanLine,
    title: "It listens",
    body: "Aegis hears the manipulation inside a call, text, or chat — urgency, a fake emergency, secrecy, a payment that can't be undone. It understands intent, not keywords.",
  },
  {
    icon: Users,
    title: "It calls family",
    body: "It explains the danger in plain, kind words and quietly brings in someone you trust — the person you'd want on the line in that moment.",
  },
  {
    icon: Landmark,
    title: "It holds the money",
    body: "It freezes the suspicious transfer before a single dollar can leave the account — stopping the loss at the one moment that matters.",
  },
];

const CARE = [
  { icon: Users, title: "You set it up", body: "A few minutes from your phone — add the people to call and you're done." },
  { icon: Heart, title: "They do nothing", body: "No app to open, no buttons during a call. It just watches over them, quietly." },
  { icon: ShieldCheck, title: "Never a hard choice", body: "When danger hits, family is called and the payment is held — automatically." },
];

const spring = { type: "spring", bounce: 0.25, duration: 0.9 } as const;

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <div className="hidden items-center gap-7 text-sm font-medium text-slatey sm:flex">
          <a href="#how" className="transition hover:text-ink">How it works</a>
          <Link href="/care" className="transition hover:text-ink">Care Mode</Link>
          <a
            href="https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition hover:text-ink"
          >
            <GithubMark size={16} /> GitHub
          </a>
        </div>
        <Link
          href="/guardian"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-deep"
        >
          Try it
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-slatey">Beyond Tomorrow Summit 2026</span>
          </div>

          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl">
            A gentle guardian
            <br /> for the people
            <br /> <span className="text-brand">you love.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slatey">
            Someone is about to talk your mother into wiring money she&apos;ll never see again. Aegis
            hears the scam as it happens — and steps in <em className="font-medium not-italic text-ink">during</em> the
            call, before a single dollar leaves the account.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/guardian"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:bg-brand-deep"
            >
              See it in action
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/care"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-base font-semibold text-ink shadow-soft transition hover:bg-mist"
            >
              Protect someone
            </Link>
          </div>

          <p className="mt-6 font-hand text-xl text-brand-deep/80">
            it watches over them, so you don&apos;t have to worry.
          </p>
        </motion.div>

        {/* Phone mock — Aegis catching a scam */}
        <div className="relative flex justify-center lg:justify-end">
          <PhoneMock />
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.8 }}
            className="absolute -left-2 top-10 hidden font-hand text-xl text-brand-deep sm:block lg:left-2"
          >
            Aegis stepped in →
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-3xl border border-line bg-white/70 p-5 shadow-soft">
              <div className="text-3xl font-semibold text-ink">{s.value}</div>
              <div className="mt-1.5 text-sm leading-snug text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-9 max-w-2xl">
          <div className="eyebrow mb-2">How Aegis protects them</div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            One guardian. Every call, text, and chat.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="rounded-4xl border border-line bg-white p-7 shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
                <s.icon size={24} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slatey">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Care Mode band */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="overflow-hidden rounded-5xl border border-line bg-white shadow-card">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-brand-deep">
                <Heart size={15} /> For the people who can&apos;t protect themselves
              </div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                They do <span className="font-hand text-4xl text-brand sm:text-5xl">nothing</span>.
                <br /> You set it up once.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slatey">
                Aegis isn&apos;t one more app your grandmother has to learn. It&apos;s a guardian you
                set up <em className="not-italic font-medium text-ink">for</em> her — managed from your
                phone, watching quietly over hers.
              </p>
              <div className="mt-7 grid gap-3">
                {CARE.map((c) => (
                  <div key={c.title} className="flex items-start gap-3 rounded-2xl border border-line bg-haze p-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-soft">
                      <c.icon size={17} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{c.title}</div>
                      <div className="text-sm text-muted">{c.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/care"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-glow transition hover:bg-brand-deep"
              >
                Set up Care Mode
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="relative h-72 lg:h-full lg:min-h-[34rem]">
              <Image
                src="/images/grandfather-tablet.webp"
                alt="A grandfather on a video call with his grandchild beside him"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-10 text-center">
        <p className="mx-auto max-w-xl font-hand text-2xl text-brand-deep">
          Scammers got an AI. It&apos;s time the people we love got one too.
        </p>
        <p className="eyebrow mt-3">Aegis · Beyond Tomorrow Summit 2026</p>
      </footer>
    </main>
  );
}

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-glow">
        <ShieldCheck size={20} />
      </span>
      <span className="text-xl font-semibold tracking-tight text-ink">Aegis</span>
    </Link>
  );
}

/** The hero device — a friendly phone where Aegis catches a scam live. */
function PhoneMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", bounce: 0.3, duration: 1.1, delay: 0.15 }}
      className="animate-float"
    >
      <div className="relative w-[300px] overflow-hidden rounded-[2.75rem] border border-line bg-gradient-to-b from-white to-mist p-3 shadow-phone">
        {/* status bar */}
        <div className="relative flex h-9 items-center justify-between px-4 text-ink">
          <span className="text-xs font-semibold">9:41</span>
          <span className="absolute inset-x-0 mx-auto h-5 w-20 rounded-full bg-ink" />
          <span className="flex items-center gap-1">
            <Signal size={13} />
            <Wifi size={13} />
            <BatteryFull size={15} />
          </span>
        </div>

        {/* incoming call */}
        <div className="mt-1 flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-soft">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-danger/10 text-danger">
            <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-danger/30" />
            <PhoneIncoming size={18} />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink">Unknown number</div>
            <div className="text-xs text-muted">screened by Aegis</div>
          </div>
        </div>

        {/* transcript bubble */}
        <div className="mt-3 max-w-[85%] rounded-2xl rounded-bl-md bg-haze px-3.5 py-2.5 text-[13px] leading-snug text-slatey shadow-soft">
          &ldquo;Grandma, it&apos;s me — I&apos;m in trouble. Don&apos;t tell mom. Wire $4,000 now.&rdquo;
        </div>

        {/* Aegis intervention */}
        <div className="mt-3 rounded-2xl border border-brand/20 bg-brand/[0.06] p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-deep">
              <ShieldCheck size={16} /> Aegis
            </span>
            <span className="rounded-full bg-danger/12 px-2.5 py-0.5 text-[11px] font-bold text-danger">RISK 94</span>
          </div>
          <p className="mt-2 font-hand text-lg leading-tight text-ink">
            That&apos;s not your grandson. I paused the transfer and called Sarah — you&apos;re safe.
          </p>
        </div>

        {/* status chips */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[12px] font-medium text-ink shadow-soft">
            <Lock size={13} className="text-danger" /> $4,000 held
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[12px] font-medium text-ink shadow-soft">
            <Users size={13} className="text-safe" /> Sarah notified
          </div>
        </div>
      </div>
    </motion.div>
  );
}
