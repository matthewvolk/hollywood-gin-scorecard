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
      <head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
