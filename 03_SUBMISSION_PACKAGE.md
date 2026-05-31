# 📦 Aegis — Devpost Submission Package (copy-paste ready)

> Written to win **Round 1 (AI parser)**: every field filled, structured, keyword-dense, topic-sentence-first.
> Edit names/links in [brackets]. Keep the structure — the AI judge rewards it.

---

## Project Name
**Aegis — The AI Guardian That Stops Scams Before They Happen**

---

## Tagline (≤ 1 line)
An AI guardian that detects manipulation in any conversation — voice, SMS, or chat — and intervenes in real time to protect vulnerable people and their money.

---

## Elevator Pitch / Short Description (Devpost "what it does", ~200 words)
Aegis is an AI-powered fraud-prevention guardian that protects people — especially the elderly and vulnerable — from the explosion of AI-enabled scams. While banks and existing tools detect fraud *after* the money is gone, Aegis intervenes *during* the attack. It listens to a phone call, SMS, or chat, and its **Scam DNA Engine** uses a large language model to detect the underlying psychological manipulation playbook scammers use — urgency, authority impersonation, secrecy, fear, and irreversible payments — rather than relying on easily-evaded keyword filters.

When Aegis detects a scam, it does three things instantly: (1) **warns the user** in plain language they can understand, explaining exactly why the message is dangerous; (2) **alerts a trusted family member** through the user's Trusted Circle — the single most effective real-world circuit-breaker for elder fraud; and (3) **freezes the suspicious transaction** before the money leaves the account.

Aegis sits at the intersection of **Cybersecurity** (social-engineering and deepfake detection), **Fintech** (real-time transaction protection), and **Healthcare** (protecting cognitively vulnerable people and building resilience). It turns a $40-billion problem into a moment of safety.

---

## Problem Statement
**AI has made scams faster, cheaper, and nearly impossible to detect — and the people who suffer most are those least equipped to fight back.**

- Generative-AI-enabled fraud losses in the US are projected to reach **$40 billion by 2027**, up from $12.3 billion in 2023 — a 32% compound annual growth rate (Deloitte).
- US consumers reported losing **$12.5 billion to fraud in 2024**, a 25% year-over-year increase (FTC).
- A scammer needs only **3 seconds of audio** to clone a voice with 85% accuracy, and **70% of people cannot distinguish** a cloned voice from the real one (AARP).
- **25% of adults** have experienced or know someone affected by an AI voice-cloning scam; **77% of victims lost money** (McAfee).
- Deepfake fraud attempts now occur on average **every five minutes** (Entrust).

Existing defenses fail for three reasons: they are **reactive** (they flag fraud after the transfer clears), they rely on **keyword/blocklist matching** (which AI-generated scams trivially evade), and they **ignore the human moment** — there is no intervention while the victim is being manipulated in real time. The result is devastating financial and emotional harm, concentrated among the elderly and vulnerable.

---

## Solution Overview
**Aegis is a real-time, modality-agnostic AI guardian that detects manipulation intent and intervenes before money is lost.**

1. **Scam DNA Engine (AI core).** A large language model analyzes any conversation — phone call, SMS, chat, or email — and detects the *underlying manipulation structure* (urgency, authority impersonation, secrecy, fear, irreversible payment, trust grooming), not surface keywords. It returns a risk score, the exact triggering quotes, a plain-language explanation, and a recommended action.
2. **Real-time guardian dashboard.** As a conversation unfolds, a live risk meter climbs and manipulation tactics light up with the exact words that triggered them — making an invisible attack visible.
3. **Trusted Circle (human-in-the-loop).** When risk crosses a threshold, Aegis instantly alerts a pre-designated family member — the most effective real-world way to stop elder fraud.
4. **Transaction Shield (fintech).** Aegis holds the suspicious transfer before it completes, stopping the loss at the moment it matters.
5. **Resilience layer (health/behavioral).** Aegis explains every threat in plain language, so users become harder to fool over time.

**What makes Aegis original:** it is *preventive* not forensic; it detects *intent* not keywords (so it generalizes across channels and languages); and it builds a *social safety net* around the user instead of leaving them alone with the attacker.

---

## How We Built It / Technical Implementation
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion for real-time animation.
- **AI Engine:** Claude (Anthropic) large language model with structured tool-based JSON output and prompt caching, driven by a custom social-engineering detection system prompt (the "Scam DNA Engine").
- **Speech-to-text:** AssemblyAI / Whisper for converting call audio to analyzable transcripts.
- **Alerts:** Resend (email) / Twilio (SMS) for Trusted Circle notifications.
- **Backend:** Next.js API route handlers; Zod schema validation with retry for reliable structured output.
- **Deployment:** Vercel (live public URL); GitHub (public repository).

---

## Technology Stack (list form for the parser)
AI / ML: Claude (Anthropic) LLM, structured output, prompt engineering · Speech-to-text (AssemblyAI / Whisper) · Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion · Backend: Next.js API routes, Node.js, Zod · Integrations: Resend / Twilio · Infra: Vercel, GitHub · Domains: Cybersecurity, Fintech, Healthcare.

---

## Challenges We Ran Into
- Forcing consistent, valid structured output from the LLM under varied inputs — solved with a strict schema, tool-based output, and validation-with-retry.
- Detecting *intent* rather than keywords so the system generalizes across channels and languages without retraining.
- Designing an intervention that is protective without being paternalistic — solved with the Trusted Circle and plain-language explainability.

## Accomplishments We're Proud Of
- A working end-to-end prototype that detects a scam, explains it, alerts a family member, and freezes a transaction — live.
- A single engine that works across voice, SMS, and chat in multiple languages.

## What We Learned
- The hardest part of scam prevention isn't detection — it's intervening at the human moment, in a way the most vulnerable users can understand and trust.

---

## Future Scope / What's Next
- **Distribution:** B2B2C partnerships with banks, telecom carriers, and insurers; an SDK so any banking or messaging app can embed Aegis.
- **Deepfake audio forensics:** a dedicated synthetic-voice detection model as a second signal.
- **On-device + privacy:** edge inference so conversations never leave the user's phone.
- **Languages:** expand multilingual coverage for global reach.
- **Eldercare integration:** partnerships with care providers and a caregiver dashboard.
- **Regulatory:** align with emerging anti-fraud and AI-disclosure regulation as a compliance layer.

---

## Team Details
- **[Your Full Name]** — Founder, Full-Stack & AI Engineer, Designer, and Pitch Lead. Built the Scam DNA Engine, the guardian dashboard, the Trusted Circle and Transaction Shield, and produced the demo and pitch. (Solo project.)
- Contact: [emma.m.strategy@gmail.com] · [GitHub] · [LinkedIn]

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
- [ ] Repo is **public** with a structured README (see `01_BUILD_SPEC.md §7`).
- [ ] Live URL works in a clean browser.
- [ ] Demo video link is public/unlisted and plays.
- [ ] Screenshots attached.
- [ ] Stats are cited (they signal rigor to both AI and human judges).
