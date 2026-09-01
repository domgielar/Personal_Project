"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { TICKER_ITEMS, TickerItem } from "@/lib/ticker-data"

interface TickerBarProps {
  onNavigate?: (sectionId: string) => void
}

const JITTER_INTERVAL_MS = 3000
const FLASH_DURATION_MS = 900

export function TickerBar({ onNavigate }: TickerBarProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [items, setItems] = useState<TickerItem[]>(TICKER_ITEMS)
  const [flash, setFlash] = useState<Record<string, "up" | "down">>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Simulate live price ticks with a brief flash on the changed cell
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const stockIndexes = prev
          .map((item, idx) => (item.type === "stock" ? idx : -1))
          .filter((idx) => idx !== -1)
        if (stockIndexes.length === 0) return prev

        const targetIdx = stockIndexes[Math.floor(Math.random() * stockIndexes.length)]
        const target = prev[targetIdx]
        if (target.price === undefined) return prev

        const deltaPct = (Math.random() * 1.6 - 0.8) / 100
        const newPrice = Math.max(0.01, target.price * (1 + deltaPct))
        const priceDelta = newPrice - target.price
        const newChange = (target.change ?? 0) + priceDelta
        const openPrice = newPrice - newChange
        const newChangePercent = openPrice !== 0 ? (newChange / openPrice) * 100 : 0
        const direction: "up" | "down" = priceDelta >= 0 ? "up" : "down"

        setFlash((f) => ({ ...f, [target.id]: direction }))
        setTimeout(() => {
          setFlash((f) => {
            if (!(target.id in f)) return f
            const next = { ...f }
            delete next[target.id]
            return next
          })
        }, FLASH_DURATION_MS)

        const updated = [...prev]
        updated[targetIdx] = {
          ...target,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          color: newChange >= 0 ? "green" : "red",
        }
        return updated
      })
    }, JITTER_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  // Duplicate items for seamless loop
  const tickerItems = [...items, ...items]

  const handleTickerClick = (item: TickerItem) => {
    if (item.type === "nav" && item.sectionId && onNavigate) {
      onNavigate(item.sectionId)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-black to-black border-b border-amber-500/30 shadow-lg shadow-amber-500/10">
      {/* Header label */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs font-mono text-amber-400 uppercase tracking-widest pointer-events-none">
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
          {tickerItems.map((item, idx) => {
            const itemFlash = flash[item.id]
            return (
              <motion.div
                key={`${item.id}-${idx}`}
                className={`flex items-center gap-2 px-4 py-2 rounded border cursor-pointer transition-colors duration-700 whitespace-nowrap font-mono text-sm ${
                  item.type === "nav"
                    ? "border-transparent hover:border-amber-500/50 hover:bg-amber-500/10"
                    : "border-amber-500/20 hover:border-amber-500/70"
                } ${
                  itemFlash === "up"
                    ? "bg-emerald-500/25"
                    : itemFlash === "down"
                      ? "bg-red-500/25"
                      : hoveredId === item.id
                        ? "bg-amber-500/20 shadow-lg shadow-amber-500/30"
                        : "bg-black/40 hover:shadow-lg hover:shadow-amber-500/20"
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
                      ? "text-amber-300"
                      : item.color === "green"
                        ? "text-emerald-400"
                        : item.color === "red"
                          ? "text-red-400"
                          : item.color === "yellow"
                            ? "text-yellow-400"
                            : item.color === "orange"
                              ? "text-orange-400"
                              : "text-amber-400"
                  }`}
                >
                  {item.symbol}
                </span>

                {/* Price and change (stocks only) */}
                {item.type === "stock" && (
                  <>
                    <span className="text-white/70 text-xs tabular-nums">
                      ${item.price?.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-semibold tabular-nums ${
                        item.change! >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {item.change! >= 0 ? "+" : ""}
                      {item.change?.toFixed(2)} ({item.changePercent?.toFixed(1)}%)
                    </span>
                  </>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Right-side indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-mono text-amber-400/50 uppercase tracking-widest pointer-events-none">
        LIVE
      </div>
    </div>
  )
}
