# 🛠️ Aegis — Build Spec

> Technical blueprint for the 6-day solo build. Read `00_MASTER_PLAN.md` first.

---

## 1. The user story (what the demo proves)

> Margaret, 72, gets a call: her "grandson" (a cloned voice) is in jail and needs $4,000 wired now — and *please don't tell mom*. Aegis is listening. As the call unfolds, Aegis detects urgency + authority impersonation + secrecy + irreversible payment, the risk meter climbs to 96, it warns Margaret on screen, texts her daughter Sarah, and **freezes the pending $4,000 transfer in her banking app.** Margaret keeps her money. Sarah calls the *real* grandson, who's home safe.

Everything we build serves that 3-minute story.

---

## 2. Feature breakdown (priority order)

### P0 — Core (must work for the demo)
1. **Conversation ingest**
   - Paste transcript (always-reliable default path).
   - Upload audio file → transcribe (Whisper / faster-whisper / AssemblyAI).
   - "Simulate live call" — stream a pre-recorded scam transcript line-by-line to mimic real time.
2. **Scam DNA Engine** (the brain)
   - Input: conversation text (+ optional metadata: channel, caller).
   - Output (strict JSON): `riskScore`, `verdict`, `tactics[]` (each with `name`, `severity`, `quote`, `explanation`), `plainLanguageSummary`, `recommendedAction`, `voiceAuthenticitySignal` (optional).
   - Powered by Claude with **tool-use / structured output** + a strong system prompt (see §6).
3. **Guardian dashboard (real-time UI)**
   - Live transcript feed.
   - Animated **risk meter** (0–100) that climbs as lines stream.
   - **Tactic cards** that light up with the exact quote that triggered them.
   - Verdict banner (Safe / Caution / Danger) with the plain-language explanation.

### P1 — Differentiators (strongly want)
4. **Trusted Circle alert** — when risk ≥ threshold, send a real SMS (Twilio) or email (Resend) to a family contact: *"⚠️ Aegis detected a likely scam targeting Margaret. Tactic: fake-emergency + wire transfer. Call her now."* Mock cleanly if API time runs short.
5. **Transaction Shield** — a mock banking panel showing a pending transfer that flips to **HELD BY AEGIS** when a scam is detected. This is the fintech money-shot.

### P2 — Wow polish (if time)
6. **Resilience score** — a profile that improves each time the user heeds a warning ("Margaret's scam resistance: 64 → 71").
7. **Multilingual** — run the engine on a Spanish/Hindi scam transcript to prove global reach (great for a global hackathon).
8. **Voice authenticity meter** — secondary deepfake-likelihood signal from audio features or a pretrained model.
9. **Browser-extension / phone mock** — a phone-call overlay UI for visual drama.

> Build P0 fully before touching P1. Build P1 before P2. Each Pn is independently demoable, so you always have *something* that works.

---

## 3. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AEGIS (Next.js app)                       │
│                                                              │
│  ┌──────────────┐   ┌─────────────────┐   ┌──────────────┐  │
│  │  Ingest UI   │   │ Guardian        │   │ Transaction  │  │
│  │ paste/upload │   │ Dashboard       │   │ Shield panel │  │
│  │ /simulate    │   │ (risk meter,    │   │ (mock bank)  │  │
│  └──────┬───────┘   │  tactic cards)  │   └──────┬───────┘  │
│         │           └────────┬────────┘          │          │
│         ▼                    ▲                    ▲          │
│  ┌──────────────────────────┴────────────────────┴───────┐ │
│  │              /api/analyze  (route handler)             │ │
│  └───┬─────────────────────┬───────────────────┬─────────┘ │
└──────┼─────────────────────┼───────────────────┼───────────┘
       ▼                     ▼                   ▼
 ┌───────────┐      ┌──────────────────┐   ┌─────────────┐
 │  Whisper/ │      │  Claude API      │   │  Twilio /   │
 │ AssemblyAI│      │  Scam DNA Engine │   │  Resend     │
 │ (STT)     │      │ (structured out) │   │ (alerts)    │
 └───────────┘      └──────────────────┘   └─────────────┘
