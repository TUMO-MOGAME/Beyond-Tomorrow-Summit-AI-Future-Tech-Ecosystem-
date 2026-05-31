import { NextResponse } from "next/server";
import { getCall, readTwilioForm, verifyTwilioSignature } from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Conference status callback. We use it to learn the ConferenceSid (needed to
 * hold a participant) and to detect when a family member actually joins (which
 * cancels the no-answer fallback).
 */
export async function POST(req: Request) {
  const params = await readTwilioForm(req);
  if (!verifyTwilioSignature(req.url, params, req.headers.get("x-twilio-signature") || "")) {
    return new NextResponse("Invalid Twilio signature", { status: 403 });
  }
  const callSid = new URL(req.url).searchParams.get("callSid") || "";
  const event = params.StatusCallbackEvent || "";
  const conferenceSid = params.ConferenceSid || "";
  const participantCallSid = params.CallSid || "";

  const state = getCall(callSid);
  if (state) {
    if (event === "conference-start" && conferenceSid) state.conferenceSid = conferenceSid;
    if (event === "participant-join" && state.familyCallSids.has(participantCallSid)) {
      state.familyJoined = true;
    }
  }

  return new NextResponse(null, { status: 204 });
}
