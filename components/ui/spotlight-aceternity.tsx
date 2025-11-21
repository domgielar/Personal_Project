"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export const SpotlightAceternity = React.forwardRef<
  HTMLDivElement,
  SpotlightProps
>(({ className, fill = "white" }, ref) => {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!spotlightRef.current) return

      const { clientX, clientY } = event
      spotlightRef.current.style.background = `radial-gradient(circle 600px at ${clientX}px ${clientY}px, rgba(255,255,255,.1), transparent 80%)`
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={ref || spotlightRef}
      className={cn(
        "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
        className
      )}
    />
  )
})

SpotlightAceternity.displayName = "SpotlightAceternity"
