# Dominik Gielarowiec - Personal Portfolio

A polished, futuristic personal portfolio website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Features an animated WebGL shader hero, 3D Spline integration, cursor-following spotlights, and interactive components.

## 🎯 Features

- **Animated WebGL Shader Hero**: Full-screen gradient background with smooth animations
- **3D Integration**: Spline scene viewer for interactive 3D elements
- **Cursor-Following Spotlight**: Smooth, constrained spotlight effects on hover
- **Magnetize Button**: Particle-based interactive CTA button with Framer Motion
- **Modern Design**: Dark theme with violet/purple gradient accents
- **Fully Responsive**: Mobile-optimized layout with Tailwind CSS
- **TypeScript**: Full type safety across the application

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm**

### Installation & Setup

1. **Navigate to project directory**:

```bash
cd /Users/domgielar/Desktop/Personal_Portfolio
```

2. **Install dependencies**:

```bash
npm install
```

This will install all required packages listed in `package.json`:
- React & Next.js 14
- TypeScript
- Tailwind CSS with PostCSS
- Framer Motion for animations
- Spline for 3D scenes
- shadcn/ui components
- And more...

3. **Run the development server**:

```bash
npm run dev
```

4. **Open your browser**:

```
http://localhost:3000
```

You should see your portfolio homepage with:
- Animated shader hero section
- Navigation bar
- About section with spotlight effects
- Projects/work section with 3D Spline viewer
- Contact section with magnetize button
- Footer

## 📦 Project Structure

```
Personal_Portfolio/
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts
│   ├── page.tsx                # Main homepage (all sections)
│   └── globals.css             # Global styles & CSS variables
│
├── components/
│   └── ui/
│       ├── animated-shader-hero.tsx    # WebGL shader hero (main hero)
│       ├── spline-scene.tsx            # 3D Spline viewer component
│       ├── spotlight-aceternity.tsx    # Simple spotlight variant
│       ├── spotlight-ibelick.tsx       # Cursor-tracking spotlight
│       ├── spotlight.tsx               # Unified spotlight export
│       ├── magnetize-button.tsx        # Particle CTA button
│       ├── button.tsx                  # Base button (shadcn)
│       └── card.tsx                    # Card components (shadcn)
│
├── lib/
│   └── utils.ts                # cn() helper, utilities
│
├── public/                     # Static assets (add images here)
│
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.js          # PostCSS config
├── next.config.js             # Next.js config
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🛠 Tech Stack

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | ^14.0.0 | React framework |
| React | ^18.2.0 | UI library |
| TypeScript | ^5.2.0 | Type safety |
| Tailwind CSS | ^3.3.0 | Styling |
| Framer Motion | ^10.16.0 | Animations |

### 3D & Visual

| Package | Purpose |
|---------|---------|
| @splinetool/react-spline | 3D scene viewer |
| @splinetool/runtime | Spline runtime |
| lucide-react | Icon library |

### UI Components

| Package | Purpose |
|---------|---------|
| @radix-ui/react-slot | Component composition |
| class-variance-authority | Variant styling |
| clsx / tailwind-merge | Class utilities |

## 🎨 Customization Guide

### Update Hero Section

Edit `app/page.tsx` around line 50:

```tsx
<AnimatedShaderHero
  headline={{
    line1: "Your Line 1",
    line2: "Your Line 2"
  }}
  subtitle="Your subtitle text here"
  // ... other props
/>
```

### Change Colors

Edit `app/globals.css`:

```css
--accent: 262.1 80% 50.4%;  /* Main accent (violet) */
--background: 0 0% 0%;      /* Dark background */
```

### Update Social Links

In `app/page.tsx` CONTACT SECTION (around line 280+):

```tsx
<a href="mailto:YOUR_EMAIL@gmail.com">
  <Mail /> Email
</a>
// Update to your actual LinkedIn, GitHub URLs
```

### Add Projects

Modify the projects array in `app/page.tsx` (around line 230):

```tsx
{
  title: "Your Project",
  description: "Description here",
  tech: ["React", "TypeScript"],
  icon: Brain,
}
```

### Change Spline Scene

In the **WORK SECTION** of `app/page.tsx`:

```tsx
<SplineScene
  scene="YOUR_SPLINE_SCENE_URL"
  className="w-full h-full"
