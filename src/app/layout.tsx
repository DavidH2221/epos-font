import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EthioPOS | Business overview",
  description: "A demonstration dashboard for an Ethiopian ePOS and eInvoice platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}