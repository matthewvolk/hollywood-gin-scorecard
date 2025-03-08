import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hollywood Gin Scorecard",
  description: "A scorecard for Hollywood Gin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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
