import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Launch Audit Report | Portfolio demo template",
  description: "Before/after security audit sandbox and printable report (T4).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-body">{children}</body>
    </html>
  );
}
