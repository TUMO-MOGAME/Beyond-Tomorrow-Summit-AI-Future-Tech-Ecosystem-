import { NextResponse } from "next/server";
import { joinTwiml } from "@/lib/voice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const xml = (body: string) => new NextResponse(body, { headers: { "Content-Type": "text/xml" } });

/** TwiML for a leg Aegis originated (senior or family) so it joins the conference. */
export async function POST(req: Request) {
  const conf = new URL(req.url).searchParams.get("conf") || "";
  return xml(joinTwiml(conf));
}

export const GET = POST;
