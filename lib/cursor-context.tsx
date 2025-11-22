"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface CursorPosition {
  x: number
  y: number
  vx: number // velocity x
  vy: number // velocity y
}

interface CursorContextType {
  position: CursorPosition
  isMoving: boolean
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  })
  const [isMoving, setIsMoving] = useState(false)
  let lastX = position.x
  let lastY = position.y
  let moveTimeout: NodeJS.Timeout

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    setPosition(() => ({
      x,
      y,
      vx: x - lastX,
      vy: y - lastY,
    }))

    lastX = x
    lastY = y

    setIsMoving(true)
    clearTimeout(moveTimeout)
    moveTimeout = setTimeout(() => setIsMoving(false), 100)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(moveTimeout)
    }
  }, [handleMouseMove])

  return (
    <CursorContext.Provider value={{ position, isMoving }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error("useCursor must be used within CursorProvider")
  }
  return context
}
