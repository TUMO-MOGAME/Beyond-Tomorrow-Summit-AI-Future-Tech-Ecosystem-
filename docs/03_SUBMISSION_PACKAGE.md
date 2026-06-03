# 📦 Aegis — Devpost Submission Package (copy-paste ready)

> Written to win **Round 1 (AI parser)**: every field filled, structured, keyword-dense, topic-sentence-first.
> Verify links before submitting. Keep the structure — the AI judge rewards it.

---

## Project Name
**Aegis — The AI Guardian That Stops Scams Before They Happen**

---

## Tagline (≤ 1 line)
An AI guardian that hears manipulation in any conversation — voice, SMS, or chat — and intervenes in real time, looping in family before a vulnerable person loses money.

---

## Elevator Pitch / Short Description (Devpost "what it does", ~200 words)
Aegis is an AI-powered fraud-prevention guardian that protects people — especially the elderly and vulnerable — from the explosion of AI-enabled scams. While banks and existing tools detect fraud *after* the money is gone, Aegis intervenes *during* the attack. Its **Scam DNA Engine** uses a large language model to detect the underlying psychological manipulation playbook scammers use — urgency, authority impersonation, secrecy, fear, and irreversible payments — rather than easily-evaded keyword filters. The engine is **provider-agnostic** (it runs on Claude, OpenAI, or free models like Groq Llama 3.3 70B and Google Gemini, with an offline fallback), so the live demo always works.

When Aegis detects a scam it does three things instantly: (1) **warns the user** in plain language; (2) **alerts their Trusted Circle** of loved ones with a personalized email/SMS — the single most effective real-world circuit-breaker for elder fraud; and (3) **freezes the suspicious transaction**. For real phone calls, Aegis works as a **"Guardian Number"**: only *unknown* callers are screened (family calls stay private), and on high risk it can **conference a loved one into the call and hold it** until they arrive.

Aegis sits at the intersection of **Cybersecurity**, **Fintech**, and **Healthcare** — turning a $40-billion problem into a moment of safety.

---

## Problem Statement
**AI has made scams faster, cheaper, and nearly impossible to detect — and the people who suffer most are those least equipped to fight back.**

- Generative-AI-enabled fraud losses in the US are projected to reach **$40 billion by 2027**, up from $12.3 billion in 2023 — a 32% compound annual growth rate (Deloitte).
- US consumers reported losing **$12.5 billion to fraud in 2024**, a 25% year-over-year increase (FTC).
- A scammer needs only **3 seconds of audio** to clone a voice with 85% accuracy, and **70% of people cannot distinguish** a cloned voice from the real one (AARP).
- **25% of adults** have experienced or know someone affected by an AI voice-cloning scam; **77% of victims lost money** (McAfee).
- Deepfake fraud attempts now occur on average **every five minutes** (Entrust).

Existing defenses fail for three reasons: they are **reactive** (they flag fraud after the transfer clears), they rely on **keyword/blocklist matching** (which AI-generated scams trivially evade), and they **ignore the human moment** — there is no intervention while the victim is being manipulated in real time. The harm is concentrated among the elderly and vulnerable.

---

## Solution Overview
**Aegis is a real-time, modality-agnostic AI guardian that detects manipulation intent and intervenes before money is lost.**

1. **Scam DNA Engine (AI core).** A large language model analyzes any conversation — phone call, SMS, chat, or email — and detects the *underlying manipulation structure* (urgency, authority impersonation, secrecy, fear, irreversible payment, trust grooming), not surface keywords. It returns a risk score, the exact triggering quotes, a plain-language explanation, and a recommended action. Provider-agnostic with a tiered structured-output strategy.
2. **Real-time guardian dashboard.** As a conversation unfolds, a live risk meter climbs and tactics light up with the exact words that triggered them — making an invisible attack visible.
3. **Trusted Circle (human-in-the-loop).** When risk crosses a threshold, Aegis alerts pre-designated loved ones with a **personalized email and SMS** — the most effective real-world way to stop elder fraud.
4. **Transaction Shield (fintech).** Aegis holds the suspicious transfer before it completes.
5. **Guardian Number (real-world call delivery).** Because no phone app can legally tap a live cellular call, Aegis routes only *unknown* callers through a managed number (family calls are never monitored — privacy by design), transcribes them live, and on high risk **holds the call, conferences in a loved one, and falls back to a safe script** if no one answers in time.

**What makes Aegis original:** it is *preventive* not forensic; it detects *intent* not keywords (so it generalizes across channels and languages); and it builds a *social safety net* around the user instead of leaving them alone with the attacker.

---

