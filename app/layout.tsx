import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M2C Markdowns — Launching Soon",
  description:
    "M2C Markdowns connects makers directly with customers worldwide. Textile-first, every sector. No middlemen, factory-direct prices, rewards, worldwide delivery and 24×7 support. Launching soon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} antialiased`}>
      <body className="grain min-h-full">{children}</body>
    </html>
  );
}
