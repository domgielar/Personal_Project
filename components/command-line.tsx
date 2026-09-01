"use client"

import React, { useRef, useState } from "react"
import { generateResearchNote } from "@/lib/generate-research-note"

interface CommandLineProps {
  onNavigate?: (sectionId: string) => void
  onEasterEgg?: (type: "anim" | "tetris") => void
}

const NAV_COMMANDS: Record<string, string> = {
  HOME: "home",
  ABOUT: "about",
  PROFILE: "about",
  WORK: "work",
  EXPERIENCE: "work",
  EDUCATION: "work",
  PROJECTS: "projects",
  WIRE: "wire",
  NEWS: "wire",
  CONTACT: "contact",
}

const DOWNLOAD_COMMANDS = new Set(["RESUME", "CV"])
const NOTE_COMMANDS = new Set(["REPORT", "NOTE"])
const EASTER_EGGS: Record<string, "anim" | "tetris"> = {
  ANIM: "anim",
  TETRIS: "tetris",
}

const DEFAULT_STATUS =
  "TYPE A COMMAND AND PRESS <GO> — TRY: HOME, PROJECTS, WIRE, ALERT, REPORT, CONTACT, RESUME, HELP"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function CommandLine({ onNavigate, onEasterEgg }: CommandLineProps) {
  const [value, setValue] = useState("")
  const [status, setStatus] = useState(DEFAULT_STATUS)
  const [mode, setMode] = useState<"command" | "alert-email">("command")
  const inputRef = useRef<HTMLInputElement>(null)

  const submitAlertEmail = async (email: string) => {
    if (!EMAIL_RE.test(email)) {
      setStatus(`"${email}" DOESN'T LOOK LIKE A VALID EMAIL — TRY AGAIN OR ESC TO CANCEL`)
      return
    }

    const endpoint = process.env.NEXT_PUBLIC_ALERT_FORM_ENDPOINT
    if (!endpoint) {
      setStatus("ALERT SYSTEM NOT YET CONFIGURED — EMAIL DOMINIKGIELAROWIEC@GMAIL.COM DIRECTLY")
      setMode("command")
      return
    }

    setStatus("SETTING ALERT...")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message: "Price alert subscription request from portfolio terminal (ALERT <GO>)",
        }),
      })
      setStatus(
        res.ok
          ? `ALERT SET FOR ${email.toUpperCase()} — YOU'LL BE PINGED ON NEW POSTS`
          : "ALERT FAILED TO SET — TRY AGAIN LATER"
      )
    } catch {
      setStatus("ALERT FAILED TO SET — TRY AGAIN LATER")
    }
    setMode("command")
  }

  const runCommand = () => {
    const raw = value.trim()
    if (!raw) return

    if (mode === "alert-email") {
      setValue("")
      submitAlertEmail(raw)
      return
    }

    const cmd = raw.toUpperCase()

    if (cmd === "HELP") {
      setStatus("AVAILABLE: HOME · ABOUT · WORK · PROJECTS · WIRE · ALERT · REPORT · CONTACT · RESUME")
    } else if (cmd === "ALERT") {
      setMode("alert-email")
      setStatus("ENTER EMAIL TO SET PRICE ALERT ON NEW POSTS (ESC TO CANCEL):")
    } else if (NOTE_COMMANDS.has(cmd)) {
      setStatus("GENERATING RESEARCH NOTE...")
      generateResearchNote()
    } else if (EASTER_EGGS[cmd]) {
      onEasterEgg?.(EASTER_EGGS[cmd])
      inputRef.current?.blur()
    } else if (NAV_COMMANDS[cmd]) {
      onNavigate?.(NAV_COMMANDS[cmd])
      setStatus(`NAVIGATING TO ${cmd}...`)
    } else if (DOWNLOAD_COMMANDS.has(cmd)) {
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "resume.pdf"
      link.click()
      setStatus("DOWNLOADING RESUME.PDF...")
    } else {
      setStatus(`COMMAND NOT FOUND: "${cmd}" — TYPE HELP <GO>`)
    }
    setValue("")
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-40 h-9 bg-black border-b border-amber-500/20 flex items-center px-4 gap-3 font-mono text-xs">
      <span className="text-amber-500 font-bold hidden sm:inline">
        {mode === "alert-email" ? "EMAIL>" : "CMD>"}
      </span>
      <input
        ref={inputRef}
        value={value}
        type={mode === "alert-email" ? "email" : "text"}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") runCommand()
          if (e.key === "Escape" && mode === "alert-email") {
            setMode("command")
            setValue("")
            setStatus(DEFAULT_STATUS)
          }
        }}
        onFocus={() => {
          if (mode === "command") setStatus(DEFAULT_STATUS)
        }}
        placeholder={mode === "alert-email" ? "you@example.com" : "TYPE COMMAND..."}
        className={`flex-1 bg-transparent text-amber-300 placeholder:text-amber-500/30 outline-none tracking-wider min-w-0 ${
          mode === "alert-email" ? "" : "uppercase"
        }`}
      />
      <button
        onClick={runCommand}
        className="px-2 py-0.5 border border-amber-500/50 text-amber-400 hover:bg-amber-500/20 uppercase tracking-widest text-[10px] font-bold flex-shrink-0"
      >
        &lt;GO&gt;
      </button>
      <span className="text-amber-400/40 hidden lg:inline truncate max-w-sm">
        {status}
      </span>
    </div>
  )
}
