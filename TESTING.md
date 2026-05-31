# 🧪 Aegis — Testing

Aegis ships with an automated test harness that exercises the live API end-to-end:
the route handler, input validation, the Scam DNA Engine contract, and the alert
endpoint. **57 checks, all passing** — locally and against the production deployment.

## Run it

```bash
# 1. start the app (mock engine needs no API key)
npm run start

# 2. in another terminal
npm test
```

Or point it at the live deployment:

```bash
AEGIS_URL="https://beyond-tomorrow-summit-ai-future-te.vercel.app" npm test
```

## What's covered

| Area | Checks |
|---|---|
| **All 9 fixtures** | grandparent (EN), grandparent (ES), bank impersonation, romance/pig-butchering, tech-support, crypto investment, fake job-offer, sextortion, and the benign control |
| **Correctness** | known scams escalate to caution/danger with quoted tactics + a recommended action |
| **No false alarms** | the normal family call returns `safe` with 0 tactics |
| **Schema integrity** | `riskScore` is an int 0–100, `verdict` in enum, every tactic has name/severity/quote/explanation, severity in enum |
| **Multilingual** | the Spanish scam is detected the same as English (proves intent-detection, not keywords) |
| **Edge cases** | empty / too-short → 400, punctuation-only → safe, a ~21k-char paste is capped and doesn't crash |
| **Adversarial input** | malformed JSON → 400 (not 500), missing field → 400, ambiguous mentions return a valid verdict |
| **Alert endpoint** | returns graceful success with full body, empty body, and `{}` |

## Hardening applied

- `/api/analyze` parses the body defensively (malformed JSON → clean 400, not 500)
- Input is length-capped (12k chars) to guard latency/cost
- Engine errors are logged server-side and returned as a safe user-facing message (no internal detail leak)
- Mock-engine quotes snap to word boundaries (no mid-word fragments)
- The real engine validates every response with Zod and retries once on a schema miss
