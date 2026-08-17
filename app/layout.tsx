import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Orbitron, Space_Grotesk, Rajdhani } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HACK 5.0 - The Ultimate Hackathon Experience",
  description:
    "Join HACK 5.0, the premier hackathon event for innovators, builders, and dreamers. Compete for prizes, network with industry leaders, and showcase your skills.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable} ${rajdhani.variable}`}>
      <body className="bg-[#4B0082] text-white font-body">{children}</body>
    </html>
  )
}