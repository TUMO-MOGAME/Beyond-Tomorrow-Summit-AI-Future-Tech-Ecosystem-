import { NextResponse } from "next/server";
import { analyzeConversation, type AnalyzeMeta } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CHARS = 12_000; // generous for a long call transcript; guards cost/abuse

export async function POST(req: Request) {
  // Parse body defensively — malformed JSON should be a clean 400, not a 500.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body — expected JSON with a 'conversation' field." },
      { status: 400 }
    );
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const raw = (b.conversation ?? b.text ?? "") as unknown;
  const conversation = typeof raw === "string" ? raw : "";
  const meta = b.metadata as AnalyzeMeta | undefined;

  if (conversation.trim().length < 4) {
    return NextResponse.json(
      { error: "Provide a 'conversation' string (at least a few characters) to analyze." },
      { status: 400 }
    );
  }

  // Cap length so a pasted novel can't blow up latency/cost.
  const trimmed = conversation.slice(0, MAX_CHARS);

  try {
    const result = await analyzeConversation(trimmed, meta);
    return NextResponse.json(result);
  } catch (err) {
    // Log the detail server-side; return a safe, user-friendly message.
    console.error("[/api/analyze] engine error:", err);
    return NextResponse.json(
      { error: "The Scam DNA Engine could not analyze this right now. Please try again." },
      { status: 502 }
    );
  }
}
