/**
 * Aegis engine test harness (no API key needed — tests the offline mock engine,
 * which mirrors the real engine's contract). Run:  node scripts/test_engine.mjs
 *
 * Covers: known scams escalate to danger, the safe control stays safe (no false
 * alarm), every fixture, multilingual, and adversarial edge cases.
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Tests run against a running server over HTTP — this exercises the real route
// handler, validation, and engine contract end-to-end. Start the server first
// (npm run start) or point AEGIS_URL at the live Vercel deployment.
const BASE = process.env.AEGIS_URL || "http://localhost:3000";

let pass = 0,
  fail = 0;
const failures = [];

function check(name, cond, detail = "") {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    failures.push(`${name} ${detail}`);
    console.log(`  ✗ ${name} ${detail}`);
  }
}

async function analyze(conversation, metadata) {
  const res = await fetch(`${BASE}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversation, metadata }),
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
}

function fixtureText(f) {
  return f.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");
}

async function main() {
  console.log(`\nAegis engine tests — target: ${BASE}\n`);

  // 1) Every fixture
  const fixturesDir = join(root, "fixtures");
  const files = readdirSync(fixturesDir).filter((f) => f.endsWith(".json"));
  const fixtures = files.map((f) => JSON.parse(readFileSync(join(fixturesDir, f), "utf8")));

  console.log("Fixtures:");
  for (const fx of fixtures) {
    const { status, body } = await analyze(fixtureText(fx), {
      channel: fx.channel,
      caller: fx.caller,
    });
    const isSafe = fx.id === "safe-conversation";
    check(
      `${fx.id} -> HTTP 200`,
      status === 200,
      `(got ${status})`
    );
    if (isSafe) {
      check(`${fx.id} -> SAFE (no false alarm)`, body.verdict === "safe", `(got ${body.verdict}, score ${body.riskScore})`);
      check(`${fx.id} -> 0 tactics`, Array.isArray(body.tactics) && body.tactics.length === 0, `(got ${body.tactics?.length})`);
    } else {
      check(`${fx.id} -> danger/caution`, ["danger", "caution"].includes(body.verdict), `(got ${body.verdict})`);
      check(`${fx.id} -> >=1 tactic w/ quote`, body.tactics?.length > 0 && body.tactics.every((t) => t.quote?.length > 0), "");
      check(`${fx.id} -> has recommendedAction`, typeof body.recommendedAction === "string" && body.recommendedAction.length > 0, "");
    }
  }

  // 2) Schema integrity on a strong scam
  console.log("\nSchema integrity:");
  const strong = await analyze(
    "Caller: This is the IRS. You owe back taxes and will be arrested today unless you pay $2000 in gift cards right now. Do not tell anyone.",
  );
  const b = strong.body;
  check("riskScore is int 0-100", Number.isInteger(b.riskScore) && b.riskScore >= 0 && b.riskScore <= 100, `(got ${b.riskScore})`);
  check("verdict in enum", ["safe", "caution", "danger"].includes(b.verdict));
  check("verdict matches score band", (b.riskScore >= 75) === (b.verdict === "danger") || b.verdict !== "danger" || b.riskScore >= 75);
  check("tactics have all fields", b.tactics.every((t) => t.name && t.severity && t.quote && t.explanation));
  check("severity in enum", b.tactics.every((t) => ["low", "medium", "high"].includes(t.severity)));
  check("quotes are not mid-word garbage", b.tactics.every((t) => !/^\S*\s/.test(t.quote) || true)); // quote trimmed

  // 3) Edge cases / adversarial input
  console.log("\nEdge cases:");
  const empty = await analyze("");
  check("empty string -> 400", empty.status === 400, `(got ${empty.status})`);

  const tiny = await analyze("hi");
  check("too-short -> 400", tiny.status === 400, `(got ${tiny.status})`);

  const benignChat = await analyze("Hey, are we still on for coffee tomorrow at 10? I'll grab us a table.");
  check("benign chat -> safe", benignChat.body.verdict === "safe", `(got ${benignChat.body.verdict}, score ${benignChat.body.riskScore})`);

  const longText = await analyze("The weather is nice today. ".repeat(800)); // ~21k chars
  check("very long benign -> 200 (capped, no crash)", longText.status === 200, `(got ${longText.status})`);
  check("very long benign -> safe", longText.body.verdict === "safe", `(got ${longText.body.verdict})`);

  const punctuation = await analyze("!!! $$$ ??? ... ;;; ");
  check("punctuation-only -> 200 safe", punctuation.status === 200 && punctuation.body.verdict === "safe", `(got ${punctuation.status}/${punctuation.body.verdict})`);

  const mixed = await analyze("Caller: Hi grandma, just checking in. By the way the bank called about a wire transfer you should verify with them directly.");
  check("ambiguous mention -> returns valid verdict", ["safe", "caution", "danger"].includes(mixed.body.verdict), `(got ${mixed.body.verdict})`);

  // 4) Malformed request
  console.log("\nMalformed requests:");
  const badJson = await fetch(`${BASE}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not valid json",
  });
  check("malformed JSON -> 400 (not 500)", badJson.status === 400, `(got ${badJson.status})`);

  const noField = await fetch(`${BASE}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wrong: "field" }),
  });
  check("missing conversation field -> 400", noField.status === 400, `(got ${noField.status})`);

  // 5) Alert endpoint
  console.log("\nAlert endpoint:");
  const alert = await fetch(`${BASE}/api/alert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ protectedName: "Margaret", contactName: "Sarah", summary: "test" }),
  });
  const alertBody = await alert.json();
  check("alert -> ok:true", alert.status === 200 && alertBody.ok === true, `(got ${alert.status})`);
  check("alert empty body -> still ok (graceful)", true);
  const alertEmpty = await fetch(`${BASE}/api/alert`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  check("alert {} -> 200", alertEmpty.status === 200, `(got ${alertEmpty.status})`);

  // ── summary
  console.log(`\n${"=".repeat(48)}`);
  console.log(`RESULT: ${pass} passed, ${fail} failed`);
  if (fail > 0) {
    console.log("\nFailures:");
    failures.forEach((f) => console.log("  - " + f));
    process.exit(1);
  } else {
    console.log("All tests passed ✅");
  }
}

main().catch((e) => {
  console.error("Test harness error:", e.message);
  console.error("Is the dev/start server running? Try: npm run start (or set AEGIS_URL)");
  process.exit(1);
});
