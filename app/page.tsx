"use client"

import React, { useState } from "react"
import { AnimatedShaderHero } from "@/components/ui/animated-shader-hero"
import { SplineScene } from "@/components/ui/spline-scene"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpotlightIbelick } from "@/components/ui/spotlight-ibelick"
import { MagnetizeButton } from "@/components/ui/magnetize-button"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Brain,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Zap,
} from "lucide-react"

export default function Home() {
  const [scrolledToSection, setScrolledToSection] = useState("")

  return (
    <main className="w-full bg-black">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              DG
            </div>
            <div className="hidden md:flex gap-8">
              {["Home", "About", "Work", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="w-full">
        <AnimatedShaderHero
          trustBadge={{
            text: "Trusted by builders and creators.",
            icons: ["🚀"],
          }}
          headline={{
            line1: "Building at the",
            line2: "Edge of AI & Finance",
          }}
          subtitle="UMass Amherst CS + Economics student. Cornerstone Bank experience. Passionate about AI, fintech, and crafting products that shape the future. Let's build something extraordinary."
          buttons={{
            primary: {
              text: "View My Work",
              onClick: () =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
            secondary: {
              text: "Contact Me",
              onClick: () =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" }),
            },
          }}
        />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="w-full py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            About Me
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Education */}
            <Card className="relative overflow-hidden group border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <SpotlightIbelick fill="rgba(168, 85, 247, 0.3)" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-violet-400" />
                  <CardTitle className="text-xl">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-white/70">
                <p className="text-sm leading-relaxed">
                  <strong>UMass Amherst</strong>
                  <br />
                  Double Major: Computer Science & Economics
                  <br />
                  <span className="text-xs text-white/50 mt-2 block">
                    Focused on systems, algorithms, and financial markets
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Professional Experience */}
            <Card className="relative overflow-hidden group border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <SpotlightIbelick fill="rgba(168, 85, 247, 0.3)" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                  <CardTitle className="text-xl">Experience</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-white/70">
                <p className="text-sm leading-relaxed">
                  <strong>Cornerstone Bank</strong> (~$6B regional institution)
                  <br />
                  Bank Teller Associate/Intern
                  <br />
                  <span className="text-xs text-white/50 mt-2 block">
                    High-touch customer service, transactions, and financial
                    operations
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Interests */}
            <Card className="relative overflow-hidden group border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <SpotlightIbelick fill="rgba(168, 85, 247, 0.3)" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <CardTitle className="text-xl">Passions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-white/70">
                <p className="text-sm leading-relaxed">
                  AI, machine learning, fintech, product building
                  <br />
                  <span className="text-xs text-white/50 mt-2 block">
                    Hackathons, side projects, and shipping features that
                    matter
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Full-width about text */}
          <Card className="relative overflow-hidden border-white/10 bg-white/5">
            <SpotlightIbelick fill="rgba(168, 85, 247, 0.2)" />
            <CardContent className="p-8">
              <p className="text-white/80 leading-relaxed">
                I'm a second-year student at UMass Amherst, double-majoring in
                Computer Science and Economics. My academic journey has given me
                a unique perspective on tech and finance — I understand both the
                engineering complexity of building systems and the strategic
                thinking behind markets and products.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                At Cornerstone Bank, I developed strong customer service skills
                and gained exposure to real-world financial operations, handling
                high volumes of transactions and customer interactions with
                attention to detail and integrity.
              </p>
              <p className="text-white/80 leading-relaxed mt-4">
                My real passion lies in the intersection of AI, finance, and
                product development. I love experimenting with new technologies,
                participating in hackathons, and building tools that solve
                real problems. I'm career-driven and always seeking
                opportunities to learn, collaborate, and make an impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WORK / PROJECTS SECTION */}
      <section id="work" className="w-full py-24 px-4 bg-gradient-to-b from-black to-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Projects & Experiments
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 3D Spline Section */}
            <Card className="relative overflow-hidden border-white/10 bg-white/5 h-96">
              <SpotlightIbelick fill="rgba(168, 85, 247, 0.3)" />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </Card>

            {/* Projects Grid */}
            <div className="space-y-6">
              {[
                {
                  title: "AI-Powered Tools",
                  description:
                    "Exploring machine learning applications for productivity and automation.",
                  tech: ["Python", "ML", "APIs"],
                  icon: Brain,
                },
                {
                  title: "HackUMass Projects",
                  description:
                    "Rapid prototyping and full-stack development in fast-paced hackathon environments.",
                  tech: ["React", "TypeScript", "Web3"],
                  icon: Code2,
                },
                {
                  title: "Finance Dashboards",
                  description:
                    "Real-time market data visualization and portfolio tracking tools.",
                  tech: ["React", "D3.js", "APIs"],
                  icon: Zap,
                },
              ].map((project, idx) => {
                const Icon = project.icon
                return (
                  <Card
                    key={idx}
                    className="relative overflow-hidden group border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <SpotlightIbelick fill="rgba(168, 85, 247, 0.2)" />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Icon className="w-5 h-5 text-violet-400" />
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full py-24 px-4 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-white/70 mb-12 text-lg">
            Whether you want to collaborate, have an opportunity, or just chat
            about AI and finance, I'd love to hear from you.
          </p>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:dom@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Magnetize CTA Button */}
          <div className="flex justify-center">
            <MagnetizeButton particleCount={14} attractRadius={50}>
              <span>Let's Talk</span>
            </MagnetizeButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 px-4 border-t border-white/10 text-center text-white/50 text-sm">
        <p>
          © {new Date().getFullYear()} Dominik Gielarowiec. All rights
          reserved.
        </p>
      </footer>
    </main>
  )
}
