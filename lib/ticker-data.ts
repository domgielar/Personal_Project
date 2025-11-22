export type TickerItemType = "stock" | "nav"

export interface TickerItem {
  id: string
  type: TickerItemType
  symbol: string
  label: string
  price?: number
  change?: number
  changePercent?: number
  color?: "green" | "red" | "yellow" | "orange" | "lime"
  sectionId?: string
}

export const TICKER_ITEMS: TickerItem[] = [
  // Navigation items
  {
    id: "nav-home",
    type: "nav",
    symbol: "HOME",
    label: "HOME",
    color: "lime",
    sectionId: "home",
  },
  // Fake stocks / indicators
  {
    id: "stock-dom",
    type: "stock",
    symbol: "DOM",
    label: "Dominik Index",
    price: 847.32,
    change: 12.5,
    changePercent: 1.5,
    color: "green",
  },
  {
    id: "stock-csai",
    type: "stock",
    symbol: "CSAI",
    label: "CS + AI Fund",
    price: 2341.15,
    change: 45.8,
    changePercent: 2.0,
    color: "green",
  },
  // Navigation items
  {
    id: "nav-about",
    type: "nav",
    symbol: "ABOUT",
    label: "ABOUT",
    color: "yellow",
    sectionId: "about",
  },
  // Fake stocks
  {
    id: "stock-econ",
    type: "stock",
    symbol: "ECON",
    label: "Economy Fund",
    price: 1523.67,
    change: -8.2,
    changePercent: -0.5,
    color: "red",
  },
  {
    id: "stock-fintech",
    type: "stock",
    symbol: "FINTECH",
    label: "FinTech Index",
    price: 3204.89,
    change: 156.2,
    changePercent: 5.1,
    color: "green",
  },
  // Navigation
  {
    id: "nav-work",
    type: "nav",
    symbol: "WORK",
    label: "WORK",
    color: "orange",
    sectionId: "work",
  },
  // Fake stocks
  {
    id: "stock-build",
    type: "stock",
    symbol: "BUILD",
    label: "Builder Index",
    price: 892.14,
    change: 23.6,
    changePercent: 2.7,
    color: "green",
  },
  {
    id: "stock-hack",
    type: "stock",
    symbol: "HACK",
    label: "Hackathon Fund",
    price: 1145.23,
    change: 67.3,
    changePercent: 6.3,
    color: "green",
  },
  // Navigation
  {
    id: "nav-projects",
    type: "nav",
    symbol: "PROJECTS",
    label: "PROJECTS",
    color: "lime",
    sectionId: "projects",
  },
  // Fake stocks
  {
    id: "stock-ai",
    type: "stock",
    symbol: "AI",
    label: "Artificial Intelligence",
    price: 4512.67,
    change: 234.8,
    changePercent: 5.5,
    color: "green",
  },
  {
    id: "stock-web",
    type: "stock",
    symbol: "WEB3",
    label: "Web3 Portfolio",
    price: 621.45,
    change: -45.2,
    changePercent: -6.8,
    color: "red",
  },
  // Navigation
  {
    id: "nav-contact",
    type: "nav",
    symbol: "CONTACT",
    label: "CONTACT",
    color: "yellow",
    sectionId: "contact",
  },
  // Final stock
  {
    id: "stock-dgx",
    type: "stock",
    symbol: "DGX",
    label: "Dominik Stock",
    price: 5234.12,
    change: 312.4,
    changePercent: 6.3,
    color: "green",
  },
]

export const SECTIONS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
]
