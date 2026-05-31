import grandparent from "@/fixtures/grandparent-scam.json";
import spanish from "@/fixtures/spanish-grandparent-scam.json";
import bank from "@/fixtures/bank-impersonation.json";
import romance from "@/fixtures/romance-pig-butchering.json";
import techSupport from "@/fixtures/tech-support-scam.json";
import crypto from "@/fixtures/crypto-investment-scam.json";
import jobOffer from "@/fixtures/job-offer-scam.json";
import sextortion from "@/fixtures/sextortion-scam.json";
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
  language?: string;
  lines: FixtureLine[];
}

export const FIXTURES: Fixture[] = [
  grandparent,
  spanish,
  bank,
  romance,
  techSupport,
  crypto,
  jobOffer,
  sextortion,
  safe,
] as Fixture[];

/** Flatten a fixture's lines into a single transcript string for the engine. */
export function fixtureToText(f: Fixture): string {
  return f.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");
}
