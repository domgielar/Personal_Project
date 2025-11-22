"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"

export function ProfilePanel() {
  return (
    <TerminalPanel title="PROFILE" label="USER_DATA" delay={0.1}>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <div className="text-lime-400/60 text-xs uppercase tracking-wider">
            &gt; NAME
          </div>
          <div className="text-lime-300 font-bold text-lg">
            DOMINIK GIELAROWIEC
          </div>
        </div>

        {/* Role */}
        <div>
          <div className="text-lime-400/60 text-xs uppercase tracking-wider">
            &gt; ROLE
          </div>
          <div className="text-lime-300">CS + Econ Builder</div>
        </div>

        {/* Status */}
        <div>
          <div className="text-lime-400/60 text-xs uppercase tracking-wider">
            &gt; STATUS
          </div>
          <div className="text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ACTIVELY BUILDING
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="text-lime-400/60 text-xs uppercase tracking-wider">
            &gt; BIO
          </div>
          <p className="text-white/70 text-xs leading-relaxed mt-2">
            UMass Amherst student passionate about AI, fintech, and building
            products that matter. Banking experience at Cornerstone Bank.
            Hackathon enthusiast.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-lime-500/20">
          <div>
            <div className="text-lime-400/60 text-xs uppercase">Projects</div>
            <div className="text-lime-300 font-bold text-lg">12+</div>
          </div>
          <div>
            <div className="text-lime-400/60 text-xs uppercase">Hackathons</div>
            <div className="text-lime-300 font-bold text-lg">8</div>
          </div>
          <div>
            <div className="text-lime-400/60 text-xs uppercase">Languages</div>
            <div className="text-lime-300 font-bold text-lg">6</div>
          </div>
        </div>
      </div>
    </TerminalPanel>
  )
}
