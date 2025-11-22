"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"
import { FileText, Download } from "lucide-react"
import { motion } from "framer-motion"

export function ResumePanel() {
  return (
    <TerminalPanel title="RESUME & CV" label="DOCUMENT_PORTAL" delay={0.4}>
      <div className="space-y-6">
        {/* Document info */}
        <div className="flex items-start gap-4 pb-6 border-b border-lime-500/20">
          <FileText className="w-8 h-8 text-lime-400 flex-shrink-0 mt-1" />
          <div>
            <div className="text-lime-300 font-semibold">Resume.pdf</div>
            <div className="text-lime-400/50 text-xs">
              Last updated: November 2024
            </div>
            <div className="text-lime-400/40 text-xs mt-1">
              Comprehensive CV with experience, education, and project highlights
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.a
          href="/resume.pdf"
          download
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full px-4 py-3 bg-gradient-to-r from-lime-500 to-emerald-500 text-black font-mono font-bold uppercase tracking-widest text-sm rounded border border-lime-400 hover:shadow-lg hover:shadow-lime-500/50 transition-all text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            DOWNLOAD CV
          </div>
        </motion.a>

        {/* Skills snapshot */}
        <div className="pt-4 border-t border-lime-500/20">
          <div className="text-lime-400/60 text-xs uppercase tracking-wider mb-3">
            Core Competencies
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              "Full-Stack Dev",
              "React/TypeScript",
              "ML & AI",
              "Finance/FinTech",
              "System Design",
              "Product Building",
            ].map((skill, i) => (
              <div
                key={i}
                className="px-2 py-1 bg-lime-500/5 border border-lime-500/20 text-lime-300 rounded"
              >
                ✓ {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TerminalPanel>
  )
}
