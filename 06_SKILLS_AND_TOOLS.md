# 🧰 Aegis — Skills & Tools Setup

> What to use (and skip) from Anthropic's skills + your built-in Claude Code skills,
> mapped to the Aegis build. Keep this current as setup changes.

---

## 1. Built-in Claude Code skills (already active — no setup)

These are available in this session right now and map directly to our plan:

| Skill | Use it for | When |
|---|---|---|
| `run` | Launch the Aegis app + screenshot it in a real browser | Day 4 screenshots, Day 6 QA |
| `verify` | Confirm the rescue flow actually works end-to-end (not just "builds") | After each day; Day 6 |
| `code-review` | Catch bugs / cleanups in the engine + UI before submission | Day 4, Day 6 |
| `security-review` | Sanity-check the repo before it goes public to judges | Day 6 |
| `deep-research` | Pull fresh fraud stats / competitor scan for pitch | Pitch prep |

---

## 2. anthropics/skills repo — what to install / use

Repo: https://github.com/anthropics/skills
Marketplace packages **one** plugin: `document-skills` (pdf, docx, pptx, xlsx).
The other skills are reference techniques we apply directly.

### Install (do this once)
```
/plugin marketplace add anthropics/skills
/plugin install document-skills
```

### Priority map
| Skill | Priority | Aegis use |
|---|---|---|
| **webapp-testing** | ⭐ VERY HIGH | Playwright automation: drive the Guardian, run "Simulate live call", capture demo screenshots/clips |
| **frontend-design** | ⭐ HIGH | Day 4 visual polish — typography, color system, dark mode, micro-interactions |
| **pptx** | ⭐ HIGH | Generate the pitch deck (`04_PITCH_DECK.md` → real .pptx) on Day 5 |
| **pdf** | MEDIUM | One-page leave-behind / deck export for judges |
| **canvas-design** | MEDIUM | Aegis logo/wordmark + hero graphic (replace emoji branding) |
| **mcp-builder** | OPTIONAL | Stretch: expose the Scam DNA Engine as an MCP server ("any AI can call Aegis") — only if ahead of schedule |
| artifacts-builder, xlsx, docx, slack-gif-creator, internal-comms, chrome-devtools, skill-creator | SKIP | Not relevant to this build |

---

## 3. External APIs / platforms (the actual build stack)

Aligned with the hackathon's recommended tools where it helps Round-1 scoring.

| Need | Tool | Status | Key |
|---|---|---|---|
| LLM engine | Claude (Anthropic) — primary; OpenAI auto-fallback | ✅ provider-agnostic, wired | `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY`) |
| Deploy | Vercel | ⬜ Day 4/5 | connect GitHub repo |
| Repo | GitHub (public) | ✅ live | — |
| Trusted Circle email | Resend | ⬜ optional (mock works) | `RESEND_API_KEY` + `ALERT_TO_EMAIL` |
| Speech-to-text | AssemblyAI / Whisper | ⬜ optional | `ASSEMBLYAI_API_KEY` |
| Voice authenticity (P2) | Hugging Face anti-spoofing model | ⬜ stretch | HF token |
| SMS alert (future) | Twilio | ⬜ roadmap | Twilio creds |

> **Design rule already enforced in code:** every integration degrades to a clean mock
> if its key is absent, so the live demo can never hard-fail in front of judges.

---

## 4. "Well set" checklist
- [ ] `document-skills` plugin installed (for pptx/pdf deck)
- [ ] `.env.local` created with `ANTHROPIC_API_KEY` (engine runs on real Claude)
- [ ] Vercel project connected to the GitHub repo (live URL for judges)
- [ ] `npm run dev` confirmed working locally (delete `.next` if MODULE_NOT_FOUND)
- [ ] webapp-testing used to capture clean screenshots (Day 4)
- [ ] pptx skill used to generate the deck (Day 5)
