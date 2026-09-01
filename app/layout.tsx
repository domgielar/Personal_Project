import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dominik Gielarowiec | Full-Stack Developer & CS + Econ Student",
  description:
    "UMass Amherst CS + Economics student and full-stack developer building AI, fintech, and full-stack products.",
  keywords: [
    "portfolio",
    "developer",
    "full-stack",
    "AI",
    "fintech",
    "UMass Amherst",
    "typescript",
    "react",
    "next.js",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
