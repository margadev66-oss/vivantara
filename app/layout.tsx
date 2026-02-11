import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivartana | Business Advisory",
  description: "Minimalist, intellectual, and warm business management advisory.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-canvas text-thought">{children}</body>
    </html>
  );
}
