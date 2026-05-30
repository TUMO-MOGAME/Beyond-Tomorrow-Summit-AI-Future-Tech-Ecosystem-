import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Trusted Circle alert. Sends a real email via Resend if RESEND_API_KEY +
 * ALERT_TO_EMAIL are configured; otherwise returns a graceful "mock" success so
 * the demo always works. (SMS via Twilio is a drop-in future addition.)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const protectedName: string = body.protectedName ?? "your family member";
    const contactName: string = body.contactName ?? "Trusted contact";
    const summary: string = body.summary ?? "A likely scam was detected.";

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ALERT_TO_EMAIL;
    const from = process.env.ALERT_FROM_EMAIL ?? "Aegis <onboarding@resend.dev>";

    const message =
      `⚠️ Aegis detected a likely SCAM targeting ${protectedName} right now.\n\n` +
      `${summary}\n\nPlease call ${protectedName} immediately to check on them.\n\n— Aegis`;

    // No key configured → mock success (keeps the demo bulletproof).
    if (!apiKey || !to) {
      return NextResponse.json({ ok: true, channel: "mock", to: contactName });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `🛡️ Aegis Alert: possible scam targeting ${protectedName}`,
        text: message,
      }),
    });

    if (!res.ok) {
      // Fall back to mock so the UI flow never breaks during a demo.
      return NextResponse.json({ ok: true, channel: "mock", to: contactName, note: "email_failed" });
    }

    return NextResponse.json({ ok: true, channel: "email", to });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: true, channel: "mock", error: message });
  }
}
