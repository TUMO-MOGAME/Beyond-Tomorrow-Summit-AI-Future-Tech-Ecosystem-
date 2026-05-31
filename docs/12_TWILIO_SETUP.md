# 12 — Twilio setup: running the Guardian Number prototype

How to run the Phase 1a call-screening prototype (see [11_PRODUCT_DIRECTION.md](11_PRODUCT_DIRECTION.md)
for the architecture and the research behind it).

> **What this prototype does:** an unknown caller dials your Aegis number → Aegis plays a consent
> disclosure, transcribes the caller live, and runs the Scam DNA Engine on the transcript. The
> senior is rung into the same conference. When risk crosses the threshold, Aegis **holds the
> caller, conferences in the Trusted Circle, emails + texts them, and — if no one answers in
> ~30s — tells the senior to hang up and ends the call.**

## Demo-safety first
With **no Twilio credentials**, the routes still return valid TwiML and every Twilio REST call
no-ops with a log — so `npm run build`/`start` never fail. The live web demo at `/guardian`
remains the no-Twilio way to show the engine + intervention visually.

## What you need
- A **Twilio account** (free trial is enough for a demo with *verified* phones; screening
  *arbitrary unknown* callers in production needs a **paid** account — trial blocks unverified
  inbound, error 32100).
- A Twilio **phone number** (Voice-capable).
- A **public URL** Twilio can reach: locally use [ngrok](https://ngrok.com)
  (`ngrok http 3000`); in production use your Vercel URL.
- The phones you'll test with **verified** in the Twilio console (trial only).

## Configure
Add to `.env.local` (see `.env.example`):

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxx
TWILIO_NUMBER=+1555XXXXXXX            # your Aegis number
AEGIS_SENIOR_NUMBER=+1555YYYYYYY      # the "senior" test phone
AEGIS_TRUSTED_NUMBERS=+1555ZZZZZZZ    # the "family" test phone(s), comma-separated
AEGIS_PUBLIC_URL=https://your-ngrok-or-vercel-url   # no trailing slash
# optional: AEGIS_DANGER_THRESHOLD=75  AEGIS_FALLBACK_MS=30000
# also set a model key (GROQ_API_KEY / GEMINI_API_KEY) so analysis is real, not mock
```

## Point Twilio at the app
In the Twilio Console → your number → **Voice → "A call comes in"**:
- Set a **Webhook** to `POST {AEGIS_PUBLIC_URL}/api/voice/incoming`

That's the only wiring needed — all other webhooks (transcript, conference status, hold,
fallback, join) are referenced automatically from `AEGIS_PUBLIC_URL`.

## Try it (3 phones)
1. Run `npm run build && npm run start`, and `ngrok http 3000` (set `AEGIS_PUBLIC_URL` to the ngrok URL).
2. From the **"scammer"** phone, call your Aegis number.
3. You'll hear the consent message; the **"senior"** phone rings and joins.
4. Read a scam script ("This is the bank fraud team, wire $5,000 now, don't tell anyone…").
5. As risk crosses the threshold, the caller is **held**, the **"family"** phone rings + gets an
   email/SMS, and on answer joins the call. If family doesn't answer in ~30s, the senior hears the
   safe fallback and the call ends.

## Routes (reference)
| Route | Purpose |
|---|---|
| `POST /api/voice/incoming` | inbound caller → consent + transcription + conference |
| `POST /api/voice/join?conf=` | TwiML for senior/family legs to join the conference |
| `POST /api/voice/transcript?callSid=` | live transcription events → engine → maybe intervene |
| `GET/POST /api/voice/hold` | hold message for the held caller |
| `POST /api/voice/status?callSid=` | conference events (learn ConferenceSid, detect family join) |
| `GET/POST /api/voice/fallback` | "hang up, send no money" safe script |

## Known limitations (prototype)
- **In-memory call state** (`lib/voice.ts`): fine for one `next start` process; ephemeral and not
  shared across serverless instances. Swap for Redis/Postgres for production.
- **No-answer fallback uses `setTimeout`** — works on a long-running server, not serverless; use a
  scheduled task in production.
- **Latency** (Twilio audio → transcription → LLM → intervention) is unmeasured; verify it's fast
  enough to act before a payment instruction lands.
- **Legal:** the consent line is played up-front, but all-party-consent law for real-time AI is
  unsettled — get counsel before any real deployment (see 11_PRODUCT_DIRECTION.md → Legal).
