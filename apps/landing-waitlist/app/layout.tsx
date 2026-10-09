import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Launch Waitlist | Portfolio demo template",
  description: "High-converting waitlist landing page — portfolio demo template (T1).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-body">{children}</body>
    </html>
  );
}
