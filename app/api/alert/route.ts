import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Trusted Circle alert. Emails one or more loved ones — each message
 * personalized with their name and the protected person's name — via Resend if
 * RESEND_API_KEY is set; otherwise returns a graceful "mock" success so the demo
 * always works. (SMS via Twilio is handled in the voice layer; see lib/voice.ts.)
 *
 * Recipients are resolved in priority order:
 *   1. request body `contacts: [{ name?, email }]`
 *   2. request body `contactName` + env email (legacy single recipient)
 *   3. env `ALERT_CONTACTS`  ("Sarah:sarah@x.com, John:john@y.com")
 *   4. env `ALERT_TO_EMAILS` ("sarah@x.com, john@y.com")
 *   5. env `ALERT_TO_EMAIL`  (legacy single)
 */

interface Contact {
  name?: string;
  email: string;
}

const isEmail = (s: unknown): s is string => typeof s === "string" && s.includes("@");

/** Parse loved-ones from env. ALERT_CONTACTS keeps names; the others are email-only. */
function envContacts(): Contact[] {
  const withNames = process.env.ALERT_CONTACTS?.trim();
  if (withNames) {
    return withNames
      .split(",")
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const i = pair.indexOf(":"); // "Name:email" — email never contains ":"
        return i === -1
          ? { email: pair }
          : { name: pair.slice(0, i).trim(), email: pair.slice(i + 1).trim() };
      })
      .filter((c) => isEmail(c.email));
  }
  const list = process.env.ALERT_TO_EMAILS || process.env.ALERT_TO_EMAIL || "";
  return list
    .split(",")
    .map((e) => e.trim())
    .filter(isEmail)
    .map((email) => ({ email }));
}

function resolveContacts(body: Record<string, unknown>): Contact[] {
  // 1. explicit list from the caller
  if (Array.isArray(body.contacts)) {
    const cs = (body.contacts as unknown[])
      .map((c) => c as { name?: string; email?: string })
      .filter((c) => isEmail(c?.email))
      .map((c) => ({ name: c.name, email: c.email as string }));
    if (cs.length) return cs;
  }
  // 2. legacy single contactName + an env email to send it to
  const env = envContacts();
  if (typeof body.contactName === "string" && body.contactName && env[0]) {
    return [{ name: body.contactName, email: env[0].email }];
  }
  // 3–5. env-configured recipients
  return env;
}

function buildEmail(contact: Contact, protectedName: string, summary: string) {
  const greeting = contact.name ? `Hi ${contact.name},` : "Hi,";
  return {
    subject: `Aegis Alert: possible scam targeting ${protectedName}`,
    text:
      `${greeting}\n\n` +
      `Aegis detected a likely SCAM targeting ${protectedName} on a call happening right now.\n\n` +
      `${summary}\n\n` +
      `Please call ${protectedName} as soon as you can to check on them.\n\n— Aegis`,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const protectedName = (body.protectedName as string) || "your family member";
    const summary = (body.summary as string) || "A likely scam was detected.";

    const contacts = resolveContacts(body);
    const recipients = contacts.map((c) => c.name || c.email);

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ALERT_FROM_EMAIL ?? "Aegis <onboarding@resend.dev>";

    // No key or nobody to email → mock success (keeps the demo bulletproof).
    if (!apiKey || contacts.length === 0) {
      return NextResponse.json({ ok: true, channel: "mock", sent: 0, recipients });
    }

    // Send one personalized email per loved one.
    const results = await Promise.all(
      contacts.map(async (c) => {
        const { subject, text } = buildEmail(c, protectedName, summary);
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ from, to: c.email, subject, text }),
          });
          return res.ok;
        } catch {
          return false;
        }
      })
    );

    const sent = results.filter(Boolean).length;
    if (sent === 0) {
      // Don't break the UI flow if email delivery fails.
      return NextResponse.json({ ok: true, channel: "mock", sent: 0, note: "email_failed", recipients });
    }
    return NextResponse.json({ ok: true, channel: "email", sent, recipients });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: true, channel: "mock", error: message });
  }
}
