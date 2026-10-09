import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Booking Calendar | Portfolio demo template",
  description: "Week calendar slot booking demo (T3).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-body">{children}</body>
    </html>
  );
}
