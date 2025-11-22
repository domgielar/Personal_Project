"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"

interface WorkItem {
  company: string
  role: string
  period: string
  metrics: string[]
}

export function WorkPanel() {
  const workItems: WorkItem[] = [
    {
      company: "Cornerstone Bank",
      role: "Bank Teller Associate",
      period: "2023-2024",
      metrics: ["$2M+ transactions", "500+ customers", "99% accuracy"],
    },
    {
      company: "UMass Amherst",
      role: "Student / Researcher",
      period: "2022-present",
      metrics: ["CS Major", "Econ Double Major", "GPA 3.7+"],
    },
  ]

  return (
    <TerminalPanel title="WORK & EXPERIENCE" label="EMPLOYMENT_HISTORY" delay={0.2}>
      <div className="space-y-6">
        {workItems.map((item, idx) => (
          <div key={idx} className="pb-4 border-b border-lime-500/20 last:border-b-0">
            {/* Company & Role */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-lime-300 font-bold text-sm uppercase">
                  {item.company}
                </div>
                <div className="text-lime-400/60 text-xs">{item.role}</div>
              </div>
              <div className="text-lime-400/50 text-xs whitespace-nowrap">
                {item.period}
              </div>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2 mt-3">
              {item.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-lime-500/10 border border-lime-500/30 text-lime-300 text-xs rounded"
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Performance chart simulation */}
        <div className="mt-6 pt-4 border-t border-lime-500/20">
          <div className="text-lime-400/60 text-xs uppercase tracking-wider mb-3">
            Performance Index
          </div>
          <div className="space-y-2">
            {[
              { label: "Growth", value: 85 },
              { label: "Impact", value: 78 },
              { label: "Learning", value: 92 },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-lime-400/60 text-xs">{item.label}</span>
                <div className="w-20 h-1 bg-lime-500/20 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lime-400 to-emerald-400"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TerminalPanel>
  )
}
