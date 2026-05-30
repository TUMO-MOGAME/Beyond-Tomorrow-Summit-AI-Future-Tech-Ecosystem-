import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis — Stop scams before they happen",
  description:
    "An AI guardian that detects manipulation in any conversation — voice, SMS, or chat — and intervenes in real time to protect vulnerable people and their money.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
