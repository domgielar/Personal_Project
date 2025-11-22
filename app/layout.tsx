import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dominik Gielarowiec | AI Builder & Finance Enthusiast",
  description:
    "UMass CS + Econ student. Passionate about AI, finance, and building products that matter.",
  keywords: [
    "portfolio",
    "developer",
    "AI",
    "finance",
    "UMass",
    "typescript",
    "react",
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
