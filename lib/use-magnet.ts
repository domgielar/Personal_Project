import { useRef, useState, useCallback } from "react"
import { useCursor } from "./cursor-context"

export interface UseMagnetConfig {
  strength?: number // 0-1, default 0.5
  radius?: number // pixels, default 100
  enabled?: boolean // default true
}

export function useMagnet(config: UseMagnetConfig = {}) {
  const { strength = 0.5, radius = 100, enabled = true } = config
  const { position } = useCursor()
  const elementRef = useRef<HTMLElement>(null)
  const [isNearby, setIsNearby] = useState(false)

  const calculateOffset = useCallback(() => {
    if (!elementRef.current || !enabled) {
      return { x: 0, y: 0 }
    }

    const rect = elementRef.current.getBoundingClientRect()
    const elementCenterX = rect.left + rect.width / 2
    const elementCenterY = rect.top + rect.height / 2

    const dx = position.x - elementCenterX
    const dy = position.y - elementCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < radius) {
      setIsNearby(true)
      const angle = Math.atan2(dy, dx)
      const force = strength * (1 - distance / radius)
      return {
        x: Math.cos(angle) * force * 20,
        y: Math.sin(angle) * force * 20,
      }
    } else {
      setIsNearby(false)
      return { x: 0, y: 0 }
    }
  }, [position, strength, radius, enabled])

  return {
    elementRef,
    isNearby,
    offset: calculateOffset(),
  }
}
