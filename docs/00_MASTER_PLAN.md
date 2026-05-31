# 🛡️ AEGIS — Master Plan

> **The AI guardian that stops scams before they happen.**
> Beyond Tomorrow Summit Hackathon · Solo build · 6-day sprint · Target: **1st place ($1,000)**

---

## 0. TL;DR

We are building **Aegis**: an AI guardian that listens to a call, message, or chat in real time, detects the *psychological manipulation playbook* scammers use, scores the danger, explains it in plain language, loops in a trusted family member, and **holds the risky payment before the money leaves**.

It sits at the exact intersection of the hackathon's three themes — **Cybersecurity × Fintech × Health** — with **AI as the engine**. It is emotional, timely (2026 is the peak of the AI voice-clone scam epidemic), defensible, and — critically — **buildable solo in 6 days as a working demo**.

- **Working name:** Aegis *(alternatives: Halo, Sentinel, Verity — swap freely)*
- **Tagline:** *Stop scams before they happen.*
- **One-liner:** *Aegis is an AI guardian that detects manipulation in any conversation — voice, SMS, or chat — and intervenes to protect vulnerable people and their money in real time.*

---

## 1. Why this wins (the strategic thesis)

### 1.1 It hits all three themes at once
| Theme | How Aegis embodies it |
|---|---|
| **Cybersecurity** | Detects social engineering, impersonation, deepfake/voice-clone signals, phishing patterns. |
| **Fintech** | Intercepts scam payments before transfer; a "transaction shield" that flags/holds suspicious transactions. |
| **Health** | Protects cognitively vulnerable & elderly people; builds *financial-emotional resilience*; reduces the trauma & wellbeing damage of being scammed. |
| **AI (engine)** | The "Scam DNA Engine" — an LLM that understands manipulation *intent*, not just keywords. |

Judges score **impact + originality** highest. A project that genuinely lives in the overlap of all themes beats single-theme projects.

### 1.2 The problem is enormous, current, and emotional
- Generative-AI-enabled fraud losses in the US are projected to hit **$40 billion by 2027**, up from $12.3B in 2023 — a **32% CAGR** (Deloitte).
- US consumers lost **$12.5 billion to fraud in 2024**, up 25% YoY (FTC).
- A scammer needs only **3 seconds of audio** to clone a voice at **85% accuracy**; **70% of people cannot tell** a cloned voice from the real one (AARP).
- **25% of adults** have experienced or know someone who hit an AI voice-cloning scam; **77% of victims lost money** (McAfee).
- Deepfake fraud attempts occurred on average **every 5 minutes** in 2024; Arup lost **$25M** to a single deepfake video call (WEF).

This is not a hypothetical "future" problem — it's happening now, to real families, and current tools detect fraud *after the money is gone*. **Aegis intervenes during the attack.** That's the wedge.

### 1.3 The novel, defensible angles (our "moat" in the pitch)
1. **Prevention, not forensics.** Banks/tools detect fraud *after* the transfer. Aegis acts *during the conversation, before the payment*.
2. **Modality-agnostic "Scam DNA."** The same engine works on a phone call, an SMS, a WhatsApp thread, or an email — because it detects the *underlying manipulation structure* (urgency, authority, secrecy, isolation, irreversible payment), not surface keywords. Keyword filters fail; intent detection generalizes.
3. **The Trusted Circle (human-in-the-loop).** When risk is high, Aegis alerts a pre-designated family member — the single most effective real-world circuit-breaker for elder fraud. This social design is novel and emotionally powerful.
4. **It teaches, building resilience.** Aegis explains *why* a message is a scam in plain language, so the user gets harder to fool over time (a "resilience score"). That's the Health/behavioral layer competitors lack.

### 1.4 It's demoable with a visceral "wow" moment
The demo isn't a dashboard — it's a *rescue*. The judge watches a fake "grandson in jail, needs bail money" call unfold, sees the risk meter climb, the manipulation tactics light up live, the daughter get an alert, and the bank transfer get frozen. People remember feelings, not feature lists.

---

## 2. The two judges (dual-round strategy)

This hackathon has **two completely different evaluators**. Most teams optimize for one and get filtered by the other. We optimize for both.

### Round 1 — The AI parser (AiForJob)
An automated system reads your submission text + repo + video metadata and scores against a rubric (completeness, innovation, technical merit, theme fit). **A great project with a vague write-up dies here, unseen by humans.**

**How we win Round 1:**
- Fill **every** mandatory Devpost field — missing fields = auto-deductions.
- Use **explicit, keyword-dense, structured** language. Mirror the hackathon's own vocabulary: *AI, machine learning, cybersecurity, fintech, healthcare, fraud detection, real-time, prototype, impact, scalability.*
- Lead every section with a clear topic sentence (parsers weight the first sentence heavily).
- Put a clean, well-structured **README** in the repo (AI judges scrape it). Include architecture diagram, setup steps, tech stack table, screenshots.
- Make the repo **public** with real, readable, committed code (judges may scan for substance vs. empty repos).
- Use clear headings and bullet lists everywhere — machine-legible beats prose.
- See `03_SUBMISSION_PACKAGE.md` for ready-to-paste, optimized copy.

