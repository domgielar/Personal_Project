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
      name: "AI Portfolio Assistant",
      tags: ["AI", "LLM", "Python"],
      impact: 92,
      status: "active",
    },
    {
      name: "Finance Dashboard",
      tags: ["React", "TypeScript", "Data"],
      impact: 78,
      status: "active",
    },
    {
      name: "Web3 Marketplace",
      tags: ["Solidity", "Web3", "Blockchain"],
      impact: 65,
      status: "completed",
    },
    {
      name: "Course Scheduler App",
      tags: ["Next.js", "Full-Stack"],
      impact: 88,
      status: "active",
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
        return "text-lime-400"
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
        return "bg-lime-500/10 border-lime-500/30"
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
              <div className="text-lime-300 text-sm font-semibold">
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
                        ? "bg-lime-400"
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
                  className="text-xs text-lime-300 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/20"
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
