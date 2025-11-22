"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { TICKER_ITEMS } from "@/lib/ticker-data"

interface TickerBarProps {
  onNavigate?: (sectionId: string) => void
}

export function TickerBar({ onNavigate }: TickerBarProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Duplicate items for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS]

  const handleTickerClick = (item: typeof TICKER_ITEMS[0]) => {
    if (item.type === "nav" && item.sectionId && onNavigate) {
      onNavigate(item.sectionId)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-black to-black border-b border-lime-500/30 shadow-lg shadow-lime-500/10">
      {/* Header label */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs font-mono text-lime-400 uppercase tracking-widest pointer-events-none">
        MARKET FEED
      </div>

      {/* Ticker container */}
      <div
        ref={containerRef}
        className="overflow-hidden h-12 flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-8 px-4 min-w-max"
          animate={{ x: isPaused ? 0 : -10000 }}
          transition={{
            duration: 120,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {tickerItems.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              className={`flex items-center gap-2 px-4 py-2 rounded border cursor-pointer transition-all whitespace-nowrap font-mono text-sm ${
                item.type === "nav"
                  ? "border-transparent hover:border-lime-500/50 hover:bg-lime-500/10"
                  : "border-lime-500/20 hover:border-lime-500/70"
              } ${
                hoveredId === item.id
                  ? "bg-lime-500/20 shadow-lg shadow-lime-500/30"
                  : "bg-black/40 hover:shadow-lg hover:shadow-lime-500/20"
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleTickerClick(item)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Symbol */}
              <span
                className={`font-bold text-xs uppercase tracking-wider ${
                  item.type === "nav"
                    ? "text-lime-300"
                    : item.color === "green"
                      ? "text-emerald-400"
                      : item.color === "red"
                        ? "text-red-400"
                        : item.color === "yellow"
                          ? "text-yellow-400"
                          : item.color === "orange"
                            ? "text-orange-400"
                            : "text-lime-400"
                }`}
              >
                {item.symbol}
              </span>

              {/* Price and change (stocks only) */}
              {item.type === "stock" && (
                <>
                  <span className="text-white/70 text-xs">
                    ${item.price?.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      item.change! >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.change! >= 0 ? "+" : ""}
                    {item.change?.toFixed(2)} ({item.changePercent?.toFixed(1)}%)
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right-side indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-mono text-lime-400/50 uppercase tracking-widest pointer-events-none">
        LIVE
      </div>
    </div>
  )
}
