"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchGithubWireItems, WireItem } from "./github-activity"

export type ConnectionStatus = "connecting" | "live" | "error"

interface GithubActivityState {
  items: WireItem[]
  latencyMs: number | null
  status: ConnectionStatus
}

const POLL_INTERVAL_MS = 90_000

export function useGithubActivity() {
  const [state, setState] = useState<GithubActivityState>({
    items: [],
    latencyMs: null,
    status: "connecting",
  })

  const refresh = useCallback(async () => {
    try {
      const { items, latencyMs } = await fetchGithubWireItems()
      setState({ items, latencyMs, status: "live" })
    } catch {
      setState((prev) => ({ ...prev, status: "error" }))
    }
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [refresh])

  return state
}
