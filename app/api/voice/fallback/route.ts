import { NextResponse } from "next/server";
import { fallbackTwiml } from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Safe script for the senior when no family member answers in time. */
export async function POST() {
  return new NextResponse(fallbackTwiml(), { headers: { "Content-Type": "text/xml" } });
}

export const GET = POST;
