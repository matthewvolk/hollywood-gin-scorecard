import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hollywood Gin Scorecard",
  description: "A scorecard for Hollywood Gin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
