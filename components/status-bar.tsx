"use client"

import React, { useEffect, useState } from "react"
import type { ConnectionStatus } from "@/lib/use-github-activity"

interface StatusBarProps {
  latencyMs: number | null
  status: ConnectionStatus
}

const CLOCKS = [
  { label: "NYC", timeZone: "America/New_York" },
  { label: "LON", timeZone: "Europe/London" },
  { label: "TOK", timeZone: "Asia/Tokyo" },
]

export function StatusBar({ latencyMs, status }: StatusBarProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const statusColor =
    status === "live" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-amber-400/70"
  const statusDot =
    status === "live" ? "bg-emerald-400 animate-pulse" : status === "error" ? "bg-red-400" : "bg-amber-400/50 animate-pulse"
  const statusLabel = status === "live" ? "CONNECTED" : status === "error" ? "OFFLINE" : "CONNECTING"

  return (
    <div className="fixed top-12 left-0 right-0 z-40 h-8 bg-black border-b border-amber-500/10 flex items-center justify-between px-4 font-mono text-[10px] sm:text-xs text-amber-400/70 uppercase tracking-wider overflow-x-auto">
      <div className="flex items-center gap-4 sm:gap-6">
        {CLOCKS.map((clock) => (
          <span key={clock.label} className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-amber-500 font-bold">{clock.label}</span>
            <span className="text-white/60 tabular-nums">
              {now
                ? new Intl.DateTimeFormat("en-US", {
                    timeZone: clock.timeZone,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  }).format(now)
                : "--:--:--"}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
        <span className={statusColor}>{statusLabel}</span>
        {latencyMs !== null && <span className="text-amber-400/50">· {latencyMs}ms</span>}
      </div>
    </div>
  )
}
