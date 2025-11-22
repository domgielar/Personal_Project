"use client"

import React from "react"
import { motion } from "framer-motion"

interface TerminalPanelProps {
  title: string
  label?: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TerminalPanel({
  title,
  label = "TERMINAL",
  children,
  className = "",
  delay = 0,
}: TerminalPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`relative bg-black border border-lime-500/30 rounded-sm shadow-lg shadow-lime-500/10 overflow-hidden group hover:border-lime-500/60 hover:shadow-lime-500/20 transition-all ${className}`}
    >
      {/* Animated border glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-lime-500/0 via-lime-500/5 to-lime-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent" />

      {/* Header with label */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-lime-500/20 bg-gradient-to-r from-black via-lime-500/5 to-black">
        <div>
          <h3 className="text-lime-400 font-mono text-sm font-bold uppercase tracking-widest">
            {title}
          </h3>
          <div className="text-lime-400/40 font-mono text-xs tracking-wider">
            {label}
          </div>
        </div>
        <div className="flex gap-2">
          {/* Status indicators */}
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-lime-400/50" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-white/80 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
