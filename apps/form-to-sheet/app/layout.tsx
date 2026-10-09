import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Form to Sheet | Portfolio demo template",
  description: "Form POST → Google Sheets or JSON mock (T2).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-body">{children}</body>
    </html>
  );
}
