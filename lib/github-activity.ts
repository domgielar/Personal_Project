export type WireSource = "GH" | "REL"

export interface WireItem {
  id: string
  source: WireSource
  headline: string
  timestamp: string
  href?: string
}

const GITHUB_USERNAME = "domgielar"

interface GithubEvent {
  id: string
  type: string
  created_at: string
  repo?: { name: string }
  payload?: Record<string, any>
}

function repoName(event: GithubEvent) {
  return event.repo?.name?.replace(`${GITHUB_USERNAME}/`, "") ?? event.repo?.name ?? "unknown"
}

function repoHref(event: GithubEvent) {
  return event.repo?.name ? `https://github.com/${event.repo.name}` : undefined
}

function mapGithubEvent(event: GithubEvent): WireItem | null {
  const repo = repoName(event)
  const href = repoHref(event)
  const base = { id: event.id, source: "GH" as const, timestamp: event.created_at }

  switch (event.type) {
    case "PushEvent": {
      const count = event.payload?.commits?.length ?? 1
      return { ...base, href, headline: `Pushed ${count} commit${count === 1 ? "" : "s"} to ${repo}` }
    }
    case "CreateEvent": {
      const refType = event.payload?.ref_type
      if (refType === "repository") return { ...base, href, headline: `Created repository ${repo}` }
      if (refType === "branch") return { ...base, href, headline: `Created branch ${event.payload?.ref} in ${repo}` }
      return null
    }
    case "PullRequestEvent": {
      const action = event.payload?.action
      const title = event.payload?.pull_request?.title
      return {
        ...base,
        href: event.payload?.pull_request?.html_url ?? href,
        headline: `${action === "opened" ? "Opened" : action} PR in ${repo}${title ? `: ${title}` : ""}`,
      }
    }
    case "IssuesEvent": {
      const action = event.payload?.action
      const title = event.payload?.issue?.title
      return {
        ...base,
        href: event.payload?.issue?.html_url ?? href,
        headline: `${action} issue in ${repo}${title ? `: ${title}` : ""}`,
      }
    }
    case "WatchEvent":
      return { ...base, href, headline: `Starred ${repo}` }
    case "ForkEvent":
      return { ...base, href, headline: `Forked ${repo}` }
    case "ReleaseEvent":
      return { ...base, href, headline: `Published release ${event.payload?.release?.tag_name ?? ""} in ${repo}`.trim() }
    case "PublicEvent":
      return { ...base, href, headline: `Made ${repo} public` }
    default:
      return null
  }
}

export async function fetchGithubWireItems(): Promise<{ items: WireItem[]; latencyMs: number }> {
  const start = performance.now()
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
    headers: { Accept: "application/vnd.github+json" },
  })
  const latencyMs = Math.round(performance.now() - start)

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`)
  }

  const data = (await res.json()) as GithubEvent[]
  const items = data
    .map(mapGithubEvent)
    .filter((item): item is WireItem => item !== null)
    .slice(0, 10)

  return { items, latencyMs }
}