## How We Built It / Technical Implementation
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion. A distinctive monochrome design system with real human photography (so the tech recedes and the people carry the warmth).
- **AI Engine:** a **provider-agnostic** "Scam DNA Engine" — Anthropic Claude via its SDK; Groq (Llama 3.3 70B), Google Gemini, OpenRouter, and OpenAI via one OpenAI-compatible path; offline heuristic mock fallback. Tiered structured output (strict JSON schema → JSON object → parse) with Zod validation and retry. The **live demo currently runs on Groq Llama 3.3 70B (free)**.
- **Voice (Guardian Number prototype):** Twilio Programmable Voice — real-time Transcription of unknown callers, Conference + Participant API to bridge in family and hold the call, with a consent disclosure and a no-answer fallback (`app/api/voice/*`).
- **Alerts:** Resend (personalized multi-recipient email) + Twilio (SMS) to the Trusted Circle.
- **Backend & safety:** Next.js API route handlers; defensive input validation; opt-in Twilio webhook signature verification; every integration degrades gracefully to a mock so the demo never hard-fails.
- **Quality:** a 61-check automated test suite (engine, alerts, voice routes); passing locally and against the live deployment.
- **Research:** a cited deep-research feasibility study established the real-world architecture (see "Challenges").
- **Deployment:** Vercel (live public URL); GitHub (public repository).

---

## Technology Stack (list form for the parser)
AI / ML: provider-agnostic LLM engine — Claude (Anthropic), Groq Llama 3.3 70B, Google Gemini, OpenRouter, OpenAI · structured output, prompt engineering, Zod validation · Voice: Twilio Programmable Voice (real-time transcription, conference, hold) · Frontend: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion · Backend: Next.js API routes, Node.js · Alerts: Resend (email), Twilio (SMS) · Infra: Vercel, GitHub · Domains: Cybersecurity, Fintech, Healthcare.

---

## Challenges We Ran Into
- **The hard feasibility wall.** We researched whether an app could simply "listen to grandma's calls" and found it cannot — Apple forbids third-party access to live call audio and Android is metadata-only (plus a 2022 Play ban on accessibility-based recording). We turned this into the **Guardian Number** architecture: route only unknown callers through a managed number, where analysis, conferencing, and holding the call are all possible and legal with an up-front consent disclosure.
- Forcing consistent, valid structured output across *different* LLM providers — solved with a tiered JSON strategy (schema → object → parse) plus Zod validation and retry.
- Designing an intervention that is protective without being paternalistic — solved with the Trusted Circle, privacy-by-design (only unknown calls monitored), and plain-language explainability.

## Accomplishments We're Proud Of
- A working end-to-end prototype that detects a scam, explains it, alerts loved ones, and freezes a transaction — live, on a free LLM.
- A single engine that works across voice, SMS, and chat in multiple languages, on any LLM provider.
- A research-validated, privacy-first real-world architecture (the Guardian Number) and a 61-check test suite.

## What We Learned
- The hardest part of scam prevention isn't detection — it's **intervening at the human moment**, legally and with dignity, in a way the most vulnerable users never have to think about.

---

## Future Scope / What's Next
- **Guardian Number to production:** upgrade the Twilio prototype to screen real unknown callers; carrier conditional call-forwarding; measured low-latency intervention.
- **Payment hold:** bank/fintech partnerships (or Plaid-based monitoring) to freeze transfers in real life.
- **On-device + privacy:** edge inference so conversations never leave the phone.
- **Distribution:** B2B2C partnerships with banks, telecoms, and insurers; an SDK to embed Aegis.
- **Eldercare integration:** caregiver dashboard and care-provider partnerships.
- **Regulatory:** align with emerging anti-fraud and AI-disclosure regulation as a compliance layer.

---

## Team Details
- **Tumo Mogame** — Founder, Full-Stack & AI Engineer, Designer, and Pitch Lead. Built the Scam DNA Engine, the guardian dashboard, the Trusted Circle and Transaction Shield, the Guardian Number voice prototype, and produced the demo and pitch. (Solo project.)
- Contact: emma.m.strategy@gmail.com · GitHub: https://github.com/TUMO-MOGAME

---

## Links
- **GitHub Repository (public):** https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-
- **Live Demo:** https://beyond-tomorrow-summit-ai-future-te.vercel.app/
- **Demo Video (≤3 min):** [YouTube unlisted link — record next]
- **Pitch Deck:** Aegis_Pitch_Deck.pptx (in repo) — [or upload + link]

---

## ⚙️ Round-1 optimization checklist (do before submitting)
- [ ] Every mandatory field above is filled — no blanks.
- [ ] First sentence of each section states the point directly (parsers weight it heavily).
- [ ] Theme keywords present: AI, machine learning, cybersecurity, fintech, healthcare, fraud detection, real-time, prototype, scalability, impact.
- [ ] Repo is **public** with a structured README (live link at top, architecture, tech table, screenshots).
- [ ] Live URL works in a clean browser and shows a real provider badge (`groq · llama-3.3-70b-versatile`), not `mock`.
- [ ] Demo video link is public/unlisted and plays.
- [ ] Screenshots attached (from the current monochrome design).
- [ ] Stats are cited (they signal rigor to both AI and human judges).
