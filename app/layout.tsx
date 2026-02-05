import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivartana | Business Management Advisory",
  description: "Minimalist, intellectual, and warm business management advisory.",
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
