"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"
import type { WireItem, WireSource } from "@/lib/github-activity"
import type { ConnectionStatus } from "@/lib/use-github-activity"
import { RELEASE_ITEMS } from "@/lib/wire-data"

interface NewsWirePanelProps {
  githubItems: WireItem[]
  status: ConnectionStatus
}

const SOURCE_STYLES: Record<WireSource, string> = {
  GH: "bg-amber-500/10 border-amber-500/40 text-amber-300",
  REL: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
}

function formatRelativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function NewsWirePanel({ githubItems, status }: NewsWirePanelProps) {
  const items = [...githubItems, ...RELEASE_ITEMS].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const statusLabel = status === "live" ? "LIVE" : status === "error" ? "OFFLINE" : "CONNECTING"
  const statusColor =
    status === "live" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-amber-400/60"
  const statusDot =
    status === "live" ? "bg-emerald-400 animate-pulse" : status === "error" ? "bg-red-400" : "bg-amber-400/50 animate-pulse"

  return (
    <TerminalPanel title="NEWS WIRE" label="ACTIVITY_BLOTTER" delay={0.5}>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-500/20">
        <span className="text-amber-400/50 text-xs uppercase tracking-wider">
          Live GitHub activity + milestones
        </span>
        <span className={`flex items-center gap-1.5 text-xs font-mono uppercase ${statusColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
          {statusLabel}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-white/40 text-xs">Loading wire...</div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {items.slice(0, 12).map((item) => {
            const row = (
              <div className="flex items-start gap-3 pb-3 border-b border-amber-500/10 last:border-b-0 last:pb-0">
                <span
                  className={`shrink-0 px-1.5 py-0.5 border rounded text-[10px] font-bold tracking-wider ${SOURCE_STYLES[item.source]}`}
                >
                  {item.source}
                </span>
                <div className="min-w-0">
                  <div className="text-white/80 text-xs leading-relaxed">{item.headline}</div>
                  <div className="text-amber-400/40 text-[10px] mt-1 uppercase tracking-wider">
                    {formatRelativeTime(item.timestamp)}
                  </div>
                </div>
              </div>
            )

            return item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                {row}
              </a>
            ) : (
              <div key={item.id}>{row}</div>
            )
          })}
        </div>
      )}
    </TerminalPanel>
  )
}
