import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "./lib/i18n";

export const metadata: Metadata = {
  title: "Call Batman",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
