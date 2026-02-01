import type { Metadata, Viewport } from "next";
import { Dancing_Script, Quicksand } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-romantic",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Be My Valentine? 💕",
  description: "Someone special wants to ask you something... 👉👈",
  openGraph: {
    title: "Be My Valentine? 💕",
    description: "Someone special wants to ask you something... 👉👈",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be My Valentine? 💕",
    description: "Someone special wants to ask you something... 👉👈",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${quicksand.variable}`}>
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}
