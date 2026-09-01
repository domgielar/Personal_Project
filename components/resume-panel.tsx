"use client"

import React from "react"
import { TerminalPanel } from "./terminal-panel"
import { FileText, Download, FileBarChart } from "lucide-react"
import { motion } from "framer-motion"
import { generateResearchNote } from "@/lib/generate-research-note"

export function ResumePanel() {
  return (
    <TerminalPanel title="RESUME & CV" label="DOCUMENT_PORTAL" delay={0.4}>
      <div className="space-y-6">
        {/* Document info */}
        <div className="flex items-start gap-4 pb-6 border-b border-amber-500/20">
          <FileText className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <div className="text-amber-300 font-semibold">Resume.pdf</div>
            <div className="text-amber-400/50 text-xs">
              Last updated: July 2026
            </div>
            <div className="text-amber-400/40 text-xs mt-1">
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
          className="block w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-mono font-bold uppercase tracking-widest text-sm rounded border border-amber-400 hover:shadow-lg hover:shadow-amber-500/50 transition-all text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            DOWNLOAD CV
          </div>
        </motion.a>

        {/* Research note export */}
        <motion.button
          onClick={() => generateResearchNote()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full px-4 py-3 bg-black border border-amber-500/40 text-amber-300 font-mono font-bold uppercase tracking-widest text-sm rounded hover:bg-amber-500/10 hover:border-amber-400 transition-all text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <FileBarChart className="w-4 h-4" />
            EXPORT RESEARCH NOTE
          </div>
        </motion.button>

        {/* Skills snapshot */}
        <div className="pt-4 border-t border-amber-500/20 space-y-4">
          <div>
            <div className="text-amber-400/60 text-xs uppercase tracking-wider mb-3">
              Programming
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                "Python",
                "JavaScript",
                "Java",
                "C++",
                "Swift",
                "SQL",
                "HTML/CSS",
                "API",
              ].map((skill, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-amber-500/5 border border-amber-500/20 text-amber-300 rounded"
                >
                  ✓ {skill}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-amber-400/60 text-xs uppercase tracking-wider mb-3">
              Tools & Concepts
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                "React",
                "Git",
                "Pandas",
                "NumPy",
                "OpenCV",
                "AWS",
                "OOP",
                "Data Structures",
                "CRM Ops",
              ].map((skill, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-amber-500/5 border border-amber-500/20 text-amber-300 rounded"
                >
                  ✓ {skill}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-amber-400/60 text-xs uppercase tracking-wider mb-3">
              Languages
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                "English",
                "Polish (Fluent)",
                "Spanish (Elementary)",
              ].map((lang, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-amber-500/5 border border-amber-500/20 text-amber-300 rounded"
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TerminalPanel>
  )
}
