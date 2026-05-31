import { NextResponse } from "next/server";
import { ingestUtterance, twiml, readTwilioForm, verifyTwilioSignature } from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Twilio real-time Transcription status callback. On each caller utterance we
 * append to the running transcript, re-score it with the Scam DNA Engine, and
 * (inside ingestUtterance) intervene the moment risk crosses the threshold.
 */
export async function POST(req: Request) {
  const params = await readTwilioForm(req);
  if (!verifyTwilioSignature(req.url, params, req.headers.get("x-twilio-signature") || "")) {
    return new NextResponse("Invalid Twilio signature", { status: 403 });
  }
  const callSid = new URL(req.url).searchParams.get("callSid") || params.CallSid || "";
  const event = params.TranscriptionEvent || "";

  if (event === "transcription-content" && callSid) {
    let text = "";
    try {
      text = JSON.parse(params.TranscriptionData || "{}").transcript || "";
    } catch {
      /* ignore malformed payloads */
    }
    if (text) await ingestUtterance(callSid, text);
  }

  // Twilio just needs a 200; empty TwiML is fine.
  return new NextResponse(twiml(""), { headers: { "Content-Type": "text/xml" } });
}
