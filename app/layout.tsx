import type { Metadata } from "next";
import { Outfit, Gamja_Flower } from "next/font/google";
import "./globals.css";

// Body / UI — clean, modern, friendly.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Aegis's warm "voice" — a soft handwritten accent for the human moments.
const gamja = Gamja_Flower({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aegis — Stop scams before they happen",
  description:
    "A gentle AI guardian that watches over phone calls, texts, and chats — and steps in the moment a scam begins, looping in family before a loved one loses money.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${gamja.variable}`}>
      <body>{children}</body>
    </html>
  );
}
