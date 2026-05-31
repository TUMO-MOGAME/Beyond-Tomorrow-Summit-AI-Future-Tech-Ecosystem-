/**
 * Aegis voice layer — the "Guardian Number" call-screening prototype (Phase 1a).
 *
 * Unknown callers are routed through a Twilio number. We play a consent
 * disclosure, transcribe the caller's audio live, run the Scam DNA Engine on the
 * running transcript, and on HIGH risk we hold the caller, conference in the
 * Trusted Circle, alert them (email + SMS), and fall back to a safe script if no
 * one answers in time.
 *
 * Demo-safety: with no Twilio credentials the route handlers still return valid
 * TwiML, and every REST call no-ops with a log — nothing hard-fails. See
 * docs/11_PRODUCT_DIRECTION.md and docs/12_TWILIO_SETUP.md.
 *
 * NOTE: state is held in an in-memory Map, which is fine for a single long-running
 * `next start` process (how you'll demo this) but is ephemeral and not shared
 * across serverless instances. A real deployment swaps this for Redis/Postgres.
 */
import { analyzeConversation } from "./llm";

// ─── Config ──────────────────────────────────────────────────────────────────
export const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || "";
export const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
export const TWILIO_NUMBER = process.env.TWILIO_NUMBER || process.env.TWILIO_FROM_NUMBER || "";
/** The protected person's phone — rung into the conference so they can talk. */
export const SENIOR_NUMBER = process.env.AEGIS_SENIOR_NUMBER || "";
/** The protected person's name — used to personalize alerts to loved ones. */
export const SENIOR_NAME = process.env.AEGIS_SENIOR_NAME || "your family member";
/** Trusted Circle numbers (comma-separated) dialed in when risk is high. */
export const TRUSTED_NUMBERS = (process.env.AEGIS_TRUSTED_NUMBERS || "")
  .split(",")
  .map((n) => n.trim())
  .filter(Boolean);
/** Public base URL Twilio can reach (ngrok locally / the Vercel URL). */
export const PUBLIC_URL = (process.env.AEGIS_PUBLIC_URL || "").replace(/\/$/, "");
/** Risk at/above which Aegis intervenes (matches the dashboard threshold). */
export const DANGER_THRESHOLD = Number(process.env.AEGIS_DANGER_THRESHOLD || 75);
/** How long to hold the call waiting for family before the safe fallback. */
export const FALLBACK_MS = Number(process.env.AEGIS_FALLBACK_MS || 30_000);

export function twilioConfigured(): boolean {
  return Boolean(TWILIO_SID && TWILIO_TOKEN && TWILIO_NUMBER);
}

export function url(path: string): string {
  // Absolute URL for Twilio webhooks; falls back to a relative path if unset.
  return PUBLIC_URL ? `${PUBLIC_URL}${path}` : path;
}

// ─── In-memory call state ──────────────────────────────────────────────────────
export interface CallState {
  callerNumber: string;
  conferenceName: string;
  conferenceSid?: string; // learned from the conference-start status callback
  seniorCallSid?: string; // the leg we originate to the senior
  familyCallSids: Set<string>; // legs we originate to the Trusted Circle
  familyJoined: boolean;
  transcript: string[];
  riskScore: number;
  intervened: boolean;
}

const calls = new Map<string, CallState>();

export function initCall(callSid: string, callerNumber: string): CallState {
  const state: CallState = {
    callerNumber,
    conferenceName: `aegis-${callSid}`,
    familyCallSids: new Set(),
    familyJoined: false,
    transcript: [],
    riskScore: 0,
    intervened: false,
  };
  calls.set(callSid, state);
  return state;
}

export function getCall(callSid: string): CallState | undefined {
  return calls.get(callSid);
}

// ─── TwiML builders ─────────────────────────────────────────────────────────────
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function twiml(inner: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<Response>${inner}</Response>`;
}

const CONSENT =
  "This call may be monitored by Aegis to protect against scams. " +
  "Automated tools and a trusted contact may assist in real time.";

/** TwiML for the inbound unknown caller: consent → live transcription → conference. */
export function incomingTwiml(callSid: string, conferenceName: string): string {
  const transcriptionCb = url(`/api/voice/transcript?callSid=${encodeURIComponent(callSid)}`);
  const conferenceCb = url(`/api/voice/status?callSid=${encodeURIComponent(callSid)}`);
  return twiml(
    `<Say voice="Polly.Joanna">${xmlEscape(CONSENT)}</Say>` +
      `<Start><Transcription track="inbound_track" statusCallbackUrl="${xmlEscape(
        transcriptionCb
      )}"/></Start>` +
      `<Dial>` +
      `<Conference startConferenceOnEnter="true" endConferenceOnExit="true" ` +
      `statusCallback="${xmlEscape(conferenceCb)}" ` +
      `statusCallbackEvent="start end join leave">${xmlEscape(conferenceName)}</Conference>` +
      `</Dial>`
  );
}

/** TwiML for a leg we originate (senior or family) so it joins the conference. */
export function joinTwiml(conferenceName: string): string {
  return twiml(
    `<Dial><Conference startConferenceOnEnter="true" endConferenceOnExit="false">` +
      `${xmlEscape(conferenceName)}</Conference></Dial>`
  );
}