### Round 2 — The human panel (live online presentation)
Shortlisted teams pitch live. Humans reward **narrative, wow, confidence, and "it actually works."**

**How we win Round 2:**
- Open with the *story*, not the tech (the rescue scenario).
- Live demo that runs flawlessly (rehearsed, with a recorded fallback).
- Crisp problem→solution→impact arc; cite the $40B / 3-second stats.
- Show the working prototype, not slides about a prototype.
- End on vision + scalability (banks, telcos, governments as customers).
- See `04_PITCH_DECK.md` and `05_DEMO_VIDEO_SCRIPT.md`.

---

## 3. Judging-criteria map (build to the rubric)

| Typical criterion | How Aegis scores high | Where it shows up |
|---|---|---|
| **Innovation / originality** | Real-time *prevention* + modality-agnostic intent detection + Trusted Circle | Demo, pitch, README |
| **Technical implementation** | Live LLM engine w/ structured output, audio transcription, real-time UI, alert system | Repo, demo |
| **Impact / relevance** | $40B problem, vulnerable-people focus, all 3 themes | Pitch, problem statement |
| **Functionality (working demo)** | End-to-end flow runs live on a deployed URL | Demo video + live |
| **Presentation / clarity** | Story-first pitch, clean deck, plain-language explainability | Round 2 |
| **Completeness** | Every Devpost field filled, public repo, README, screenshots | Submission |
| **Scalability / future scope** | B2B2C: banks, telcos, insurers, eldercare; multilingual | Pitch closing |

---

## 4. Scope discipline (what we will and won't build)

**We WILL build (the demo-critical core):**
1. Conversation input (paste text, upload audio→transcribe, or "simulate live call" with pre-recorded scam audio).
2. The **Scam DNA Engine** (Claude API, structured JSON): risk score, detected tactics with highlighted quotes, plain-language explanation, recommended action.
3. A **real-time guardian dashboard** with an animated risk meter and tactic cards lighting up live.
4. **Trusted Circle alert** (real email/SMS if time, polished mockup if not).
5. **Transaction Shield** panel: a pending bank transfer auto-held when a scam is detected.

**We will NOT (over-)build:**
- A from-scratch deepfake-audio ML model (too slow to train reliably in 6 days — we use a confidence-signal heuristic / pretrained model as a *secondary* signal and frame full audio-forensics as roadmap).
- Real bank integrations (we mock a realistic bank panel).
- Auth, user accounts, billing, mobile apps (all roadmap).
- Anything that doesn't appear in the 3-minute demo.

> **Golden rule:** if a feature won't appear in the demo video, it doesn't get built this week.

---

## 5. Risk register & mitigations

| Risk | Mitigation |
|---|---|
| Demo fails live in Round 2 | Pre-record a flawless demo video; have deployed URL + localhost fallback; rehearse 5×. |
| LLM returns inconsistent JSON | Use structured/tool-based output with a strict schema + retry; cache demo responses as fallback. |
| Audio transcription flaky | Pre-transcribe demo audio; keep "paste transcript" path as the reliable default. |
| Run out of time | Build in priority order (core engine → UI → alerts → shield → polish); each layer is independently demoable. |
| "Just another scam detector" perception | Hammer the 3 differentiators: prevention, modality-agnostic intent, Trusted Circle. |
| Round 1 filter | Follow `03_SUBMISSION_PACKAGE.md` to the letter; fill every field. |

---

## 6. Deliverables checklist (Devpost mandatory)

- [ ] Project Name — **Aegis**
- [ ] Project Description — see `03_SUBMISSION_PACKAGE.md`
- [ ] Team Details — solo (your name, role: founder/full-stack/AI)
- [ ] Problem Statement — see `03`
- [ ] Solution Overview — see `03`
- [ ] Technology Stack — see `01` + `03`
- [ ] GitHub Repository (public, with README) — see `01`
- [ ] Demo Video (≤3 min) — script in `05`
- [ ] Presentation / Pitch Deck — outline in `04`
- [ ] Screenshots / product images — capture during build

---

## 7. The plan files

| File | What it gives you |
|---|---|
| `00_MASTER_PLAN.md` | This — strategy, why we win, scope. |
| `01_BUILD_SPEC.md` | Features, architecture, tech stack, repo structure, the Scam DNA schema. |
| `02_TIMELINE.md` | Day-by-day, hour-by-hour 6-day execution plan. |
| `03_SUBMISSION_PACKAGE.md` | Every Devpost field, written and AI-round-optimized — copy-paste ready. |
| `04_PITCH_DECK.md` | Slide-by-slide deck content for Round 2. |
| `05_DEMO_VIDEO_SCRIPT.md` | Shot-by-shot demo video script (follows the official guidelines). |

**Next action:** read `01_BUILD_SPEC.md`, then start Day 1 in `02_TIMELINE.md`.
