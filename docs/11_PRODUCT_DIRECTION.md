# 11 — Product Direction: the "Guardian Number" (researched & cited)

> **Status:** strategic pivot, backed by a verified deep-research pass (24/25 claims
> confirmed via 3-vote adversarial verification, 21 sources). This is the source of
> truth for *how Aegis actually works in the real world* and the Twilio call-screening
> prototype we're building next.
> **Not legal advice** — see the Legal section; get jurisdiction-specific counsel before launch.

---

## The core finding (the honest truth)

**A third-party app cannot listen to a normal cellular phone call.** This is a hard wall on
both platforms, not an engineering gap:

- **Android** — `CallScreeningService` only ever sees **metadata** (the number + verification
  status) *before* the call connects, and can only **block / reject / silence** it. There is no
  microphone or audio API. It is also invoked **only for numbers not in the user's contacts**.
  [[Android docs]](https://developer.android.com/develop/connectivity/telecom/dialer-app/screen-calls)
- **No call-recording workaround** — Google's Play policy (effective **May 11, 2022**) bans using
  the Accessibility API to record calls; only pre-loaded OS dialers are exempt.
  [[Play policy]](https://support.google.com/googleplay/android-developer/answer/14554743) ·
  [[Android Police]](https://www.androidpolice.com/google-ends-call-recording-apps-accessibility-services/)
- **Pixel Call Screen** transcribes live calls on-device — but **only because Google is the OS
  vendor** (privileged telephony + Gemini Nano). A third-party app cannot replicate it.
  [[Google support]](https://support.google.com/pixelphone/answer/9118387)
- **iOS** — CallKit / Call Directory are understood to allow number *labeling/blocking only,
  with no call-audio access*. ⚠️ *Not independently verified in this research run — treat as
  high-likelihood, confirm before relying on it.*

> **Consequence:** the UX is **not** "an app that listens to grandma's phone." It is
> **"calls from unknown numbers are routed through Aegis."** Known/favourite contacts never
> touch Aegis — exactly the privacy boundary we want, and the way the OS already behaves.

---

## What's feasible vs. not

| Capability | Verdict | Basis |
|---|---|---|
| Monitor **only unknown / non-contact** callers | ✅ Feasible | OS screens only non-contacts; we forward only unknown calls |
| Block / silence known scam numbers (app layer) | ✅ Feasible | `CallScreeningService` / Call Directory |
| Access **live call audio** from an installed app | ❌ Not possible | iOS forbids; Android metadata-only + recording ban |
| Live audio/transcript **via Twilio routing** | ✅ Feasible | Media Streams + `<Start><Transcription>` (GA Jul 1 2025) |
| Real-time scam-**intent** analysis | ✅ Feasible | Our Scam DNA Engine; validated by arXiv:2502.03964 (recall 0.98–1.00) |
| Conference a family member into the call | ✅ Feasible | `<Conference>` + Participant REST API |
| Hold the call / play announcements mid-call | ✅ Feasible | Participant `Hold=true` + `HoldUrl` |
| Screen **unknown** callers on a Twilio **trial** | ❌ Blocked | Trial rejects unverified inbound (error 32100) → **paid account required** |
| Hold the **payment** before money leaves | ⚠️ Partner-dependent | Needs bank/fintech integration; simulate for now |

Sources: [Media Streams](https://www.twilio.com/docs/voice/media-streams) ·
[Transcription](https://www.twilio.com/docs/voice/twiml/transcription) ·
[Conference](https://www.twilio.com/docs/voice/twiml/conference) ·
[Participant API](https://www.twilio.com/docs/voice/api/conference-participant-resource) ·
[Trial limit](https://www.twilio.com/en-us/changelog/inbound-calls-to-trial-accounts-must-use-verified-callerid) ·
[arXiv:2502.03964](https://arxiv.org/abs/2502.03964)

---

## Architecture: the Guardian Number

```
Known / favourite caller ───────────────────────────▶ senior's phone   (never monitored)

Unknown caller ──▶ Aegis Twilio number ──▶ Conference room "guardian-<callSid>"
                        │                         ▲
                        │  1. audible consent disclosure (legal)
                        │  2. <Start><Transcription track="inbound_track">  → /api/voice/transcript
                        │  3. dial senior into the same conference (sounds like a normal call)
                        ▼
              Scam DNA Engine scores the running transcript
                 LOW  → stay silent, never interrupt
                 MED  → gentle spoken nudge to the senior
                 HIGH → intervene (below)
```

**HIGH-risk intervention (your conference + hold idea, with a safe fallback):**
1. Put the caller on **Hold** (`Hold=true`, `HoldUrl` plays a calm message) — instantly defuses the
   scammer's time-pressure.
2. Announce to the senior: *"Aegis here — I'm bringing in your family for your safety."*
3. **Participant API** dials the Trusted Circle (call) **+** Resend email **+** Twilio SMS, in priority order.
4. **Family answers within the window (~30 s)** → they're added to the conference, caller un-held,
   family takes over.
5. **No one answers in time** → Aegis tells the senior *"Please hang up and send no money — we'll
   call you right back,"* then drops the caller's leg. ← **the "what if they don't respond" fallback.**

> The call ending is fine — the scam is already disrupted. The durable protection is the
> **payment hold** (Phase 3), because the damage is the transfer, not the call.

---

## Privacy & dignity by design (non-negotiable)

1. **Whitelist-first.** Favourites/known contacts are never routed or analyzed. Only strangers.
2. **Process, don't store.** Analyze the transcript transiently; persist only a risk score, tactic
   labels, and a one-line reason. Discard raw audio/transcript by default.
3. **Proportional escalation.** Silence at low risk. Never interrupt a harmless call.
4. **Transparency to the senior**, not just the family. Guardian, not spy.
5. **Family sees risk events, never private call content.** Dignity over surveillance — the #1 reason
   elders abandon these tools.

---

## Legal (must-do, not optional)

- Real-time AI analysis of live audio counts as **interception/monitoring — even with no recording
  stored.** "Storage is not the trigger; access is."
  [[Burr & Forman]](https://www.burr.com/newsroom/articles/ai-on-the-line-consent-vendors-and-deidentification-for-real-time-call-monitoring)
  (federal Wiretap Act 18 U.S.C. §2510(4); CIPA §631/§632; *Ambriz v. Google*, *Taylor v. ConverseNow*, 2025).
- **Required:** an **audible up-front disclosure** when Aegis answers — *"This call may be monitored to
  protect against scams; automated tools and third-party services may assist in real time."* This is the
  established legal path across all-party-consent states.
- ⚠️ The exact **list/count of all-party states is unsettled** (the common "~12" list was refuted at
  source). Re-verify against primary statutes for your launch states. Wiretap-vs-AI is **actively
  litigated** — get counsel before deployment.

---

## "No login" — clarified

- **Senior side:** no login, no app to open, no UI, no decisions. ✅ (matches the OS screening model)
- **Family side:** a short, **authenticated** one-time setup (pick favourites, add Trusted Circle).
  This is a fraud-control surface — it *must* be secure. So "no login" applies to the **person we
  protect**, not the admin.

---

## The market gap (why this is defensible)

| Product | What it does | Misses |
|---|---|---|
| Truecaller / Hiya / RoboKiller | block **known** spam numbers | no intent analysis, no family loop |
| Carrier scam blockers | number-level blocking | conversation-blind |
| Google Call Screen | on-device AI screens unknown calls (Pixel only) | OS-locked, no family circuit-breaker |
| **Aegis** | real-time **intent** analysis + **family conference/hold** + (later) **payment hold** | — |

No verified shipped product combines real-time intent detection with a family-alert/conference. That's the wedge.

---

## Prototype plan (what we build next)

**Phase 1a — buildable now, ~free (Twilio trial + verified test phones):**
- `app/api/voice/incoming` → returns TwiML: consent `<Say>` → `<Start><Transcription>` → `<Dial><Conference>`.
- `app/api/voice/transcript` → receives utterances, runs the Scam DNA Engine, tracks risk.
- Intervention controller: Hold + dial Trusted Circle (Participant API) + Resend/SMS + no-answer fallback.
- Test with 3 verified numbers (scammer / senior / family). Degrades to a **simulation mode** in the web
  app when no Twilio creds — consistent with the demo-safety rule.

**Phase 1b — real screening:** upgrade to a **paid** Twilio account → accept unknown inbound; set up
carrier conditional call-forwarding (forward unknown/unanswered → Aegis number).

**Phase 2:** app-layer spam blocklist (CallKit/CallScreening); SMS scam scanning (Android).
**Phase 3:** payment hold via bank/fintech partner or Plaid alerts; persistence; multi-language.
**Phase 4:** on-device model (max privacy); carrier partnerships.

**Credentials needed for 1a:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_NUMBER`, a public
webhook URL (ngrok locally / the Vercel deploy), plus the existing model + Resend keys. All degrade to
mock if absent.

---

## Open questions to close before/while building

1. **iOS** CallKit/Call Directory exact limits (label/block only? any VoIP-path exception for forwarded calls?) — unverified here.
2. **Authoritative** current list of all-party-consent states for our launch markets (primary statutes).
3. **Measured end-to-end latency**: Twilio audio → STT → LLM intent → intervention. Must be fast enough to act before a payment instruction lands.
4. **Carrier conditional call-forwarding** behavior across major carriers — does it reliably isolate only unknown callers while leaving contacts untouched?

---

*Research: deep-research run `wf_c77881c9-7d9` — 5 angles, 21 sources, 84 claims → 25 verified
(24 confirmed 3-0, 1 refuted). See that run's report for full evidence and per-claim votes.*
