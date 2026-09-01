"use client"

import React, { useEffect, useRef } from "react"

interface AnimEasterEggProps {
  onClose: () => void
}

const CHARS = "01DOMGIELAROWIEC$%&#@*+=-<>/\\"
const FONT_SIZE = 16
const TICK_MS = 45

export function AnimEasterEgg({ onClose }: AnimEasterEggProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let drops: number[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columns = Math.floor(canvas.width / FONT_SIZE)
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -40))
    }
    resize()
    window.addEventListener("resize", resize)

    const tick = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillStyle = Math.random() > 0.95 ? "#fde68a" : "#f59e0b"
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE)
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(tick, TICK_MS)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[997] bg-black cursor-pointer" onClick={onClose}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 text-amber-400/60 text-xs font-mono uppercase tracking-widest">
        ANIM &lt;GO&gt;
      </div>
      <div className="absolute bottom-4 right-4 text-amber-400/50 text-xs font-mono uppercase tracking-widest">
        click or esc to exit
      </div>
    </div>
  )
}
