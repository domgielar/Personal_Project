const PAGE_WIDTH = 612
const MARGIN = 56
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

const AMBER: [number, number, number] = [180, 120, 20]
const INK: [number, number, number] = [30, 30, 30]
const MUTED: [number, number, number] = [110, 110, 110]

export async function generateResearchNote() {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF({ unit: "pt", format: "letter" })

  let y = MARGIN

  const rule = (color: [number, number, number] = AMBER, weight = 1.2) => {
    doc.setDrawColor(...color)
    doc.setLineWidth(weight)
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  }

  const heading = (text: string, size = 10) => {
    y += 18
    doc.setFont("courier", "bold")
    doc.setFontSize(size)
    doc.setTextColor(...AMBER)
    doc.text(text.toUpperCase(), MARGIN, y)
    y += 4
    rule(AMBER, 0.75)
    y += 12
  }

  const body = (text: string, size = 9.5, lineHeight = 13) => {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(size)
    doc.setTextColor(...INK)
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[]
    doc.text(lines, MARGIN, y)
    y += lines.length * lineHeight
  }

  const bullet = (text: string, size = 9.5, lineHeight = 13) => {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(size)
    doc.setTextColor(...INK)
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 14) as string[]
    doc.setTextColor(...AMBER)
    doc.text("›", MARGIN, y)
    doc.setTextColor(...INK)
    doc.text(lines, MARGIN + 14, y)
    y += lines.length * lineHeight
  }

  // Header
  doc.setFont("courier", "normal")
  doc.setFontSize(8)
  doc.setTextColor(...MUTED)
  doc.text("EQUITY RESEARCH — INITIATING COVERAGE", MARGIN, y)
  doc.text(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    PAGE_WIDTH - MARGIN,
    y,
    { align: "right" }
  )
  y += 22

  doc.setFont("courier", "bold")
  doc.setFontSize(20)
  doc.setTextColor(...INK)
  doc.text("DOMINIK GIELAROWIEC", MARGIN, y)
  y += 16

  doc.setFont("courier", "normal")
  doc.setFontSize(10)
  doc.setTextColor(...MUTED)
  doc.text("NASDAQ: DOM  ·  Full-Stack Developer / CS + Economics, UMass Amherst", MARGIN, y)
  y += 16
  rule(AMBER, 1.5)
  y += 18

  // Rating strip
  const cols = [
    { label: "RATING", value: "STRONG BUY" },
    { label: "12M PRICE TARGET", value: "$999,999+" },
    { label: "SECTOR", value: "FULL-STACK / FINTECH" },
  ]
  const colWidth = CONTENT_WIDTH / cols.length
  cols.forEach((col, i) => {
    const x = MARGIN + i * colWidth
    doc.setFont("courier", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(...MUTED)
    doc.text(col.label, x, y)
    doc.setFont("courier", "bold")
    doc.setFontSize(11)
    doc.setTextColor(...AMBER)
    doc.text(col.value, x, y + 14)
  })
  y += 30

  // Investment thesis
  heading("Investment Thesis")
  body(
    "Dominik Gielarowiec is a CS + Economics student at UMass Amherst (Class of 2028) who operates at the " +
      "intersection of software and capital. Currently Lead Full-Stack Developer at LVLnity, shipping production " +
      "features in Next.js and Firebase, while maintaining hands-on banking exposure at Cornerstone Bank across " +
      "KYC/AML-regulated client workflows. Track record includes two hackathon builds, one outright win, and a " +
      "self-directed production portfolio (this document's delivery mechanism)."
  )
  y += 4

  // Key catalysts
  heading("Key Catalysts")
  bullet("HackHer 2026 — Hiring Manager Pro wins 1st place (Unity + C#, reinforcement-learning hiring simulation).")
  bullet("Hack UMass XIII — UDash ships with live web-scraped order updates and Google Maps integration; onboarding pipeline cuts checkout flow time by 30%.")
  bullet("LVLnity — promoted into Lead Full-Stack Developer, owns auth and real-time data systems end to end.")
  bullet("Prior PE underwriting reps (Project Destined) translate directly into product judgment around unit economics and risk.")
  y += 4

  // Financial highlights (skills, framed as a financials table)
  heading("Financial Highlights (Skill Base)")
  const skillRows: [string, string][] = [
    ["Programming", "Python, JavaScript, Java, C++, Swift, SQL, HTML/CSS"],
    ["Tools", "React, Git, Pandas, NumPy, OpenCV, AWS"],
    ["Concepts", "OOP, Data Structures, Algorithms, CRM Operations"],
    ["Languages", "English, Polish (Fluent), Spanish (Elementary)"],
  ]
  skillRows.forEach(([label, value]) => {
    doc.setFont("courier", "bold")
    doc.setFontSize(9)
    doc.setTextColor(...AMBER)
    doc.text(label.toUpperCase(), MARGIN, y)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...INK)
    const lines = doc.splitTextToSize(value, CONTENT_WIDTH - 110) as string[]
    doc.text(lines, MARGIN + 110, y)
    y += Math.max(13, lines.length * 13)
  })
  y += 4

  // Coverage history (experience)
  heading("Coverage History")
  const experience: [string, string][] = [
    ["02/2026–Present", "LVLnity (Remote) — Lead Full-Stack Developer"],
    ["02/2025–Present", "Cornerstone Bank — Teller Intern → Customer Relations Specialist"],
    ["07/2023–09/2023", "NoCam (Remote) — Business Development Intern"],
    ["—", "Project Destined (Remote) — Private Equity Intern"],
  ]
  experience.forEach(([date, role]) => {
    doc.setFont("courier", "normal")
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTED)
    doc.text(date, MARGIN, y)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...INK)
    const lines = doc.splitTextToSize(role, CONTENT_WIDTH - 100) as string[]
    doc.text(lines, MARGIN + 100, y)
    y += Math.max(13, lines.length * 13)
  })
  y += 4

  // Education
  heading("Education")
  body("University of Massachusetts Amherst — B.S. Computer Science & Economics, Graduating 2028.")
  body(
    "Related coursework: Calculus 1–3, Linear Algebra, Macro Economics, Micro Economics, Data Structures and " +
      "Algorithms, Statistics & Probability.",
    9,
    12
  )

  // Footer / disclaimer
  const footerY = 740
  doc.setDrawColor(...AMBER)
  doc.setLineWidth(0.75)
  doc.line(MARGIN, footerY - 14, PAGE_WIDTH - MARGIN, footerY - 14)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(6.5)
  doc.setTextColor(...MUTED)
  const disclaimer = doc.splitTextToSize(
    "This report is not investment advice. Past performance (GPA 3.5, 2x hackathon appearances) is not " +
      "indicative of future results. The subject of this coverage is a student, not a registered investment " +
      "advisor, and this document is a portfolio artifact, not a solicitation. Contact: dominikgielarowiec@gmail.com" +
      " · github.com/domgielar",
    CONTENT_WIDTH
  ) as string[]
  doc.text(disclaimer, MARGIN, footerY)

  doc.save("Dominik-Gielarowiec-Research-Note.pdf")
}