/** Calm message played to the held caller while family is brought in. */
export function holdTwiml(): string {
  return twiml(
    `<Say voice="Polly.Joanna">Please hold. Aegis is connecting a family member for your safety.</Say>` +
      `<Pause length="60"/>`
  );
}

/** Safe fallback played to the senior when no family member answers in time. */
export function fallbackTwiml(): string {
  return twiml(
    `<Say voice="Polly.Joanna">This may be a scam. Please hang up now and do not send any money or codes. ` +
      `Aegis has alerted your family and they will call you right back.</Say>` +
      `<Hangup/>`
  );
}

// ─── Twilio REST helpers (via fetch — no SDK dependency) ─────────────────────────
async function twilioPost(resource: string, params: Record<string, string>): Promise<unknown> {
  if (!twilioConfigured()) {
    console.log(`[voice] (mock) Twilio POST ${resource}`, params);
    return null;
  }
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/${resource}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(params),
    }
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twilio ${resource} ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

/** Ring a number and join it to the conference (used for senior + family). */
export async function dialIntoConference(to: string, conferenceName: string): Promise<string | null> {
  const data = (await twilioPost("Calls.json", {
    From: TWILIO_NUMBER,
    To: to,
    Url: url(`/api/voice/join?conf=${encodeURIComponent(conferenceName)}`),
    Method: "POST",
  })) as { sid?: string } | null;
  return data?.sid ?? null;
}

/** Put a conference participant on hold (or take them off). Needs the conf Sid. */
export async function holdParticipant(
  conferenceSid: string,
  callSid: string,
  hold: boolean
): Promise<void> {
  await twilioPost(`Conferences/${conferenceSid}/Participants/${callSid}.json`, {
    Hold: String(hold),
    HoldUrl: url(`/api/voice/hold`),
  });
}

/** Redirect a live call leg to new TwiML (used for the no-answer fallback). */
export async function redirectCall(callSid: string, path: string): Promise<void> {
  await twilioPost(`Calls/${callSid}.json`, { Url: url(path), Method: "POST" });
}

export async function sendSms(to: string, body: string): Promise<void> {
  await twilioPost("Messages.json", { From: TWILIO_NUMBER, To: to, Body: body });
}

// ─── Analysis + intervention ─────────────────────────────────────────────────────
/**
 * Ingest a new caller utterance, re-score the conversation, and fire the
 * intervention the moment risk crosses the danger threshold. Returns the new score.
 */
export async function ingestUtterance(callSid: string, utterance: string): Promise<number> {
  const state = getCall(callSid);
  if (!state) return 0;
  state.transcript.push(utterance);

  try {
    const result = await analyzeConversation(state.transcript.join("\n"), {
      channel: "phone call",
    });
    state.riskScore = result.riskScore;
    if (result.riskScore >= DANGER_THRESHOLD && !state.intervened) {
      state.intervened = true;
      void intervene(callSid, result.plainLanguageSummary);
    }
  } catch (err) {
    console.error("[voice] analysis error:", err);
  }
  return state.riskScore;
}

/** The HIGH-risk response: hold caller → conference family → alert → fallback. */
async function intervene(callSid: string, summary: string): Promise<void> {
  const state = getCall(callSid);
  if (!state) return;
  console.log(`[voice] INTERVENING on ${callSid} (risk ${state.riskScore})`);

  // 1. Hold the caller — instantly defuses the scammer's time pressure.
  if (state.conferenceSid) {
    await holdParticipant(state.conferenceSid, callSid, true).catch((e) =>
      console.error("[voice] hold failed:", e)
    );
  }

  // 2. Ring the Trusted Circle into the conference.
  for (const num of TRUSTED_NUMBERS) {
    const sid = await dialIntoConference(num, state.conferenceName).catch((e) => {
      console.error("[voice] dial family failed:", e);
      return null;
    });
    if (sid) state.familyCallSids.add(sid);
  }

  // 3. Alert the Trusted Circle out-of-band (personalized email to each loved
  //    one via the alert route + SMS to each number).
  void fetch(url("/api/alert"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ protectedName: SENIOR_NAME, summary }),
  }).catch(() => {});
  const smsBody = `Aegis: a likely scam is targeting your family member on a call right now. ${summary} Please call them.`;
  for (const num of TRUSTED_NUMBERS) {
    await sendSms(num, smsBody).catch((e) => console.error("[voice] sms failed:", e));
  }

  // 4. No-answer fallback: if no family member has joined in time, advise the
  //    senior to hang up and end the caller's leg. (setTimeout works on a
  //    long-running `next start`; a serverless deploy would use a scheduled task.)
  setTimeout(() => {
    const s = getCall(callSid);
    if (!s || s.familyJoined) return;
    console.log(`[voice] fallback for ${callSid} — no family answered`);
    if (s.seniorCallSid) void redirectCall(s.seniorCallSid, "/api/voice/fallback").catch(() => {});
    void redirectCall(callSid, "/api/voice/fallback").catch(() => {});
  }, FALLBACK_MS);
}
