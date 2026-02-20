import type { Metadata } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/8bit/tooltip";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Commit or Quit - Life Version Control",
  description:
    "Track your life decisions like Git commits. Branch your choices, monitor your streaks, and version control your journey.",
  authors: { name: "Abu Bokkor Siddik", url: "https://github.com/Abubokkor98" },
  keywords: ["commit", "quit", "life", "version control", "decisions"],
  publisher: "Abu Bokkor Siddik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} ${pressStart2P.variable} font-mono antialiased bg-background text-foreground min-h-screen`}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
