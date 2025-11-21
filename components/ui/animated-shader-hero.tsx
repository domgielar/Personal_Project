"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TrustBadge {
  text: string
  icons?: string[]
}

interface Headline {
  line1: string
  line2: string
}

interface ButtonConfig {
  text: string
  onClick?: () => void
}

interface HeroProps {
  trustBadge?: TrustBadge
  headline: Headline
  subtitle: string
  buttons?: {
    primary?: ButtonConfig
    secondary?: ButtonConfig
  }
  className?: string
}

const useShaderBackground = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2")
    if (!gl) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Vertex shader
    const vertexShader = `#version 300 es
    precision highp float;
    in vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }`

    // Fragment shader with animated gradient
    const fragmentShader = `#version 300 es
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    out vec4 outColor;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      
      // Create animated gradient
      vec3 col = vec3(0.1, 0.05, 0.15);
      col += vec3(sin(uv.x * 3.0 + time * 0.3) * 0.2, 
                   cos(uv.y * 3.0 + time * 0.25) * 0.2, 
                   sin((uv.x + uv.y) * 2.0 + time * 0.2) * 0.3);
      
      // Add circular gradients
      vec2 center1 = vec2(0.3 + sin(time * 0.2) * 0.1, 0.5 + cos(time * 0.15) * 0.1);
      vec2 center2 = vec2(0.7 + cos(time * 0.25) * 0.1, 0.5 + sin(time * 0.2) * 0.1);
      
      float d1 = distance(uv, center1);
      float d2 = distance(uv, center2);
      
      col += vec3(0.2, 0.1, 0.4) * (1.0 - d1 * 2.0);
      col += vec3(0.3, 0.15, 0.5) * (1.0 - d2 * 2.0);
      
      outColor = vec4(col, 1.0);
    }`

    const compile = (source: string, type: number) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
      }
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(vertexShader, gl.VERTEX_SHADER))
    gl.attachShader(program, compile(fragmentShader, gl.FRAGMENT_SHADER))
    gl.linkProgram(program)
    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, "resolution")
    const timeLocation = gl.getUniformLocation(program, "time")

    let startTime = Date.now()

    const render = () => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, (Date.now() - startTime) * 0.001)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
}

export const AnimatedShaderHero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useShaderBackground(canvasRef)

  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-black",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .hero-content {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .hero-content.trust-badge {
            animation-delay: 0.1s;
          }

          .hero-content.headline {
            animation-delay: 0.2s;
          }

          .hero-content.subtitle {
            animation-delay: 0.3s;
          }

          .hero-content.buttons {
            animation-delay: 0.4s;
          }
        `}</style>

        {/* Trust Badge */}
        {trustBadge && (
          <motion.div
            className="hero-content trust-badge mb-8 opacity-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              {trustBadge.icons?.map((icon, i) => (
                <span key={i} className="text-lg">
                  {icon}
                </span>
              ))}
              <span className="text-sm text-white/80">{trustBadge.text}</span>
            </div>
          </motion.div>
        )}

        {/* Headline */}
        <motion.div
          className="hero-content headline text-center mb-6 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
            {headline.line1}
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {headline.line2}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="hero-content subtitle text-center text-white/70 max-w-2xl mb-10 text-lg opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero-content buttons flex flex-col sm:flex-row gap-4 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {buttons?.primary && (
            <button
              onClick={buttons.primary.onClick}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              {buttons.primary.text}
            </button>
          )}
          {buttons?.secondary && (
            <button
              onClick={buttons.secondary.onClick}
              className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              {buttons.secondary.text}
            </button>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 text-center"
        >
          <div className="text-sm mb-2">Scroll to explore</div>
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

export default AnimatedShaderHero
