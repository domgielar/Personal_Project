"use client"

import { CursorProvider } from "@/lib/cursor-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CursorProvider>{children}</CursorProvider>
}
