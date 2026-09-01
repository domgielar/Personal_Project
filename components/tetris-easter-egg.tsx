"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

interface TetrisEasterEggProps {
  onClose: () => void
}

const COLS = 10
const ROWS = 18
const TICK_MS = 500

type Cell = string | null
type Board = Cell[][]

const SHAPES: Record<string, { matrix: number[][]; color: string }> = {
  I: { matrix: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: "#f59e0b" },
  O: { matrix: [[1,1],[1,1]], color: "#fb923c" },
  T: { matrix: [[0,1,0],[1,1,1],[0,0,0]], color: "#facc15" },
  S: { matrix: [[0,1,1],[1,1,0],[0,0,0]], color: "#34d399" },
  Z: { matrix: [[1,1,0],[0,1,1],[0,0,0]], color: "#f87171" },
  J: { matrix: [[1,0,0],[1,1,1],[0,0,0]], color: "#fcd34d" },
  L: { matrix: [[0,0,1],[1,1,1],[0,0,0]], color: "#fdba74" },
}
const SHAPE_KEYS = Object.keys(SHAPES)

interface ActivePiece {
  matrix: number[][]
  color: string
  x: number
  y: number
}

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null))
}

function randomPiece(): ActivePiece {
  const key = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]
  const { matrix, color } = SHAPES[key]
  return { matrix, color, x: Math.floor((COLS - matrix.length) / 2), y: -1 }
}

function rotateMatrix(matrix: number[][]): number[][] {
  const n = matrix.length
  const result = Array.from({ length: n }, () => Array(n).fill(0))
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      result[x][n - 1 - y] = matrix[y][x]
    }
  }
  return result
}

function collides(board: Board, matrix: number[][], x: number, y: number): boolean {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!matrix[row][col]) continue
      const boardX = x + col
      const boardY = y + row
      if (boardX < 0 || boardX >= COLS || boardY >= ROWS) return true
      if (boardY >= 0 && board[boardY][boardX]) return true
    }
  }
  return false
}

function merge(board: Board, piece: ActivePiece): Board {
  const next = board.map((row) => [...row])
  piece.matrix.forEach((row, ry) => {
    row.forEach((cell, rx) => {
      if (!cell) return
      const boardY = piece.y + ry
      const boardX = piece.x + rx
      if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
        next[boardY][boardX] = piece.color
      }
    })
  })
  return next
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const remaining = board.filter((row) => row.some((cell) => !cell))
  const cleared = ROWS - remaining.length
  const newRows = Array.from({ length: cleared }, () => Array<Cell>(COLS).fill(null))
  return { board: [...newRows, ...remaining], cleared }
}

export function TetrisEasterEgg({ onClose }: TetrisEasterEggProps) {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [piece, setPiece] = useState<ActivePiece>(randomPiece)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const pieceRef = useRef(piece)
  const boardRef = useRef(board)
  const gameOverRef = useRef(gameOver)

  pieceRef.current = piece
  boardRef.current = board
  gameOverRef.current = gameOver

  const lockPiece = useCallback(() => {
    const merged = merge(boardRef.current, pieceRef.current)
    const { board: clearedBoard, cleared } = clearLines(merged)
    if (cleared > 0) setScore((s) => s + cleared * 100)

    const next = randomPiece()
    if (collides(clearedBoard, next.matrix, next.x, next.y)) {
      setBoard(clearedBoard)
      setGameOver(true)
      return
    }
    setBoard(clearedBoard)
    setPiece(next)
  }, [])

  const step = useCallback(
    (dy: number) => {
      const p = pieceRef.current
      const nextY = p.y + dy
      if (!collides(boardRef.current, p.matrix, p.x, nextY)) {
        setPiece({ ...p, y: nextY })
        return true
      }
      if (dy > 0) lockPiece()
      return false
    },
    [lockPiece]
  )

  const move = useCallback((dx: number) => {
    const p = pieceRef.current
    const nextX = p.x + dx
    if (!collides(boardRef.current, p.matrix, nextX, p.y)) {
      setPiece({ ...p, x: nextX })
    }
  }, [])

  const rotate = useCallback(() => {
    const p = pieceRef.current
    const rotated = rotateMatrix(p.matrix)
    for (const kick of [0, -1, 1, -2, 2]) {
      if (!collides(boardRef.current, rotated, p.x + kick, p.y)) {
        setPiece({ ...p, matrix: rotated, x: p.x + kick })
        return
      }
    }
  }, [])

  const hardDrop = useCallback(() => {
    let p = pieceRef.current
    let y = p.y
    while (!collides(boardRef.current, p.matrix, p.x, y + 1)) y++
    setPiece({ ...p, y })
    pieceRef.current = { ...p, y }
    lockPiece()
  }, [lockPiece])

  const restart = useCallback(() => {
    setBoard(emptyBoard())
    setPiece(randomPiece())
    setScore(0)
    setGameOver(false)
  }, [])

  // Gravity tick
  useEffect(() => {
    if (gameOver) return
    const interval = setInterval(() => step(1), TICK_MS)
    return () => clearInterval(interval)
  }, [gameOver, step])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (gameOverRef.current) {
        if (e.key === "r" || e.key === "R") restart()
        return
      }
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          move(-1)
          break
        case "ArrowRight":
          e.preventDefault()
          move(1)
          break
        case "ArrowDown":
          e.preventDefault()
          step(1)
          break
        case "ArrowUp":
          e.preventDefault()
          rotate()
          break
        case " ":
          e.preventDefault()
          hardDrop()
          break
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [move, step, rotate, hardDrop, restart, onClose])

  // Compose board + active piece for render
  const displayBoard = merge(board, piece)

  return (
    <div className="fixed inset-0 z-[997] bg-black/95 flex flex-col items-center justify-center font-mono">
      <div className="text-amber-400 text-xs uppercase tracking-widest mb-3">
        TETRIS &lt;GO&gt; · SCORE {score}
      </div>

      <div
        className="grid border-2 border-amber-500/50 bg-black"
        style={{ gridTemplateColumns: `repeat(${COLS}, 18px)`, gridTemplateRows: `repeat(${ROWS}, 18px)` }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className="border border-white/5"
              style={{ backgroundColor: cell ?? "transparent" }}
            />
          ))
        )}
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <div className="text-red-400 text-sm uppercase tracking-widest font-bold">Game Over</div>
          <div className="text-amber-400/60 text-xs mt-1 uppercase tracking-widest">Press R to restart</div>
        </div>
      )}

      <div className="mt-4 text-amber-400/40 text-[10px] uppercase tracking-widest text-center">
        ← → move · ↑ rotate · ↓ soft drop · space hard drop · esc exit
      </div>
    </div>
  )
}
