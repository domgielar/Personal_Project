"use client"

import React, { useState } from "react"
import { IntroOverlay } from "@/components/intro-overlay"
import { TickerBar } from "@/components/ticker-bar"
import { StatusBar } from "@/components/status-bar"
import { CommandLine } from "@/components/command-line"
import { FunctionKeyBar } from "@/components/function-key-bar"
import { ProfilePanel } from "@/components/profile-panel"
import { WorkPanel } from "@/components/work-panel"
import { ProjectsPanel } from "@/components/projects-panel"
import { ResumePanel } from "@/components/resume-panel"
import { NewsWirePanel } from "@/components/news-wire-panel"
import { AnimEasterEgg } from "@/components/anim-easter-egg"
import { TetrisEasterEgg } from "@/components/tetris-easter-egg"
import { useGithubActivity } from "@/lib/use-github-activity"
import { motion } from "framer-motion"

export default function Home() {
  const github = useGithubActivity()
  const [easterEgg, setEasterEgg] = useState<"anim" | "tetris" | null>(null)

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="w-full min-h-screen bg-black">
      {/* Intro overlay */}
      <IntroOverlay />

      {/* Easter eggs */}
      {easterEgg === "anim" && <AnimEasterEgg onClose={() => setEasterEgg(null)} />}
      {easterEgg === "tetris" && <TetrisEasterEgg onClose={() => setEasterEgg(null)} />}

      {/* Ticker bar */}
      <TickerBar onNavigate={handleNavigate} />

      {/* Status bar: world clocks + connection/latency */}
      <StatusBar latencyMs={github.latencyMs} status={github.status} />

      {/* Command line strip */}
      <CommandLine onNavigate={handleNavigate} onEasterEgg={setEasterEgg} />

      {/* Function key bar */}
      <FunctionKeyBar onNavigate={handleNavigate} />

      {/* Main content with top padding for ticker + status bar + command line, bottom padding for function keys */}
      <div className="pt-32 pb-12">
        {/* HOME SECTION */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 py-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center space-y-6 max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text">
              DOMINIK GIELAROWIEC
            </h1>
            <p className="text-amber-400/70 font-mono text-lg">
              Full-Stack Developer · CS + Economics Student
            </p>
            <p className="text-white/60 font-mono text-sm leading-relaxed">
              Welcome to my trading terminal. Explore my experience, projects,
              and capabilities. Use the ticker navigation to jump between
              sections.
            </p>
            <div className="pt-8 flex justify-center gap-4">
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-amber-500 text-black font-mono font-bold uppercase tracking-widest rounded hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                Start Exploring
              </button>
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION - PANELS GRID */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="w-full max-w-6xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-mono font-bold text-amber-400 mb-12 text-center uppercase tracking-wider"
            >
              TERMINAL DASHBOARD
            </motion.h2>

            {/* Grid layout: 2 columns on desktop */}
            <div className="grid lg:grid-cols-2 gap-8">
              <ProfilePanel />
              <WorkPanel />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-8">
              <ProjectsPanel />
              <ResumePanel />
            </div>

            <div id="wire" className="mt-8">
              <NewsWirePanel githubItems={github.items} status={github.status} />
            </div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section
          id="work"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-amber-400 mb-12 text-center uppercase tracking-wider">
              EDUCATION & EXPERIENCE
            </h2>

            {/* Timeline */}
            <div className="space-y-8">
              {[
                {
                  year: "Graduating 2028",
                  company: "University of Massachusetts Amherst",
                  role: "B.S. Computer Science & Economics",
                  description:
                    "Related coursework: Calculus 1, 2, 3, Linear Algebra, Macro Economics, Micro Economics, Data Structures and Algorithms, Statistics & Probability.",
                },
                {
                  year: "02/2026-Present",
                  company: "LVLnity (Remote)",
                  role: "Lead Full-Stack Developer",
                  description:
                    "Develop full-stack features using Next.js, TypeScript, and Firebase, implementing authentication and real-time data systems. Collaborate remotely to ship product updates and improve performance through iterative development.",
                },
                {
                  year: "02/2025-Present",
                  company: "Cornerstone Bank",
                  role: "Teller Intern → Customer Relations Associate → Customer Relations Specialist",
                  description:
                    "Manage client transactions and provide customer service, maintaining accuracy and compliance with KYC/AML banking regulations. Gaining exposure to modern fintech workflows, digital banking systems, and customer-facing financial platforms.",
                },
                {
                  year: "—",
                  company: "Project Destined (Remote)",
                  role: "Private Equity Intern",
                  description:
                    "Selected for a competitive commercial real estate private equity training program; underwrote live multifamily deals using the Income, Sales Comparison, and Cost approaches to valuation. Built underwriting models projecting NOI, cap rates, and investment returns; presented a final investment recommendation to industry executives.",
                },
                {
                  year: "07/2023-09/2023",
                  company: "NoCam (Remote)",
                  role: "Business Development Intern",
                  description:
                    "Contributed to strategic initiatives to enhance user engagement and platform growth. Supported a pre-seed raise of $400,000, collaborating with advisors and mentors on go-to-market strategy, competitive analysis, and stakeholder communication.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="border-l-2 border-amber-500/50 pl-6 py-4 hover:border-amber-500 transition-all"
                >
                  <div className="text-amber-400 font-mono text-sm font-bold uppercase">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-mono font-bold text-amber-300 mt-2">
                    {item.role}
                  </h3>
                  <div className="text-amber-400/60 font-mono text-sm mt-1">
                    @ {item.company}
                  </div>
                  <p className="text-white/60 text-sm mt-3">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-amber-400 mb-12 text-center uppercase tracking-wider">
              PROJECT PORTFOLIO
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Personal Portfolio — Bloomberg Style",
                  description:
                    "This site — a Bloomberg-style trading terminal portfolio with a live market ticker, terminal boot-up animation, and interactive dashboard UI. Built with GitHub Copilot + Cursor for a fully typed, 60fps, production-ready architecture.",
                  tech: ["Next.js 14", "TypeScript", "Tailwind", "Framer Motion"],
                  status: "active",
                },
                {
                  name: "Hiring Manager Pro — HackHer 2026 🏆 Winner",
                  description:
                    "Unity hiring simulation using reinforcement learning concepts to generate candidates and evaluate hiring decisions across performance, bias, and team metrics, with a statistical scoring system modeling team chemistry.",
                  tech: ["Unity", "C#", "Reinforcement Learning"],
                  status: "completed",
                },
                {
                  name: "UDash — Hack UMass XIII",
                  description:
                    "Real-time order updates via web-scraping with Google Maps integration for dynamic locations. Engineered the onboarding pipeline, cutting checkout flow time by 30%.",
                  tech: ["React", "TypeScript", "Google Gemini", "Google Maps API"],
                  status: "completed",
                },
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 border border-amber-500/30 bg-black/50 rounded hover:border-amber-500/70 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-amber-300 font-mono font-bold">
                      {project.name}
                    </h3>
                    <span
                      className={`text-xs font-mono uppercase px-2 py-1 rounded ${
                        project.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-amber-400 uppercase tracking-wider">
              GET IN TOUCH
            </h2>

            <p className="text-white/60 font-mono text-sm leading-relaxed">
              Interested in collaborating or discussing opportunities? Reach out
              through any of these channels.
            </p>
            <p className="text-amber-400/50 font-mono text-xs uppercase tracking-widest">
              New York, NY
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  label: "Email",
                  value: "dominikgielarowiec@gmail.com",
                  href: "mailto:dominikgielarowiec@gmail.com",
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/dominik-gielarowiec",
                  href: "https://www.linkedin.com/in/dominik-gielarowiec-76959427a/",
                },
                {
                  label: "GitHub",
                  value: "github.com/domgielar",
                  href: "https://github.com/domgielar",
                },
              ].map((contact, idx) => (
                <motion.a
                  key={idx}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border border-amber-500/30 bg-black/50 rounded hover:border-amber-500/70 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                >
                  <div className="text-amber-400/60 text-xs uppercase">
                    {contact.label}
                  </div>
                  <div className="text-amber-300 font-mono text-sm mt-2">
                    {contact.value}
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-mono font-bold uppercase tracking-widest rounded hover:shadow-lg hover:shadow-amber-500/50 transition-all"
            >
              Back to Top
            </motion.button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="w-full py-8 px-4 border-t border-amber-500/20 text-center text-amber-400/50 text-xs font-mono uppercase tracking-widest">
          <p>
            © {new Date().getFullYear()} Dominik Gielarowiec · Trading Terminal
            Portfolio
          </p>
        </footer>
      </div>
    </main>
  )
}
