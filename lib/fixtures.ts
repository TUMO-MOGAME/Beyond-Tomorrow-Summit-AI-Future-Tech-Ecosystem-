import grandparent from "@/fixtures/grandparent-scam.json";
import bank from "@/fixtures/bank-impersonation.json";
import romance from "@/fixtures/romance-pig-butchering.json";
import safe from "@/fixtures/safe-conversation.json";

export interface FixtureLine {
  speaker: string;
  text: string;
}

export interface Fixture {
  id: string;
  title: string;
  channel: string;
  caller: string;
  lines: FixtureLine[];
}

export const FIXTURES: Fixture[] = [grandparent, bank, romance, safe] as Fixture[];

/** Flatten a fixture's lines into a single transcript string for the engine. */
export function fixtureToText(f: Fixture): string {
  return f.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");
}
