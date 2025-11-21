# Implementation Examples & Code Snippets

This file contains copy-paste-ready examples for common customizations.

## 1. Update Hero Section

**File**: `app/page.tsx` (Lines 50-65)

**Current**:
```tsx
<AnimatedShaderHero
  trustBadge={{
    text: "Trusted by forward-thinking teams.",
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
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }),
    },
    secondary: {
      text: "Contact Me",
      onClick: () =>
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
  }}
/>
```

**Example 1 - Tech Founder**:
```tsx
headline={{
  line1: "Building the Future",
  line2: "of Web3 & AI",
}}
subtitle="Full-stack developer passionate about decentralized systems and machine learning. Let's push the boundaries of what's possible."
buttons={{
  primary: { text: "See My Work" },
  secondary: { text: "Get in Touch" },
}}
```

**Example 2 - Product Designer**:
```tsx
headline={{
  line1: "Designing Experiences",
  line2: "That Matter",
}}
subtitle="Product designer obsessed with user delight and thoughtful interfaces. Specializing in SaaS, mobile, and web design."
buttons={{
  primary: { text: "View Portfolio" },
  secondary: { text: "Schedule a Call" },
}}
```

**Example 3 - Data Scientist**:
```tsx
headline={{
  line1: "Turning Data Into",
  line2: "Business Impact",
}}
subtitle="Data scientist & ML engineer transforming raw data into actionable insights. Experienced in analytics, forecasting, and predictive modeling."
buttons={{
  primary: { text: "View Projects" },
  secondary: { text: "Download Resume" },
}}
```

## 2. Update Social Links

**File**: `app/page.tsx` (Lines 280-305)

**Current**:
```tsx
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
```

**Updated with Real Links**:
```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
  <a
    href="mailto:dominik@example.com"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
  >
    <Mail className="w-4 h-4" />
    Email Me
  </a>
  <a
    href="https://linkedin.com/in/domgielar"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
  >
    <Linkedin className="w-4 h-4" />
    LinkedIn
  </a>
  <a
    href="https://github.com/domgielar"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
  >
    <Github className="w-4 h-4" />
    GitHub
  </a>
</div>
```

## 3. Add Custom Projects

**File**: `app/page.tsx` (Lines ~230)

**Current Projects Array**:
```tsx
{
  title: "AI-Powered Tools",
  description: "Exploring machine learning applications for productivity and automation.",
  tech: ["Python", "ML", "APIs"],
  icon: Brain,
},
```

**Example Projects to Add**:

### Project 1: AI Assistant
```tsx
{
  title: "AI Research Assistant",
  description: "Multi-document analyzer using embeddings and semantic search. Processes research papers and generates insights with citation tracking.",
  tech: ["Python", "OpenAI", "FastAPI", "React"],
  icon: Brain,
},
```

### Project 2: Finance Dashboard
```tsx
{
  title: "Real-Time Finance Dashboard",
  description: "Live stock market data visualization with portfolio tracking, alerts, and predictive analytics.",
  tech: ["React", "TypeScript", "TradingView API", "D3.js"],
  icon: Zap,
},
```

### Project 3: Hackathon Winner
```tsx
{
  title: "HackUMass Winner - SmartNote",
  description: "AI-powered note-taking app that auto-generates summaries, flashcards, and study guides using GPT-4.",
  tech: ["Next.js", "Tailwind", "Supabase", "OpenAI"],
  icon: Code2,
},
```

### Project 4: Open Source
```tsx
{
  title: "Open Source: DataViz Library",
  description: "Lightweight TypeScript library for building interactive data visualizations. 500+ GitHub stars.",
  tech: ["TypeScript", "D3.js", "npm"],
  icon: GitBranch,
},
```

### Project 5: Web3 Project
```tsx
{
  title: "NFT Marketplace",
  description: "Decentralized NFT trading platform with lazy minting, royalties, and DAO governance.",
  tech: ["Solidity", "Ethers.js", "Next.js", "IPFS"],
  icon: Zap,
},
```

## 4. Change Theme Colors

**File**: `app/globals.css` (Lines 1-10)

**Current Dark Theme**:
```css
:root {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --accent: 262.1 80% 50.4%;  /* Violet */
}
```

**Option 1 - Purple Theme**:
```css
:root {
  --accent: 280.9 97.3% 50.5%;  /* Purple */
}
```

**Option 2 - Blue Theme**:
```css
:root {
  --accent: 217.2 91.2% 59.8%;  /* Blue */
}
```

**Option 3 - Teal Theme**:
```css
:root {
  --accent: 174.4 90.3% 45.3%;  /* Teal */
}
```

**Option 4 - Orange Theme**:
```css
:root {
  --accent: 20.7 98.6% 55.3%;  /* Orange */
}
```

## 5. Customize About Section

**File**: `app/page.tsx` (Lines ~150)

**Current Structure**:
```tsx
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
    </p>
  </CardContent>
</Card>
```

**Update for Law Student**:
```tsx
<Card className="relative overflow-hidden group border-white/10 bg-white/5 hover:bg-white/10 transition-all">
  <SpotlightIbelick fill="rgba(168, 85, 247, 0.3)" />
  <CardHeader>
    <div className="flex items-center gap-2 mb-2">
      <Briefcase className="w-5 h-5 text-violet-400" />
      <CardTitle className="text-xl">Education</CardTitle>
    </div>
  </CardHeader>
  <CardContent className="text-white/70">
    <p className="text-sm leading-relaxed">
      <strong>Harvard Law School</strong>
      <br />
      Juris Doctor (J.D.) | Class of 2026
      <br />
      <span className="text-xs text-white/50 mt-2 block">
        Focus on Constitutional Law & Technology Policy
      </span>
    </p>
  </CardContent>
</Card>
```