```

**Flow:** ingest → (optional STT) → `/api/analyze` calls Claude with the conversation + Scam-DNA system prompt → returns structured JSON → UI animates risk meter + tactic cards → if `riskScore ≥ 75`, fire Trusted Circle alert + flip Transaction Shield to HELD.

---

## 4. Tech stack (chosen for solo speed + demo polish)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | One repo, frontend + API routes, deploys to Vercel in minutes. |
| UI | **Tailwind CSS + shadcn/ui** | Premium look fast, no design debt. |
| Animation | **Framer Motion** | The risk meter + tactic-card animations = the wow. |
| AI engine | **LLM via OpenAI API** (`gpt-4o` / structured outputs) **or Claude API** (`claude-opus-4-8`/`claude-sonnet-4-6`) | Both give structured JSON output. **OpenAI is on the hackathon's recommended-tools list** (Round-1 alignment); Claude is excellent and you have the skills. Use whichever you ship fastest in — list it accurately in the submission. Cache the static system prompt. |
| Voice authenticity (P2) | **Hugging Face** pretrained synthetic-voice / anti-spoofing model | ⭐ On the recommended-tools list AND directly strengthens the *Cybersecurity* claim. Drop-in deepfake-audio confidence signal — no training needed. |
| Transcription | **AssemblyAI** (hosted, easiest), **faster-whisper** (local, free), or **OpenAI Whisper API** | Audio→text. Pre-transcribe demo clips as fallback. |
| Alerts | **Twilio** (SMS) or **Resend** (email) | Real Trusted Circle notification. Email is faster to set up. |
| State / Auth / DB | In-memory + JSON fixtures (demo). **Supabase or Firebase** (both recommended) for the resilience score / Trusted Circle profiles. | Don't add a DB you don't need — but if you do, use a recommended one. |
| Deploy | **Vercel** (recommended) | Free, instant, gives judges a live URL. |
| Containerization (optional) | **Docker** (recommended) | A `Dockerfile` is a cheap Round-1 signal of production-readiness, even if you deploy on Vercel. |
| Design | **Figma** (recommended) | UI mockups + pitch-deck assets — plays to your design strength. |
| Repo | **GitHub (public)** (recommended) | Required; README is scraped by Round 1. |

> **Recommended-tools alignment (Round-1 edge):** the organizers published a recommended stack — GitHub, Figma, OpenAI APIs, Firebase, Supabase, Vercel, Docker, TensorFlow, Hugging Face, Node.js, Python, React. Our stack already hits most of them. Where a recommended tool is a tie with our pick, **choose the recommended one** and name it in the submission — the AI judge rewards ecosystem fit. Don't force tools you don't need (e.g. TensorFlow) just to name-drop; Hugging Face for the voice signal is the one genuinely worth adding.

> **If you'd rather Python backend:** FastAPI (Python is recommended) + a React/Vite frontend works too. But single-repo Next.js is faster for a solo full-stack sprint and deploys in one click. Recommendation: **Next.js + React** (React is on the recommended list).

---

## 5. Repository structure

```
aegis/
├── README.md                  # ⭐ Round-1 critical: see §7
├── .env.example               # ANTHROPIC_API_KEY, ASSEMBLYAI_API_KEY, etc.
├── package.json
├── app/
│   ├── page.tsx               # Landing / hero
│   ├── guardian/page.tsx      # Main dashboard
│   ├── api/
│   │   ├── analyze/route.ts   # Scam DNA Engine endpoint
│   │   ├── transcribe/route.ts
│   │   └── alert/route.ts     # Trusted Circle
├── components/
│   ├── RiskMeter.tsx
│   ├── TacticCard.tsx
│   ├── TranscriptFeed.tsx
│   ├── VerdictBanner.tsx
│   ├── TransactionShield.tsx
│   └── TrustedCircle.tsx
├── lib/
│   ├── claude.ts              # Anthropic client + prompt caching
│   ├── scamSchema.ts          # JSON schema / Zod for structured output
│   └── prompts.ts             # The Scam DNA system prompt (§6)
├── fixtures/
│   ├── grandparent-scam.json  # demo transcript (cloned-voice emergency)
│   ├── bank-impersonation.json
│   ├── romance-pig-butchering.json
│   └── safe-conversation.json # to prove no false alarm on normal calls
└── public/
    └── audio/                 # pre-recorded scam clips for the demo
