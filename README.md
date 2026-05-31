<div align="center">

# 🛡️ Aegis

### Stop scams before they happen.

**An AI guardian that detects manipulation in any conversation — voice, SMS, or chat — and intervenes in real time to protect vulnerable people and their money.**

`AI` · `Cybersecurity` · `Fintech` · `Healthcare`

Built for the **Beyond Tomorrow Summit Hackathon 2026** · *Code the Future. Shape the World.*

### 🔗 [**Live Demo →**](https://beyond-tomorrow-summit-ai-future-te.vercel.app/) &nbsp;·&nbsp; [Try the Guardian](https://beyond-tomorrow-summit-ai-future-te.vercel.app/guardian)

</div>

---

## 🚨 The Problem

AI has made scams faster, cheaper, and nearly impossible to detect — and the people who suffer most are those least equipped to fight back.

- **$40 billion** in AI-enabled fraud losses projected in the US by 2027, up from $12.3B in 2023 — a 32% CAGR *(Deloitte)*.
- **$200M+** lost to deepfake-enabled fraud in Q1 2025 alone *(industry reporting)*.
- A voice can be cloned from just **3 seconds** of audio, and **70% of people can't tell** it's fake *(AARP)*.
- **1 in 4 adults** have encountered an AI voice-cloning scam; **77% of victims lost money** *(McAfee)*.

Today's defenses are **reactive** (they catch fraud after the money is gone), **keyword-based** (AI scams rewrite themselves to evade filters), and **leave the victim alone** with the attacker. Aegis fixes all three.

## 💡 The Solution

Aegis is a **real-time, modality-agnostic AI guardian** that detects manipulation *intent* and intervenes *before money is lost*.

1. **🧠 Scam DNA Engine** — an LLM analyzes any conversation and detects the underlying manipulation structure (urgency, authority impersonation, secrecy, fear, irreversible payment), not surface keywords. Returns a risk score, the exact triggering quotes, a plain-language explanation, and a recommended action.
2. **📊 Real-time Guardian Dashboard** — a live risk meter climbs and manipulation tactics light up as the conversation unfolds, making an invisible attack visible.
3. **👨‍👩‍👧 Trusted Circle** — when risk crosses a threshold, Aegis instantly alerts a pre-designated family member — the most effective real-world circuit-breaker for elder fraud.
4. **🏦 Transaction Shield** — Aegis holds the suspicious transfer before it completes, stopping the loss at the moment it matters.

## ✨ What makes Aegis different

| | Aegis | Existing tools |
|---|---|---|
| **When it acts** | During the attack (prevention) | After the money's gone (forensics) |
| **How it detects** | Manipulation *intent* (any channel/language) | Keywords / blocklists (easily evaded) |
| **Who it protects** | Loops in family + freezes the payment | Leaves the victim alone |

## 🏗️ How it works

```
Ingest (call / SMS / chat)
        │
        ▼  (speech-to-text if audio)
  Scam DNA Engine  ──►  risk score + tactics + explanation (structured JSON)
        │
        ▼  if riskScore ≥ threshold
  ┌─────────────┬──────────────────┐
  ▼             ▼                  ▼
Warn user   Alert Trusted     Freeze the
on-screen   Circle (family)   transaction
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| AI Engine | LLM (OpenAI / Claude) with structured output · the "Scam DNA Engine" |
| Voice authenticity | Hugging Face synthetic-voice detection model |
| Speech-to-text | AssemblyAI / Whisper |
| Alerts | Twilio (SMS) / Resend (email) |
| Data / Auth | Supabase |
| Infra | Vercel · GitHub · Docker |

## 🚀 Getting Started

```bash
git clone https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-.git
cd Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-
npm install
cp .env.example .env.local   # add your API keys
npm run dev
```

Open http://localhost:3000 and click **Try the Guardian**.

> **Or skip setup — try it live:** [beyond-tomorrow-summit-ai-future-te.vercel.app](https://beyond-tomorrow-summit-ai-future-te.vercel.app/)

## 👵 Care Mode — protection with zero effort from the senior

Aegis is designed around one principle: **the best protection for someone who can't protect themselves is protection they never have to think about.** The senior does nothing — their family sets it up once.

- **Family-managed** — the adult child configures the Trusted Circle and settings from *their* phone; the senior's phone just runs Aegis silently.
- **Always-on, invisible** — installed once, never opened again. No app to launch, no button to press when the phone rings.
- **Automatic intervention** — on danger, family is alerted and the payment is frozen without the senior having to read a screen or make a decision.
- **Roadmap:** a spoken warning in the call ("this may be a scam"), auto-callback verification of the real relative, and carrier/SIM-level deployment with nothing installed at all.

## 🗺️ Roadmap

- Dedicated deepfake-audio forensics model as a second detection signal
- On-device / edge inference so conversations never leave the phone (privacy)
- B2B2C SDK for banks, telecom carriers, and insurers
- Expanded multilingual coverage for global reach
- Caregiver dashboard for eldercare providers
- Spoken in-call warnings + carrier-level (SIM) deployment for zero-install protection

## 🌍 Impact

Aegis protects the **1B+ elderly and vulnerable people** worldwide who are the primary targets of AI-powered fraud. It turns a $40-billion problem into a moment of safety.

## 👤 Team

**Tumo Mogame** — Founder, Full-Stack & AI Engineer, Designer (solo project).

## 📄 License

MIT — see [LICENSE](LICENSE).

---

<div align="center">
<em>Scammers got an AI. It's time the rest of us got one too.</em><br/>
<strong>Aegis — Beyond Tomorrow Summit 2026</strong>
</div>
