"use client"

import React from "react"
import { IntroOverlay } from "@/components/intro-overlay"
import { TickerBar } from "@/components/ticker-bar"
import { ProfilePanel } from "@/components/profile-panel"
import { WorkPanel } from "@/components/work-panel"
import { ProjectsPanel } from "@/components/projects-panel"
import { ResumePanel } from "@/components/resume-panel"
import { motion } from "framer-motion"

export default function Home() {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="w-full min-h-screen bg-black">
      {/* Intro overlay */}
      <IntroOverlay
        onComplete={() => {}}
        duration={2000}
      />

      {/* Ticker bar */}
      <TickerBar onNavigate={handleNavigate} />

      {/* Main content with top padding for ticker */}
      <div className="pt-16">
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
            <h1 className="text-5xl md:text-6xl font-mono font-bold text-transparent bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 bg-clip-text">
              DOMINIK GIELAROWIEC
            </h1>
            <p className="text-lime-400/70 font-mono text-lg">
              CS + Economics Student · AI & FinTech Builder
            </p>
            <p className="text-white/60 font-mono text-sm leading-relaxed">
              Welcome to my trading terminal. Explore my experience, projects,
              and capabilities. Use the ticker navigation to jump between
              sections.
            </p>
            <div className="pt-8 flex justify-center gap-4">
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-lime-500 text-black font-mono font-bold uppercase tracking-widest rounded hover:shadow-lg hover:shadow-lime-500/50 transition-all"
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
              className="text-4xl md:text-5xl font-mono font-bold text-lime-400 mb-12 text-center uppercase tracking-wider"
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
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-lime-400 mb-12 text-center uppercase tracking-wider">
              EMPLOYMENT TIMELINE
            </h2>

            {/* Timeline */}
            <div className="space-y-8">
              {[
                {
                  year: "2023-2024",
                  company: "Cornerstone Bank",
                  role: "Bank Teller Associate",
                  description:
                    "Processed $2M+ in transactions, served 500+ customers with 99% accuracy. Developed strong customer service and attention to detail.",
                },
                {
                  year: "2022-Present",
                  company: "UMass Amherst",
                  role: "CS + Economics Student",
                  description:
                    "Double major with focus on system design, algorithms, and financial markets. 3.7+ GPA, active in hackathons.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="border-l-2 border-lime-500/50 pl-6 py-4 hover:border-lime-500 transition-all"
                >
                  <div className="text-lime-400 font-mono text-sm font-bold uppercase">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-mono font-bold text-lime-300 mt-2">
                    {item.role}
                  </h3>
                  <div className="text-lime-400/60 font-mono text-sm mt-1">
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
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-lime-400 mb-12 text-center uppercase tracking-wider">
              PROJECT PORTFOLIO
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "AI Assistant Platform",
                  description:
                    "LLM-powered productivity tool with real-time market analysis integration.",
                  tech: ["Python", "LLM", "Next.js", "Finance APIs"],
                  status: "active",
                },
                {
                  name: "Finance Dashboard",
                  description:
                    "Real-time portfolio tracking and market visualization with data streaming.",
                  tech: ["React", "TypeScript", "WebSocket", "D3.js"],
                  status: "active",
                },
                {
                  name: "Web3 Marketplace",
                  description:
                    "Decentralized marketplace with smart contract integration and wallet support.",
                  tech: ["Solidity", "Web3.js", "React", "IPFS"],
                  status: "completed",
                },
                {
                  name: "Course Scheduler",
                  description:
                    "Full-stack scheduling app with conflict detection and optimization.",
                  tech: ["Next.js", "PostgreSQL", "React", "Tailwind"],
                  status: "active",
                },
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 border border-lime-500/30 bg-black/50 rounded hover:border-lime-500/70 hover:shadow-lg hover:shadow-lime-500/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lime-300 font-mono font-bold">
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
                        className="px-2 py-1 text-xs bg-lime-500/10 border border-lime-500/30 text-lime-300 rounded"
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
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-lime-400 uppercase tracking-wider">
              GET IN TOUCH
            </h2>

            <p className="text-white/60 font-mono text-sm leading-relaxed">
              Interested in collaborating or discussing opportunities? Reach out
              through any of these channels.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Email", value: "dom@example.com", href: "mailto:dom@example.com" },
                { label: "LinkedIn", value: "linkedin.com/in/dominik", href: "https://linkedin.com" },
                { label: "GitHub", value: "github.com/domgielar", href: "https://github.com" },
              ].map((contact, idx) => (
                <motion.a
                  key={idx}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border border-lime-500/30 bg-black/50 rounded hover:border-lime-500/70 hover:shadow-lg hover:shadow-lime-500/20 transition-all"
                >
                  <div className="text-lime-400/60 text-xs uppercase">
                    {contact.label}
                  </div>
                  <div className="text-lime-300 font-mono text-sm mt-2">
                    {contact.value}
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-black font-mono font-bold uppercase tracking-widest rounded hover:shadow-lg hover:shadow-lime-500/50 transition-all"
            >
              Back to Top
            </motion.button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="w-full py-8 px-4 border-t border-lime-500/20 text-center text-lime-400/50 text-xs font-mono uppercase tracking-widest">
          <p>
            © {new Date().getFullYear()} Dominik Gielarowiec · Trading Terminal
            Portfolio
          </p>
        </footer>
      </div>
    </main>
  )
}
