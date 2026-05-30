# 📅 Aegis — 6-Day Execution Timeline

> Today: **Sat 30 May 2026.** Deadline: **Thu 5 Jun 2026, 11:00pm GMT+2.**
> Full-time (8+ hrs/day), solo. Build in priority order so you always have a demoable build.

**Guiding principle:** Ship a thin end-to-end slice by end of Day 2. Everything after is making that slice deeper and more beautiful. Never leave the codebase in a broken state overnight — commit working increments.

---

## Day 1 — Sat 30 May · Foundation + the Brain
**Goal: the Scam DNA Engine returns correct structured analysis from a script.**

- [ ] (30m) Create GitHub repo `aegis` (public). Init Next.js + TS + Tailwind + shadcn/ui. First commit.
- [ ] (30m) Get API keys: Anthropic (required), AssemblyAI (optional now), Twilio/Resend (later). Add `.env`.
- [ ] (1h) Write `lib/prompts.ts` (system prompt) + `lib/scamSchema.ts` (Zod schema) + `lib/claude.ts` (client with structured output + prompt caching).
- [ ] (1.5h) Build `/api/analyze` route. Test from a script with a pasted scam transcript. Iterate the prompt until tactics + quotes + score are accurate and consistent.
- [ ] (1h) Write 4 fixtures: grandparent/cloned-voice scam, bank-impersonation, romance/pig-butchering, and one SAFE conversation. Verify the safe one scores low (no false alarm).
- [ ] (1h) Quick landing page (`app/page.tsx`): hero, tagline, "Try the Guardian" CTA.
- [ ] (1h) Commit + deploy to Vercel. Confirm `/api/analyze` works on the live URL.

**EOD checkpoint:** paste any transcript → correct JSON analysis, live on Vercel.

---

## Day 2 — Sun 31 May · The Guardian Dashboard (the wow)
**Goal: a beautiful real-time dashboard that animates the analysis.**

- [ ] (2h) `TranscriptFeed` + "Simulate live call" — stream fixture lines one by one with a delay.
- [ ] (2h) `RiskMeter` (Framer Motion animated 0–100, color shifts green→amber→red).
- [ ] (2h) `TacticCard` — cards that pop in as tactics are detected, each showing the triggering quote + 1-line explanation.
- [ ] (1h) `VerdictBanner` (Safe/Caution/Danger) + plain-language summary + recommended action.
- [ ] (1h) Wire it together on `app/guardian/page.tsx`. Polish spacing, fonts, dark theme.

**EOD checkpoint:** click "Simulate call" → watch the rescue unfold visually end-to-end. **This is your minimum viable winning demo.**

---

## Day 3 — Mon 1 Jun · The Differentiators (Fintech + Cyber + Health)
**Goal: Trusted Circle alert + Transaction Shield — the cross-theme payoff.**

- [ ] (2.5h) `TransactionShield` mock banking panel: a pending $4,000 transfer that flips to **HELD BY AEGIS** when `riskScore ≥ 75`. Animate the freeze.
- [ ] (2.5h) `TrustedCircle`: on threshold, fire `/api/alert` → real email (Resend) or SMS (Twilio) to a family contact, with a polished on-screen notification mirror. (If APIs eat time, ship the on-screen mock and note "live SMS via Twilio" — keep code stubbed.)
- [ ] (1h) Audio path: `/api/transcribe` (AssemblyAI) so you can upload a clip; pre-transcribe demo clips as the safe default.
- [ ] (1.5h) Polish: loading states, error handling, the benign-conversation path (prove no false alarm).

**EOD checkpoint:** full P0+P1 flow runs on the live URL: ingest → analyze → animate → alert → freeze.

---

## Day 4 — Tue 2 Jun · Polish + Wow Layer + Content capture
**Goal: make it look like a funded startup; capture all submission assets.**

- [ ] (2h) Visual polish pass: hero, logo/wordmark for Aegis, consistent color system, micro-interactions, mobile-responsive enough for screenshots.
- [ ] (1.5h) Pick ONE P2 wow feature and ship it: **Resilience score** OR **multilingual demo** (run a Spanish/Hindi scam transcript). Multilingual reads very well for a *global* hackathon — recommended.
- [ ] (1h) Record clean **screenshots** of every screen (landing, dashboard mid-detection, alert, shield-held, safe result).
- [ ] (1h) Record raw screen-capture footage of the full flow (you'll edit Day 5).
- [ ] (1h) Write the repo **README** per `01_BUILD_SPEC.md §7`. Add architecture diagram + screenshots.
- [ ] (1.5h) Buffer / bug-fix / re-deploy. Tag a stable release.

**EOD checkpoint:** product looks polished; all screenshots + raw footage captured; README done.

---

## Day 5 — Wed 3 Jun · Demo Video + Pitch Deck
**Goal: the two artifacts humans actually judge in Round 2.**

- [ ] (3h) Edit the **demo video** (≤3 min) following `05_DEMO_VIDEO_SCRIPT.md`. Voiceover, captions, the stats, the rescue arc. Upload (YouTube unlisted) — get the link.
- [ ] (2.5h) Build the **pitch deck** from `04_PITCH_DECK.md` (Canva/Figma/Slides). Clean, ~10 slides.
- [ ] (1.5h) Fill the **Devpost submission** using `03_SUBMISSION_PACKAGE.md` — every field. Don't hit submit yet; save draft.
- [ ] (1h) Rehearse the live pitch out loud 2×, timed.

**EOD checkpoint:** demo video uploaded, deck done, Devpost draft complete.

---

## Day 6 — Thu 4 Jun · Buffer, rehearse, submit early
**Goal: submit a full day before deadline. Never submit at the wire.**

- [ ] (2h) Final QA: test the live URL in a clean browser/incognito; click every path; confirm no crashes.
- [ ] (1h) Final pass on README, video, deck for typos + keyword density (Round-1 parser).
- [ ] (1h) Verify ALL Devpost mandatory fields present (use the checklist in `00_MASTER_PLAN.md §6`).
- [ ] (1h) **Submit on Devpost.** Screenshot the confirmation.
- [ ] (2h) Rehearse the Round-2 pitch 3× more; prep answers to likely judge questions (see `04_PITCH_DECK.md`).
- [ ] (rest) Record a backup demo run; ensure a localhost fallback is ready in case live URL fails during the live pitch.

**Deadline is Thu 5 Jun 11pm GMT+2 — you're done a day early. The remaining time is pure rehearsal + safety margin.**

---

## Daily rituals
- **Start:** review yesterday's checkpoint; pick the single most demo-critical task.
- **Commit** every working increment with a clear message. Deploy daily.
- **End:** the live URL must demo *something* impressive. Update the checklist.

## If you fall behind (cut in this order)
1. Drop P2 wow feature (resilience/multilingual).
2. Mock the Trusted Circle alert instead of real SMS/email.
3. Drop audio upload; keep "paste transcript" + "simulate call".
4. **Never cut:** the Scam DNA Engine + the animated guardian dashboard + Transaction Shield. That trio alone wins.
