import { NextResponse } from "next/server";
import { analyzeConversation, type AnalyzeMeta } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const conversation: string = body.conversation ?? body.text ?? "";
    const meta: AnalyzeMeta | undefined = body.metadata;

    if (!conversation || conversation.trim().length < 4) {
      return NextResponse.json(
        { error: "Provide a 'conversation' string to analyze." },
        { status: 400 }
      );
    }

    const result = await analyzeConversation(conversation, meta);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
