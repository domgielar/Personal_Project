"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"

interface Project {
  name: string
  tags: string[]
  impact: number
  status: "active" | "completed" | "archived"
}

export function ProjectsPanel() {
  const projects: Project[] = [
    {
      name: "Personal Portfolio (Bloomberg-style)",
      tags: ["Next.js 14", "TypeScript", "Framer Motion"],
      impact: 95,
      status: "active",
    },
    {
      name: "Hiring Manager Pro — HackHer 2026 Winner",
      tags: ["Unity", "C#", "Reinforcement Learning"],
      impact: 90,
      status: "completed",
    },
    {
      name: "UDash — Hack UMass XIII",
      tags: ["React", "TypeScript", "Google Gemini"],
      impact: 85,
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400"
      case "completed":
        return "text-blue-400"
      case "archived":
        return "text-yellow-400"
      default:
        return "text-amber-400"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 border-emerald-500/30"
      case "completed":
        return "bg-blue-500/10 border-blue-500/30"
      case "archived":
        return "bg-yellow-500/10 border-yellow-500/30"
      default:
        return "bg-amber-500/10 border-amber-500/30"
    }
  }

  return (
    <TerminalPanel title="PROJECTS" label="PROJECT_PORTFOLIO" delay={0.3}>
      <div className="space-y-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border ${getStatusBg(project.status)} transition-all hover:border-opacity-100`}
          >
            {/* Project header */}
            <div className="flex items-center justify-between mb-2">
              <div className="text-amber-300 text-sm font-semibold">
                {project.name}
              </div>
              <div
                className={`text-xs font-mono uppercase tracking-wider ${getStatusColor(project.status)}`}
              >
                {project.status}
              </div>
            </div>

            {/* Impact bar */}
            <div className="mb-2">
              <div className="w-full h-1 bg-black/50 rounded overflow-hidden">
                <div
                  className={`h-full ${
                    project.impact >= 80
                      ? "bg-emerald-400"
                      : project.impact >= 60
                        ? "bg-amber-400"
                        : "bg-yellow-400"
                  }`}
                  style={{ width: `${project.impact}%` }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TerminalPanel>
  )
}
