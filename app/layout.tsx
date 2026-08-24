import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import CustomCursor from "@/components/custom-cursor"
import SplashScreen from "@/components/splash-screen"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Mad Vision Tech | Turning Vision Into Innovation",
  description:
    "Mad Vision Tech delivers advanced AI-powered SaaS products and enterprise-grade ERP systems designed for modern businesses.",
  keywords: ["AI Solutions", "SaaS Development", "ERP Systems", "Web Development", "Mobile Apps", "Cloud DevOps"],
  authors: [{ name: "Vivek Vora", url: "https://visiontech.com" }],
  creator: "Mad Vision Tech",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#f0f0f0",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}>
        {/* The splash is server-rendered too, so without JS it would cover the
            site forever with no timer to dismiss it. Hide it in that case. */}
        <noscript>
          <style>{`[data-splash]{display:none!important}`}</style>
        </noscript>
        <SplashScreen />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
