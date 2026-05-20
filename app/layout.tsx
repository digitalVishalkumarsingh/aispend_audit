import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackSave — Audit your AI spend in 60 seconds",
  description:
    "Find out how much your team is overspending on ChatGPT, Claude, Cursor, and Copilot. Get a personalized savings report — free, no signup.",
  metadataBase: new URL("https://stacksave.app"),
  openGraph: {
    title: "StackSave — Audit your AI spend in 60 seconds",
    description:
      "Find out how much your team is overspending on AI tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-fg">
        {children}
      
      </body>
    </html>
  );
}
