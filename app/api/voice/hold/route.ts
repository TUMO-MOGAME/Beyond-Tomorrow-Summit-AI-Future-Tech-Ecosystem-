import { NextResponse } from "next/server";
import { holdTwiml } from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Message played to the held caller while the Trusted Circle is brought in. */
export async function POST() {
  return new NextResponse(holdTwiml(), { headers: { "Content-Type": "text/xml" } });
}

export const GET = POST;
