import { NextResponse } from "next/server";
import {
  initCall,
  incomingTwiml,
  dialIntoConference,
  getCall,
  SENIOR_NUMBER,
  readTwilioForm,
  verifyTwilioSignature,
} from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const xml = (body: string) => new NextResponse(body, { headers: { "Content-Type": "text/xml" } });

/**
 * Twilio webhook for an inbound unknown caller. Returns TwiML that plays the
 * consent disclosure, starts live transcription of the caller, and drops them
 * into a per-call conference. In parallel we ring the senior into that same
 * conference so it feels like a normal call.
 */
export async function POST(req: Request) {
  const params = await readTwilioForm(req);
  if (!verifyTwilioSignature(req.url, params, req.headers.get("x-twilio-signature") || "")) {
    return new NextResponse("Invalid Twilio signature", { status: 403 });
  }
  const callSid = params.CallSid || `sim-${Date.now()}`;
  const from = params.From || "unknown";

  const state = initCall(callSid, from);

  // Ring the protected person into the conference (non-blocking).
  if (SENIOR_NUMBER) {
    dialIntoConference(SENIOR_NUMBER, state.conferenceName)
      .then((sid) => {
        const s = getCall(callSid);
        if (s && sid) s.seniorCallSid = sid;
      })
      .catch((e) => console.error("[voice/incoming] dial senior failed:", e));
  }

  return xml(incomingTwiml(callSid, state.conferenceName));
}
