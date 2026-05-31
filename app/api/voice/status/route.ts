import { NextResponse } from "next/server";
import { getCall } from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Conference status callback. We use it to learn the ConferenceSid (needed to
 * hold a participant) and to detect when a family member actually joins (which
 * cancels the no-answer fallback).
 */
export async function POST(req: Request) {
  const callSid = new URL(req.url).searchParams.get("callSid") || "";
  const form = await req.formData().catch(() => null);
  const event = (form?.get("StatusCallbackEvent") as string) || "";
  const conferenceSid = (form?.get("ConferenceSid") as string) || "";
  const participantCallSid = (form?.get("CallSid") as string) || "";

  const state = getCall(callSid);
  if (state) {
    if (event === "conference-start" && conferenceSid) state.conferenceSid = conferenceSid;
    if (event === "participant-join" && state.familyCallSids.has(participantCallSid)) {
      state.familyJoined = true;
    }
  }

  return new NextResponse(null, { status: 204 });
}
