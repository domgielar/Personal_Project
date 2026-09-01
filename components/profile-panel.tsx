"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"

export function ProfilePanel() {
  return (
    <TerminalPanel title="PROFILE" label="USER_DATA" delay={0.1}>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <div className="text-amber-400/60 text-xs uppercase tracking-wider">
            &gt; NAME
          </div>
          <div className="text-amber-300 font-bold text-lg">
            DOMINIK GIELAROWIEC
          </div>
        </div>

        {/* Role */}
        <div>
          <div className="text-amber-400/60 text-xs uppercase tracking-wider">
            &gt; ROLE
          </div>
          <div className="text-amber-300">Full-Stack Developer · CS + Econ @ UMass</div>
        </div>

        {/* Status */}
        <div>
          <div className="text-amber-400/60 text-xs uppercase tracking-wider">
            &gt; STATUS
          </div>
          <div className="text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ACTIVELY BUILDING
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="text-amber-400/60 text-xs uppercase tracking-wider">
            &gt; BIO
          </div>
          <p className="text-white/70 text-xs leading-relaxed mt-2">
            UMass Amherst CS + Economics student who moves between code and
            capital. Lead Full-Stack Developer at LVLnity, shipping
            production apps in Next.js and Firebase, while gaining
            hands-on banking exposure at Cornerstone Bank navigating
            KYC/AML compliance. Two-time hackathon builder (HackHer 2026
            winner), with prior stints in private equity underwriting and
            startup business development. I like building things that sit at
            the intersection of software and finance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-amber-500/20">
          <div>
            <div className="text-amber-400/60 text-xs uppercase">Projects</div>
            <div className="text-amber-300 font-bold text-lg">3+</div>
          </div>
          <div>
            <div className="text-amber-400/60 text-xs uppercase">Hackathons</div>
            <div className="text-amber-300 font-bold text-lg">2</div>
          </div>
          <div>
            <div className="text-amber-400/60 text-xs uppercase">Languages</div>
            <div className="text-amber-300 font-bold text-lg">3</div>
          </div>
        </div>
      </div>
    </TerminalPanel>
  )
}
