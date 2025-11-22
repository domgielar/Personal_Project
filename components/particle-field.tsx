"use client"

import React, { useEffect, useRef } from "react"
import { useCursor } from "@/lib/cursor-context"

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  friction: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { position } = useCursor()
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  const PARTICLE_COUNT = 80
  const ATTRACTION_RADIUS = 150
  const ATTRACTION_STRENGTH = 0.15
  const FRICTION = 0.92
  const RETURN_SPEED = 0.08

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create random particles across canvas
    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        friction: FRICTION,
      })
    }
    particlesRef.current = particles

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current

      particles.forEach((particle) => {
        // Calculate distance to cursor
        const dx = position.x - particle.x
        const dy = position.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply attraction force if within radius
        if (distance < ATTRACTION_RADIUS) {
          const angle = Math.atan2(dy, dx)
          const force =
            ATTRACTION_STRENGTH * (1 - distance / ATTRACTION_RADIUS)
          particle.vx += Math.cos(angle) * force
          particle.vy += Math.sin(angle) * force
        }

        // Return to base position
        const returnDx = particle.baseX - particle.x
        const returnDy = particle.baseY - particle.y
        particle.vx += returnDx * RETURN_SPEED
        particle.vy += returnDy * RETURN_SPEED

        // Apply friction
        particle.vx *= particle.friction
        particle.vy *= particle.friction

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Keep particles in bounds
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.5
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.5
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }
      })

      // Draw particles
      ctx.fillStyle = "rgba(139, 92, 246, 0.4)"
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.globalAlpha = 1 - distance / 100
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [position])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 mix-blend-screen"
    />
  )
}
