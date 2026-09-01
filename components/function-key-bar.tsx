"use client"

import React from "react"
import { generateResearchNote } from "@/lib/generate-research-note"

interface FunctionKeyBarProps {
  onNavigate?: (sectionId: string) => void
}

interface KeyItem {
  key: string
  label: string
  section?: string
  download?: boolean
  note?: boolean
}

const ACTIVE_KEYS: KeyItem[] = [
  { key: "F1", label: "HOME", section: "home" },
  { key: "F2", label: "ABOUT", section: "about" },
  { key: "F3", label: "EXPERIENCE", section: "work" },
  { key: "F4", label: "PROJECTS", section: "projects" },
  { key: "F5", label: "CONTACT", section: "contact" },
  { key: "F6", label: "RESUME", download: true },
  { key: "F7", label: "WIRE", section: "wire" },
  { key: "F8", label: "NOTE", note: true },
]

const RESERVED_KEYS = ["F9", "F10", "F11", "F12"]

export function FunctionKeyBar({ onNavigate }: FunctionKeyBarProps) {
  const handleClick = (item: KeyItem) => {
    if (item.section) {
      onNavigate?.(item.section)
    } else if (item.download) {
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "resume.pdf"
      link.click()
    } else if (item.note) {
      generateResearchNote()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-10 bg-black border-t border-amber-500/30 flex items-stretch font-mono overflow-x-auto">
      {ACTIVE_KEYS.map((item) => (
        <button
          key={item.key}
          onClick={() => handleClick(item)}
          className="flex-1 min-w-0 flex flex-col items-center justify-center border-r border-amber-500/20 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-colors uppercase tracking-wider px-0.5"
        >
          <span className="text-amber-500 font-bold text-[10px] sm:text-xs">{item.key}</span>
          <span className="hidden sm:block text-[9px] text-amber-400/70 truncate w-full text-center">
            {item.label}
          </span>
        </button>
      ))}
      {RESERVED_KEYS.map((key) => (
        <div
          key={key}
          tabIndex={-1}
          aria-hidden="true"
          className="flex-1 min-w-0 hidden md:flex flex-col items-center justify-center border-r border-amber-500/10 text-amber-500/20 uppercase tracking-wider cursor-not-allowed pointer-events-none"
        >
          <span className="font-bold text-xs">{key}</span>
          <span className="text-[9px]">—</span>
        </div>
      ))}
    </div>
  )
}