**Update for Designer**:
```tsx
<Card className="relative overflow-hidden group border-white/10 bg-white/5 hover:bg-white/10 transition-all">
  <SpotlightIbelick fill="rgba(168, 85, 247, 0.3)" />
  <CardHeader>
    <div className="flex items-center gap-2 mb-2">
      <Sparkles className="w-5 h-5 text-violet-400" />
      <CardTitle className="text-xl">Expertise</CardTitle>
    </div>
  </CardHeader>
  <CardContent className="text-white/70">
    <p className="text-sm leading-relaxed">
      UI/UX Design, Motion Design, Design Systems
      <br />
      <span className="text-xs text-white/50 mt-2 block">
        Figma, Framer, Adobe Creative Suite, Prototyping
      </span>
    </p>
  </CardContent>
</Card>
```

## 6. Update Metadata

**File**: `app/layout.tsx` (Lines 8-15)

**Current**:
```tsx
export const metadata: Metadata = {
  title: "Dominik Gielarowiec | AI Builder & Finance Enthusiast",
  description:
    "UMass CS + Econ student. Passionate about AI, finance, and building products that matter.",
  keywords: [
    "portfolio",
    "developer",
    "AI",
    "finance",
    "UMass",
    "typescript",
    "react",
  ],
}
```

**Example Updates**:

**For ML Engineer**:
```tsx
export const metadata: Metadata = {
  title: "Alex Chen | Machine Learning Engineer",
  description:
    "ML engineer building AI systems at scale. Expertise in LLMs, computer vision, and NLP.",
  keywords: [
    "machine-learning",
    "ai",
    "python",
    "pytorch",
    "llms",
    "data-science",
  ],
}
```

**For Startup Founder**:
```tsx
export const metadata: Metadata = {
  title: "Jordan Smith | Founder & Product Builder",
  description:
    "Building the next generation of SaaS tools. Previously at Y Combinator.",
  keywords: [
    "founder",
    "startup",
    "saas",
    "product",
    "entrepreneurship",
  ],
}
```

## 7. Modify Button Variants

**File**: `components/ui/magnetize-button.tsx`

**Current Button**:
```tsx
<MagnetizeButton particleCount={14} attractRadius={50}>
  <span>Let's Talk</span>
</MagnetizeButton>
```

**Variations**:

**Larger Button**:
```tsx
<MagnetizeButton 
  particleCount={20} 
  attractRadius={80}
  className="min-w-56 h-14 text-lg"
>
  <span>Start Building</span>
</MagnetizeButton>
```

**Smaller Button**:
```tsx
<MagnetizeButton 
  particleCount={8} 
  attractRadius={30}
  className="min-w-32 h-8 text-sm"
>
  <span>Connect</span>
</MagnetizeButton>
```

**With Icon** (requires icon import):
```tsx
import { Send } from "lucide-react"

<MagnetizeButton>
  <span className="flex items-center gap-2">
    <Send className="w-4 h-4" />
    Get in Touch
  </span>
</MagnetizeButton>
```

## 8. Add More Sections

### Add a Skills Section

Add this after the About section in `app/page.tsx`:

```tsx
{/* SKILLS SECTION */}
<section id="skills" className="w-full py-24 px-4 bg-black">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
      Skills & Technologies
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          category: "Languages",
          items: ["Python", "TypeScript", "JavaScript", "Solidity"],
        },
        {
          category: "Frontend",
          items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
        },
        {
          category: "Backend",
          items: ["Node.js", "Python", "PostgreSQL", "Docker"],
        },
      ].map((group, idx) => (
        <Card key={idx} className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>{group.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### Add a Blog Preview Section

```tsx
{/* LATEST ARTICLES */}
<section id="blog" className="w-full py-24 px-4 bg-gradient-to-b from-black to-black/50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
      Latest Articles
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: "Building Scalable AI Systems",
          date: "Nov 15, 2024",
          excerpt: "Best practices for deploying ML models in production...",
        },
        {
          title: "The Future of Finance",
          date: "Nov 10, 2024",
          excerpt: "How blockchain is reshaping financial services...",
        },
        {
          title: "React Performance Tips",
          date: "Nov 5, 2024",
          excerpt: "Optimizing React apps for 60fps performance...",
        },
      ].map((article, idx) => (
        <a
          key={idx}
          href="#"
          className="block p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
        >
          <time className="text-sm text-white/50">{article.date}</time>
          <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-violet-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-white/70 text-sm mt-2">{article.excerpt}</p>
        </a>
      ))}
    </div>
  </div>
</section>
```

## 9. Add Navigation Links

Update the nav section in `app/page.tsx` (~line 36):

**Add Blog and Skills links**:
```tsx
<div className="hidden md:flex gap-8">
  {["Home", "About", "Skills", "Work", "Blog", "Contact"].map((item) => (
    <a
      key={item}
      href={`#${item.toLowerCase()}`}
      className="text-white/70 hover:text-white transition-colors"
    >
      {item}
    </a>
  ))}
</div>
```

## 10. Integrate Google Analytics

Add to `app/layout.tsx` before closing `</head>`:

```tsx
import Script from "next/script"

<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_ID"
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YOUR_GA_ID');
    `,
  }}
/>
```

Replace `G-YOUR_GA_ID` with your actual Google Analytics ID.

---

**Tips**:
- Always test changes with `npm run dev`
- Use Cmd+Shift+R to hard refresh browser during development
- Check console (F12) for any errors
- Commit working changes: `git add -A && git commit -m "Update..."`

Happy customizing! 🚀
