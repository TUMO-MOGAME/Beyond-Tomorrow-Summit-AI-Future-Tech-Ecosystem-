# ✅ Aegis — Final Devpost Submission Checklist

> Deadline: **5 Jun 2026, 11:00pm GMT+2.** Submit a day early. Round 1 is an AI parser —
> every blank field costs you. Copy from `03_SUBMISSION_PACKAGE.md`.

---

## Mandatory Devpost fields
- [ ] **Project Name** — `Aegis — The AI Guardian That Stops Scams Before They Happen`
- [ ] **Tagline** — one line (see `03`)
- [ ] **Project Description / "What it does"** — paste the ~200-word elevator pitch (`03`)
- [ ] **Problem Statement** — paste (`03`), keep the cited stats
- [ ] **Solution Overview** — paste (`03`)
- [ ] **How we built it / Technical Implementation** — paste (`03`)
- [ ] **Technology Stack** — paste the list form (`03`)
- [ ] **Challenges / Accomplishments / What we learned** — paste (`03`)
- [ ] **Future Scope** — paste (`03`)
- [ ] **Team Details** — Tumo Mogame, solo; role + contact
- [ ] **GitHub Repository (public)** — https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-
- [ ] **Live Demo URL** — https://beyond-tomorrow-summit-ai-future-te.vercel.app/
- [ ] **Demo Video (≤3 min)** — YouTube unlisted link (record via `08_VIDEO_TELEPROMPTER.md`)
- [ ] **Pitch Deck** — upload `Aegis_Pitch_Deck.pptx` (export PDF too if Devpost prefers)
- [ ] **Screenshots / images** — landing, guardian mid-detection, DANGER + shield HELD, Trusted Circle alert, Spanish scam, Care Mode, SAFE result

## Quality gate (Round-1 AI parser)
- [ ] No blank fields anywhere
- [ ] First sentence of each section states the point directly
- [ ] Theme keywords present: AI, machine learning, cybersecurity, fintech, healthcare, fraud detection, real-time, prototype, scalability, impact
- [ ] Repo README has the live link at top, architecture, tech table, screenshots
- [ ] `ANTHROPIC_API_KEY` added to Vercel → live badge shows `anthropic · claude-sonnet-4-6` (not `mock`)
- [ ] Live URL tested in an incognito window (works clean)
- [ ] Demo video link plays in incognito; same link in README + Devpost

## Screenshot capture list (for Devpost + deck slide 7 + README)
Capture each at ~110% zoom on the live site:
1. Landing hero (tagline + stats)
2. Care Mode landing section
3. `/care` setup — step 1 and the "protected" success screen
4. `/guardian` mid-call: risk meter climbing + tactic cards
5. `/guardian` peak: DANGER banner + Transaction Shield **HELD** + Trusted Circle alert
6. Spanish scam detected (DANGER)
7. SAFE result on the normal family call (proves no false alarm)

## Final pre-submit (do day before deadline)
- [ ] `npm run build` passes locally (it does)
- [ ] All links in README + Devpost are live and correct
- [ ] Screenshot the Devpost confirmation after submitting
- [ ] Backup: download a copy of the demo video locally
