# 🚀 Aegis — Deploy to Vercel (live URL for judges)

> Goal: a public URL judges can open. The Round-1 AI scraper checks the live link;
> human judges in Round 2 love a working demo they can click.

The app is already Vercel-ready (Next.js, no special config). Two ways to deploy.

---

## Option A — Vercel dashboard (easiest, no CLI) ⭐ recommended

1. Go to **https://vercel.com** and sign in **with GitHub**.
2. Click **Add New… → Project**.
3. Find and **Import** the repo:
   `TUMO-MOGAME/Beyond-Tomorrow-Summit-AI-Future-Tech-Ecosystem-`
4. Framework preset: **Next.js** (auto-detected). Leave build settings default.
5. **Environment Variables** — add these (optional; the app runs in mock mode without them):
   | Name | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | your Claude key (`sk-ant-…`) — enables the real engine |
   | `ANTHROPIC_MODEL` | `claude-sonnet-4-6` |
   | `LLM_PROVIDER` | `anthropic` (or leave unset for auto-detect) |
   | `RESEND_API_KEY` | *(optional)* for real Trusted Circle email |
   | `ALERT_TO_EMAIL` | *(optional)* where the family alert goes |
6. Click **Deploy**. ~2 minutes later you get a URL like
   `https://aegis-xxxx.vercel.app`.
7. Open it, go to `/guardian`, run **Simulate live call** — confirm it works.

> **No API key?** Deploy anyway. The app auto-falls back to the offline mock engine,
> so the live demo works regardless. Add the key later under
> **Project → Settings → Environment Variables**, then redeploy.

---

## Option B — Vercel CLI (from your terminal)

```powershell
npm i -g vercel
cd c:\Beyond___tomorrow__hackathon
vercel            # first run: log in + link the project (accept defaults)
vercel --prod     # deploy to production, prints the live URL
```
Add env vars later with `vercel env add ANTHROPIC_API_KEY` then `vercel --prod` again.

---

## After deploying — wire the URL everywhere
- [ ] Put the live URL at the top of the repo **README** (replace localhost note).
- [ ] Add it to the **Devpost** submission (`03_SUBMISSION_PACKAGE.md` → Links).
- [ ] Put it on **slide 7** of the deck and in the **demo video** end card.
- [ ] Test it once in an **incognito window** (catches "works on my machine" issues).

## Troubleshooting
- **Build fails on Vercel:** confirm `npm run build` passes locally first (it does).
- **API route 500 in prod:** usually a missing/incorrect env var — check Project → Settings → Environment Variables, then redeploy.
- **Auto-deploys:** every `git push` to `main` triggers a fresh Vercel deploy automatically once the project is linked.
