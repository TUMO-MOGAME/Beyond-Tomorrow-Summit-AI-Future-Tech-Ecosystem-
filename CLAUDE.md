# CLAUDE.md — Aegis project memory

> **This file is auto-loaded every session.** Read it first. It is the single source of
> truth for what Aegis is, how we work, and where we are. Keep it current.
> Detailed living status lives in [.claude/PROGRESS.md](.claude/PROGRESS.md) — update it after every work session.

---

## What we're building

**Aegis** — *"Stop scams before they happen."* An AI guardian that detects manipulation in
any conversation (voice / SMS / chat) in **real time** and intervenes before money is lost.
Sits at the **Cybersecurity × Fintech × Health** intersection, AI-powered.

- **Hackathon:** Beyond Tomorrow Summit 2026 (Devpost). Solo entrant: **Tumo Mogame**.
- **Goal:** 1st place ($1,000).
- **Deadline:** 5 Jun 2026, 11:00pm GMT+2. Submit a day early.
- **Two judging rounds:** Round 1 = AI parser (AiForJob) → submission text must be structured/keyword-dense. Round 2 = live online pitch to human judges.
- **Live demo:** https://beyond-tomorrow-summit-ai-future-te.vercel.app/
- **Repo:** https://github.com/TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-

## The three differentiators (always reinforce these)
1. **Prevention, not forensics** — acts *during* the attack, before the payment.
2. **Intent, not keywords** — one engine works across any channel & language (Spanish demo proves it).
3. **Trusted Circle + Care Mode** — loops in family; the senior does nothing (family sets it up once).

---

## Architecture (how it works)

```
Ingest (paste / simulate call) → /api/analyze → Scam DNA Engine (LLM, structured JSON)
   → risk score + tactics + plain-language summary + recommended action
   → if riskScore >= 75 on a money scam: fire intervention
        → Transaction Shield (freeze the transfer)  + Trusted Circle (/api/alert, family alert)
```

**Provider-agnostic engine** ([lib/llm.ts](lib/llm.ts)): auto-detects `ANTHROPIC_API_KEY` → Claude,
else `OPENAI_API_KEY` → OpenAI, else **mock** (offline heuristic in [lib/mockEngine.ts](lib/mockEngine.ts)).
Force with `LLM_PROVIDER`. Every integration degrades to a clean mock if its key is absent —
**the live demo can never hard-fail.**

## Tech stack
Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Claude/OpenAI ·
Zod (validation) · Vercel (deploy) · GitHub. Python only for `scripts/build_deck.py`.

## Key files
| Path | What |
|---|---|
| `lib/llm.ts` | Provider-agnostic engine + retry |
| `lib/prompts.ts` | Scam DNA Engine system prompt (cached) |
| `lib/scamSchema.ts` | Zod + JSON schema (shared by both providers) |
| `lib/mockEngine.ts` | Offline heuristic analyzer |
| `lib/fixtures.ts` | Loads the 5 demo fixtures |
| `app/api/analyze/route.ts` | Analysis endpoint (hardened) |
| `app/api/alert/route.ts` | Trusted Circle alert (Resend or mock) |
| `app/page.tsx` | Landing (hero, stats, Care Mode) |
| `app/guardian/page.tsx` | Real-time dashboard (the demo centerpiece) |
| `app/care/page.tsx` | Care Mode setup (zero-effort elderly story) |
| `components/` | RiskMeter, TacticCard, VerdictBanner, TranscriptFeed, TransactionShield, TrustedCircle, AegisLogo, Icon (line-icon set), Photo (framed next/image) |
| `fixtures/` | grandparent (EN+ES), bank, romance, safe-control |
| `scripts/test_engine.mjs` | 37-check test suite (`npm test`) |
| `public/images/` | Human photography used on the site (see `CREDITS.md`); referenced via `/images/*` |
| `assets/unused-photos/` | Source photos we chose **not** to ship (kept, not served) |

## Design system ("Pure mono")
True black (`#000`) + white text + grayscale ramp; the **only** color is the functional risk
signal (safe/caution/danger) on the meter & verdicts. Type: **Fraunces** (display serif) ·
**Hanken Grotesk** (body) · **JetBrains Mono** (telemetry). All emoji replaced by the custom
`Icon` set. Tokens live in `tailwind.config.ts`; atmosphere/utilities in `app/globals.css`.
The UI is monochrome on purpose so the **people in the photos** carry the warmth.

## Plan docs (now in [`docs/`](docs/) — see [docs/README.md](docs/README.md) for the index)
`docs/00_MASTER_PLAN` · `01_BUILD_SPEC` · `02_TIMELINE` · `03_SUBMISSION_PACKAGE` ·
`04_PITCH_DECK` · `05_DEMO_VIDEO_SCRIPT` · `06_SKILLS_AND_TOOLS` · `07_DEPLOY_GUIDE` ·
`08_VIDEO_TELEPROMPTER` · `09_SUBMISSION_CHECKLIST` · `10_ROUND2_PITCH` · `TESTING.md` ·
`Aegis_Pitch_Deck.pptx`

---

## Working conventions (follow these for consistency)

- **Always run before committing:** `npm run build` must pass (and `npm test` if engine/API changed).
- **Commit style:** clear subject line; body explains what + why; end with the Co-Authored-By trailer.
- **After every work session:** update [.claude/PROGRESS.md](.claude/PROGRESS.md) — what changed, current status, next step.
- **Scope rule:** if a feature won't appear in the 3-minute demo, don't build it this week.
- **Demo-safety rule:** any new integration must degrade gracefully to a mock without a key.
- **Build cache gotcha:** if `npm run dev/start` throws `MODULE_NOT_FOUND` / `_document.js`, delete `.next` and rebuild — it's a stale cache, not a code bug.
- **Windows/git:** CRLF warnings on commit are normal/harmless.
- **Testing:** `npm run start` then `npm test` (or `AEGIS_URL=<live> npm test`).

## Environment keys (.env.local — never commit)
Auto-detect order: **anthropic → groq → gemini → openrouter → openai → mock.**
- Paid: `ANTHROPIC_API_KEY` (+ `ANTHROPIC_MODEL`) · `OPENAI_API_KEY` (+ `OPENAI_MODEL`, optional `OPENAI_BASE_URL`).
- **Free:** `GROQ_API_KEY` (Llama 3.3 70B, fast) · `GEMINI_API_KEY` (gemini-2.0-flash, multilingual/multimodal) · `OPENROUTER_API_KEY` (free model variants). Any OpenAI-compatible endpoint works via `OPENAI_BASE_URL` (incl. local Ollama).
- `LLM_PROVIDER` forces one. `RESEND_API_KEY` + `ALERT_TO_EMAIL` enable real Trusted-Circle emails.
- Engine routing lives in [lib/llm.ts](lib/llm.ts): Anthropic via its SDK; all others share one OpenAI-compatible path with a tiered JSON strategy (strict schema → json_object → plain-parse).

---

## Status — see [.claude/PROGRESS.md](.claude/PROGRESS.md) for the live log

**Build: COMPLETE & hardened.** Days 1–5 done. 37/37 tests pass. Deployed live.
**Remaining (mostly user-side execution):** add API key to Vercel · capture screenshots ·
record demo video · submit on Devpost · rehearse Round 2 pitch.

## What to do when starting a fresh session
1. Read this file + `.claude/PROGRESS.md`.
2. Check `git log --oneline -5` to see the latest work.
3. Ask the user what they want to tackle, or continue the "Next step" in PROGRESS.md.