```

---

## 6. The Scam DNA Engine — system prompt (drop-in)

Store in `lib/prompts.ts`. Tune wording but keep the structure.

```
You are Aegis, an expert fraud-prevention analyst specializing in social-engineering
and AI-enabled scams. You analyze a conversation (phone call transcript, SMS, chat, or
email) and determine whether it is an attempt to manipulate or defraud the person.

You detect the UNDERLYING MANIPULATION STRUCTURE, not surface keywords. Known tactics:
- URGENCY / TIME PRESSURE ("you must act in the next 10 minutes")
- AUTHORITY / IMPERSONATION (claims to be bank, police, government, a family member, CEO)
- SECRECY / ISOLATION ("don't tell anyone", "keep this between us")
- FEAR / THREAT (arrest, account closure, legal action, harm)
- IRREVERSIBLE PAYMENT (wire, gift cards, crypto, payment apps to strangers)
- TOO-GOOD REWARD (lottery, refund, investment with guaranteed returns)
- TRUST GROOMING (romance / "pig butchering" — long rapport before the ask)
- VERIFICATION EVASION ("don't hang up", "don't call them back", "I can't talk long")

For the given conversation, return ONLY a JSON object matching the provided schema:
- riskScore: integer 0-100
- verdict: "safe" | "caution" | "danger"
- tactics: array of { name, severity (low|medium|high), quote (exact span), explanation (plain language, 1 sentence) }
- plainLanguageSummary: 2-3 sentences a worried 70-year-old can understand
- recommendedAction: one concrete next step ("Hang up and call your grandson directly on his known number.")
- voiceAuthenticitySignal: optional note if a cloned/synthetic voice is plausible given context

Be precise. Quote the actual text that triggered each tactic. Do not invent quotes.
If the conversation is benign, return verdict "safe", low riskScore, and empty tactics.
```

Use **structured output (tool use)** so the model is forced to return valid JSON; validate with Zod and retry once on failure. Cache the system prompt (it's static) to cut latency/cost.

**Reliability tip for the live demo:** pre-compute and cache the engine's output for each fixture so the demo never depends on a live API hiccup, while keeping live analysis available for "type your own message" judge interaction.

---

## 7. README.md template (Round-1 critical — judges scrape this)

The README must include, in this order, with these headings:

1. **Project title + one-line tagline + hero screenshot/GIF**
2. **Problem** (2-3 sentences + the $40B / 3-second stats)
3. **Solution** (what Aegis does, the 3 differentiators)
4. **Live Demo** (deployed URL) + **Demo Video** (link)
5. **How it works** (the architecture diagram from §3)
6. **Tech Stack** (table)
7. **Features** (bulleted, mapped to themes: Cyber / Fintech / Health / AI)
8. **Getting Started** (clone, `npm install`, `.env`, `npm run dev`)
9. **Screenshots**
10. **Roadmap / Future Scope** (banks, telcos, insurers, multilingual, mobile, real deepfake-audio model)
11. **Why it matters / Impact**
12. **Team** + **License (MIT)**

Keep it structured, keyword-rich, and skimmable — the AI judge weights clear structure heavily.

---

## 8. Definition of done (per layer)

- **P0 done:** paste a scam transcript → get correct risk score + tactics + explanation rendered with animation. Paste a benign one → "safe", no false alarm.
- **P1 done:** crossing the danger threshold visibly fires a Trusted Circle alert (real or mocked) and flips the Transaction Shield to HELD.
- **Deploy done:** the whole flow works on the public Vercel URL on a fresh browser.
- **Submission done:** every field in `03_SUBMISSION_PACKAGE.md` is filled and the repo README matches §7.
