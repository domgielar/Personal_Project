"use client"

import React, { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STORAGE_KEY = "terminal_booted"
const BOOT_DURATION_MS = 1100
const EXIT_DURATION_S = 0.3

export function IntroOverlay() {
  const [phase, setPhase] = useState<"checking" | "booting" | "done">("checking")

  const finish = useCallback(() => {
    setPhase("done")
  }, [])

  useEffect(() => {
    let alreadyBooted = false
    try {
      alreadyBooted = window.localStorage.getItem(STORAGE_KEY) === "1"
    } catch {
      alreadyBooted = false
    }

    if (alreadyBooted) {
      finish()
      return
    }

    setPhase("booting")
    try {
      window.localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // localStorage unavailable (private mode etc.) — boot plays every time, non-fatal
    }

    const timer = setTimeout(finish, BOOT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [finish])

  useEffect(() => {
    if (phase !== "booting") return
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish()
    }
    window.addEventListener("keydown", skip)
    return () => window.removeEventListener("keydown", skip)
  }, [phase, finish])

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center font-mono cursor-pointer"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION_S }}
          onClick={finish}
        >
          {phase === "booting" && (
            <>
              {/* Terminal lines */}
              <div className="space-y-3 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0, duration: 0.25 }}
                  className="text-amber-400 text-lg tracking-wider uppercase"
                >
                  $ BOOTING TERMINAL...
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="text-amber-400/70 text-sm tracking-wider"
                >
                  INITIALIZING MARKET FEED
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.25 }}
                  className="text-amber-400/50 text-xs tracking-wider"
                >
                  CONNECTING TO DOMINIK INDEX...
                </motion.div>

                <motion.div
                  className="text-amber-400 text-lg"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ●●●
                </motion.div>
              </div>

              {/* Loading bar */}
              <motion.div
                className="absolute bottom-20 w-64 h-1 bg-amber-400/20 rounded overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-300"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Skip hint */}
              <div className="absolute bottom-6 text-amber-400/40 text-[10px] tracking-widest uppercase">
                click / esc / enter to skip
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
