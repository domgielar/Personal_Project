"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export const SpotlightIbelick = React.forwardRef<HTMLDivElement, SpotlightProps>(
  ({ className, fill = "white" }, ref) => {
    const spotlightRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const container = spotlightRef.current?.parentElement
      if (!container) return

      containerRef.current = container as HTMLDivElement
      container.style.position = "relative"

      const handleMouseMove = (event: MouseEvent) => {
        if (!spotlightRef.current || !containerRef.current) return

        const { clientX, clientY } = event
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect()

        const x = clientX - left
        const y = clientY - top

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          spotlightRef.current.style.opacity = "1"
          spotlightRef.current.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, ${fill} 0%, transparent 80%)`
        } else {
          spotlightRef.current.style.opacity = "0"
        }
      }

      containerRef.current.addEventListener("mousemove", handleMouseMove)
      containerRef.current.addEventListener("mouseleave", () => {
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = "0"
        }
      })

      return () => {
        containerRef.current?.removeEventListener("mousemove", handleMouseMove)
      }
    }, [fill])

    return (
      <div
        ref={ref || spotlightRef}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0",
          className
        )}
      />
    )
  }
)

SpotlightIbelick.displayName = "SpotlightIbelick"
