# 🎤 Aegis — Round 2 Live Pitch Playbook

> Shortlisted teams present live online to human judges. This is where the prize is won.
> Humans reward: a story, a working demo, conviction, and a clear "why it matters."
> Live site: https://beyond-tomorrow-summit-ai-future-te.vercel.app/

---

## The 4-minute spine (adjust to your time slot)

**Structure: Story → Problem → Solution → DEMO → Impact → Vision.** Put the demo in the
middle so judges' questions land on substance, not "does it work."

### 0:00–0:30 — Open on the story (NO tech yet)
> "Imagine your grandmother gets a call. It's your voice — scared, in jail, needing money now. She'd do anything to help. So she wires $4,000. But it was never you. It was an AI clone of your voice, made from a 3-second clip. This happens every five minutes."

### 0:30–1:00 — The problem at scale
> "AI made scams infinitely scalable. $40 billion in losses projected by 2027. And the people hit hardest are the ones least able to fight back — the elderly. Today's tools catch fraud *after* the money's gone. We built one that steps in *during* the attack."

### 1:00–1:30 — The solution in one breath
> "Aegis is an AI guardian. It listens to a call, text, or chat, detects the manipulation in real time, warns the family, and freezes the payment before a cent is lost. And the person being protected does nothing — their family sets it up once."

### 1:30–3:00 — LIVE DEMO (share screen)
Run `/guardian` → grandparent scam → meter climbs → tactics → alert → **HELD**.
Then Spanish fixture (5s). Then `/care` to show the zero-effort setup. Narrate calmly.
> "Risk hits 96. Aegis alerts the daughter… and freezes the $4,000 wire. Same engine in Spanish. And here's how a family sets it up — three steps, from their phone. Grandma never touches a thing."

### 3:00–4:00 — Impact, business, vision, close
> "This protects over a billion vulnerable people. Banks, telcos and insurers pay for it — they save billions in fraud reimbursement. We start with a working prototype today; tomorrow it's embedded in every bank and phone. Scammers got an AI. It's time the rest of us got one too. That's Aegis."

---

## Delivery rules
- **Energy + conviction.** Solo founders win on belief. You think vulnerable people deserve a guardian — let them feel it.
- **Demo safety net:** live URL + a recorded demo clip + localhost, all open in tabs. If wifi dies, play the clip without missing a beat.
- **Slow down.** Pauses read as confidence.
- **End every answer by tying back to impact.**
- Have the deck (`Aegis_Pitch_Deck.pptx`) open in presenter view as backup visuals.

---

## Judge Q&A — drilled answers

**"How is this different from spam/scam filters?"**
> Filters match keywords and act after the fact. Aegis detects manipulation *intent* — so it generalizes across channels and languages — and it intervenes *during* the call, plus it loops in family. Prevention, not forensics.

**"How accurate is it? False positives?"**
> It's explainable — it shows the exact quote behind every flag, so users can verify. Benign conversations score safe (I can show you the control call now). The threshold is tunable, and family confirmation means a false hold is a 10-second phone call, not a lost account.

**"How do you actually detect a cloned voice?"**
> Today, we detect the *linguistic and behavioral* manipulation — which works no matter how perfect the voice is. Our roadmap adds a dedicated synthetic-voice forensics model from Hugging Face as a second signal.

**"What's the business model?"**
> B2B2C. Banks, telcos, insurers and eldercare providers license Aegis — they already eat the cost of fraud reimbursement and churn, so prevention pays for itself. Plus an embeddable SDK.

**"Privacy — you're listening to calls?"**
> Opt-in, consent-based, family-configured. Roadmap is on-device/edge inference so conversations never leave the phone. Designed for vulnerable users with caregiver consent from day one.

**"Can elderly people actually use it?"**
> They don't have to. That's the whole design. Family sets it up once; it runs silently. The senior presses no buttons and reads no screens. (Show `/care`.)

**"What did you build vs. mock?"**
> The Scam DNA Engine is real — a live LLM with structured, validated output, provider-agnostic across Claude and OpenAI. The dashboard, multilingual detection, family alert and transaction-hold all run live. Bank and telco integrations are mocked realistically — that's the go-to-market, not the core tech.

**"Why you? Can it scale?"**
> Built solo, end-to-end, in 6 days — engine, product, and pitch. The engine is model- and channel-agnostic, so scaling is integration work, not reinvention.

---

## Pre-pitch checklist
- [ ] `ANTHROPIC_API_KEY` live on Vercel (real-engine badge)
- [ ] Tabs open: live `/guardian`, `/care`, recorded demo clip, deck (presenter view)
- [ ] Tested screen-share + audio on the meeting platform beforehand
- [ ] Rehearsed the full pitch out loud 5× with a timer
- [ ] Glass of water, good lighting, quiet room, phone on silent
- [ ] One-line answer ready for "tell us about yourself"
