# 🎬 Aegis — Demo Video Teleprompter (read-aloud, timed ~2:45)

> Record screen + voiceover separately, then sync. Read the **VOICE** lines at a calm pace.
> Do the **[DO]** actions on screen. Burn in captions. Target ≤ 3:00 (aim 2:45).
> Live site: https://beyond-tomorrow-summit-ai-future-te.vercel.app/guardian

**Setup before recording:**
- Add `ANTHROPIC_API_KEY` to Vercel first so the badge reads `anthropic · claude-sonnet-4-6` (see `07_DEPLOY_GUIDE.md`).
- Open the live `/guardian` page, select **The Cloned-Voice Grandparent Scam**.
- Browser zoom ~110%, close other tabs, hide bookmarks bar. Dark room reads premium.

---

## [0:00–0:18] HOOK
**[DO]** Black screen → phone-ring sound → fade to the Aegis landing page hero.
**VOICE:**
> "This is a phone call from her grandson. He's scared, he's in jail, he needs money now. There's one problem — it's not him. It's an AI clone of his voice, made from three seconds of audio. It happens every five minutes, and last year it cost families over twelve billion dollars."

**[CAPTIONS]** `$40B AI fraud by 2027` · `3 seconds to clone a voice` · `70% can't tell`

---

## [0:18–0:32] THE GAP + INTRO
**[DO]** Scroll the landing page slowly — stats, then the Care Mode section.
**VOICE:**
> "Banks catch fraud after the money's gone. Spam filters miss AI scams completely. We built something that steps in during the attack — and the person being protected doesn't have to do anything. This is Aegis."

---

## [0:32–2:00] THE RESCUE (the core — let it breathe)
**[DO]** Click **Try the Guardian** → on `/guardian`, click **▶ Simulate live call**.
**VOICE:**
> "Here's that call, live. As it unfolds, the Scam DNA Engine reads the conversation in real time."

**[DO]** Let the transcript stream; point cursor at the **risk meter** as it climbs.
**VOICE:**
> "Watch the risk climb. It catches the fake emergency… the impersonation of a family member… the demand for secrecy — 'don't tell mom'… and the irreversible wire transfer. Aegis doesn't look for keywords — it understands the manipulation itself. That's why it works on any call, text, or chat, in any language."

**[DO]** Meter hits red (~96). Point at the **DANGER** banner + plain-language summary.
**VOICE:**
> "Risk: ninety-six. And here's what makes Aegis different — it doesn't just warn. It acts."

**[DO]** Point at the **Trusted Circle** alert appearing.
**VOICE:**
> "It instantly alerts a trusted family member — the one thing proven to stop elder fraud in the real world."

**[DO]** Point at the **Transaction Shield** flipping to **HELD BY AEGIS**.
**VOICE:**
> "And it freezes the payment — before a single dollar leaves the account. Margaret keeps her money. Her daughter calls the real grandson, who's safe at home."

**[DO]** Click the **🌍 Spanish Voice-Clone Scam** fixture → **▶ Simulate** (~6 sec, let meter climb).
**VOICE:**
> "Same engine, a scam in Spanish — detected just the same. This protects people in any language."

**[DO]** (Optional 4s) Click **Normal Family Call** → Simulate → shows SAFE.
**VOICE:**
> "And on a normal call? Aegis stays quiet. No false alarms."

---

## [2:00–2:25] HOW IT WORKS (tech, fast)
**[DO]** Show the README architecture diagram OR the deck "how it works" slide.
**VOICE:**
> "Under the hood, a large language model powers the Scam DNA Engine with structured, explainable output. Speech-to-text turns calls into text, the engine scores the manipulation, and the intervention layer fires the family alert and the transaction hold. Built with Next.js and Claude — deployed and live."

---

## [2:25–2:50] IMPACT + VISION + CLOSE
**[DO]** Quick montage: dashboard → Care Mode section → end card (logo + tagline + URL).
**VOICE:**
> "AI fraud is a forty-billion-dollar problem, and it targets the people we love most. Aegis turns that moment of danger into a moment of safety — for over a billion vulnerable people. Next, we're embedding it into banks, phone carriers, and eldercare. Scammers got an AI. It's time the rest of us got one too."

**[END CARD]** `AEGIS — Stop scams before they happen.`
`beyond-tomorrow-summit-ai-future-te.vercel.app` · GitHub · Beyond Tomorrow Summit 2026

---

## Production checklist
- [ ] ≤ 3:00 (aim 2:45) · [ ] captions burned in · [ ] stats shown as on-screen text
- [ ] rescue segment runs flawlessly (re-record until clean) · [ ] real-engine badge visible
- [ ] clear audio, subtle music under voice · [ ] first 5 sec hook hard
- [ ] end card with live URL + GitHub · [ ] uploaded (YouTube unlisted), link tested in incognito
- [ ] same link added to README + Devpost

## Recording tips
- Record the screen flow perfectly first, **then** lay voiceover over it.
- If a live call is slow on camera, the cached fixture still animates instantly.
- Slow down. Calm + confident reads as "this is real," not "student project."