/>
```

Get a URL from [Spline.design](https://spline.design) or use the example provided.

## 📝 Component Details

### AnimatedShaderHero

**Location**: `components/ui/animated-shader-hero.tsx`

**Props**:
```typescript
interface HeroProps {
  trustBadge?: { text: string; icons?: string[] }
  headline: { line1: string; line2: string }
  subtitle: string
  buttons?: {
    primary?: { text: string; onClick?: () => void }
    secondary?: { text: string; onClick?: () => void }
  }
  className?: string
}
```

**Features**:
- Full-screen WebGL gradient shader background
- Custom animations with Framer Motion
- Trust badge display
- Dual CTA buttons
- Scroll indicator animation

### SplineScene

**Location**: `components/ui/spline-scene.tsx`

**Props**:
```typescript
interface SplineSceneProps {
  scene: string  // Spline URL
  className?: string
}
```

**Features**:
- Lazy loading with Suspense fallback
- Loading state spinner
- Responsive sizing

### SpotlightIbelick

**Location**: `components/ui/spotlight-ibelick.tsx`

**Props**:
```typescript
interface SpotlightProps {
  className?: string
  fill?: string  // Color of spotlight
}
```

**Features**:
- Cursor-following effect
- Constrained to container
- Smooth opacity transitions

### MagnetizeButton

**Location**: `components/ui/magnetize-button.tsx`

**Props**:
```typescript
interface MagnetizeButtonProps {
  particleCount?: number  // Default 12
  attractRadius?: number  // Default 50
  className?: string
  // ... standard button props
}
```

**Features**:
- Particle attraction animation
- Spring physics
- Touch and mouse support

## 🚀 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

2. **Go to [vercel.com](https://vercel.com)**
3. **Click "Add New..." → "Project"**
4. **Import your GitHub repository**
5. **Vercel auto-detects Next.js** and configures automatically
6. **Click Deploy** - your site is live in seconds! 🎉

### Deploy to Other Platforms

- **Netlify**: Supports Next.js with proper configuration
- **AWS Amplify**: Full Next.js support
- **Railway**: Simple deployment with GitHub integration
- **Render**: Straightforward Next.js hosting

## 🔗 Important Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Spline Web Documentation](https://docs.spline.design/web-api)
- [Lucide Icons](https://lucide.dev)

## 🛡️ Troubleshooting

### Port 3000 already in use

```bash
lsof -i :3000
kill -9 <PID>
npm run dev
```

### TypeScript errors after installation

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Spline scene not loading

- Check the scene URL is correct and public
- Verify internet connection
- Check browser console for errors

### Spotlight effects not appearing

- Ensure container has `position: relative`
- Check z-index values in CSS
- Verify spotlight component is inside the container

## 📋 Build Checklist Before Deployment

- [ ] Update all text with your personal information
- [ ] Add real social media links (LinkedIn, GitHub, email)
- [ ] Update/add real project examples
- [ ] Choose and embed a Spline scene (or remove if not needed)
- [ ] Test on mobile devices
- [ ] Run `npm run build` to catch any errors
- [ ] Check all links work correctly
- [ ] Add favicon (replace `public/favicon.ico`)
- [ ] Update metadata in `app/layout.tsx`
- [ ] Test form submissions if you add a contact form

## 🎓 Learning Resources

### For Beginners

- [Next.js Tutorial](https://nextjs.org/learn)
- [Tailwind CSS from Scratch](https://tailwindcss.com/docs/installation)
- [React Fundamentals](https://react.dev)

### Advanced Topics

- [WebGL Shaders](https://learnopengl.com)
- [Framer Motion Advanced](https://www.framer.com/motion/examples)
- [TypeScript Deep Dive](https://www.typescriptlang.org/docs)

## 📞 Support & Contact

For questions about this portfolio:
- **Email**: dom@example.com (update with your email)
- **GitHub**: [domgielar](https://github.com/domgielar)
- **LinkedIn**: [Dominik Gielarowiec](https://linkedin.com/in/domgielar)

## 📄 License

This portfolio project is open source and available under the MIT License. Feel free to use it as a template for your own portfolio!

## ✨ Customization Examples

### Add a Blog Section

Create `app/blog/page.tsx` and add a blog section with MDX support.

### Integrate Contact Form

Use services like:
- [Resend](https://resend.com)
- [EmailJS](https://www.emailjs.com)
- [Formspree](https://formspree.io)

### Add Dark Mode Toggle

Implement with `next-themes` package and Tailwind's dark mode.

### Connect Database

Use **Supabase**, **MongoDB**, or **Prisma** for dynamic content.

---

**Built with 🚀 and ✨ by Dominik Gielarowiec**

Last Updated: November 2025
