"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroOverlayProps {
  onComplete?: () => void
  duration?: number
}

export function IntroOverlay({ onComplete, duration = 2000 }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center font-mono"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal lines */}
          <div className="space-y-4 text-center">
            {/* Line 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-lime-400 text-lg tracking-wider uppercase"
            >
              $ BOOTING TERMINAL...
            </motion.div>

            {/* Line 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lime-400/70 text-sm tracking-wider"
            >
              INITIALIZING MARKET FEED
            </motion.div>

            {/* Line 3 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-lime-400/50 text-xs tracking-wider"
            >
              CONNECTING TO DOMINIK INDEX...
            </motion.div>

            {/* Animated dots */}
            <motion.div
              className="text-lime-400 text-lg"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ●●●
            </motion.div>
          </div>

          {/* Loading bar at bottom */}
          <motion.div
            className="absolute bottom-20 w-64 h-1 bg-lime-400/20 rounded overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-lime-400 to-lime-300"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Bottom label */}
          <motion.div
            className="absolute bottom-8 text-lime-400/50 text-xs tracking-widest uppercase"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            CONNECTING...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
