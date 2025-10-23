import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { DotGothic16, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const dotGothic16 = DotGothic16({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dot-gothic16'
})

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323'
})

export const metadata: Metadata = {
  title: "Vinyl Vault",
  description: "PC-98 style vinyl collection tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dotGothic16.className} ${dotGothic16.variable} ${pressStart.className} ${pressStart.variable} ${vt323.className} ${vt323.variable} antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
