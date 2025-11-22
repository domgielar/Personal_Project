"use client"

import React, { useEffect, useRef, useState } from "react"
import { useCursor } from "@/lib/cursor-context"

export interface SpotlightProps {
  fill?: string
  size?: number
  follow?: boolean // If true, follows cursor globally
  containerRef?: React.RefObject<HTMLElement>
  className?: string
}

export function Spotlight({
  fill = "white",
  size = 400,
  follow = false,
  containerRef,
  className = "",
}: SpotlightProps) {
  const spotRef = useRef<HTMLDivElement>(null)
  const { position } = useCursor()
  const [localPosition, setLocalPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!follow || !containerRef?.current) return

    // Use cursor position directly for global tracking
    const rect = containerRef.current.getBoundingClientRect()
    setLocalPosition({
      x: position.x - rect.left,
      y: position.y - rect.top,
    })
    setIsVisible(true)
  }, [position, follow, containerRef])

  // For local container tracking (when not following global cursor)
  useEffect(() => {
    if (follow || !containerRef?.current) return

    const container = containerRef.current
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setLocalPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [follow, containerRef])

  return (
    <div
      ref={spotRef}
      className={`pointer-events-none fixed ${className}`}
      style={{
        left: localPosition.x - size / 2,
        top: localPosition.y - size / 2,
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
        transition: isVisible ? "none" : "opacity 0.3s ease-out",
        background: `radial-gradient(circle, ${fill}20 0%, ${fill}10 40%, transparent 70%)`,
        filter: "blur(40px)",
        pointerEvents: "none",
      }}
    />
  )
}
