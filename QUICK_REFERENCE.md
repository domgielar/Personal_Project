# 🚀 Quick Reference Card

## 📦 What You Have

A **complete, production-ready Next.js portfolio** with:
- ✅ Animated WebGL shader hero
- ✅ 3D Spline scene viewer
- ✅ Cursor-following spotlights
- ✅ Magnetize particle button
- ✅ Full responsive design
- ✅ TypeScript + Tailwind
- ✅ All pushed to GitHub

## ⚡ Get Started (5 Minutes)

```bash
# 1. Install
cd /Users/domgielar/Desktop/Personal_Portfolio
npm install

# 2. Run
npm run dev

# 3. Open
http://localhost:3000
```

## 🎯 What to Customize (Priority Order)

| Priority | Task | File | Time |
|----------|------|------|------|
| 1 | Update hero text | `app/page.tsx:50` | 2 min |
| 2 | Update social links | `app/page.tsx:280` | 2 min |
| 3 | Add your projects | `app/page.tsx:230` | 5 min |
| 4 | Change theme colors | `app/globals.css:1` | 2 min |
| 5 | Add Spline scene | `app/page.tsx:218` | 5 min |

**Total time to customize**: ~15 minutes

## 📄 File Guide

| Path | Purpose | Edit When |
|------|---------|-----------|
| `app/page.tsx` | Main page + content | Always! Update text, links, projects |
| `app/layout.tsx` | Root layout + metadata | Update title, description |
| `app/globals.css` | Theme + colors | Change accent colors |
| `components/ui/*` | Components | Advanced customization |
| `package.json` | Dependencies | To add/remove packages |

## 🎨 Quick Customizations

### Change Hero Text
```tsx
// app/page.tsx line 50
headline={{ line1: "Your Line", line2: "Your Line 2" }}
```

### Change Email
```tsx
// app/page.tsx line 281
href="mailto:YOUR_EMAIL@gmail.com"
```

### Change Accent Color
```css
/* app/globals.css line 7 */
--accent: 280.9 97.3% 50.5%;  /* 0-360 hue */
```

### Add Project
```tsx
// app/page.tsx line 230 - add to projects array:
{
  title: "Your Project",
  description: "What it does",
  tech: ["React", "TypeScript"],
  icon: Brain,
}
```

## 🚀 Deploy (1 Minute)

```bash
# Push to GitHub
git add .
git commit -m "Deploy"
git push

# Go to vercel.com → Add Project → Import GitHub → Deploy ✨
```

## 📚 Documentation

- **README.md** - Full project overview & features
- **SETUP_GUIDE.md** - Detailed setup & customization
- **IMPLEMENTATION_EXAMPLES.md** - Code snippets for every change

## 🆘 Help

**Problem**: npm install fails
```bash
npm install --legacy-peer-deps
```

**Problem**: Port 3000 in use
```bash
lsof -i :3000 && kill -9 <PID>
```

**Problem**: TypeScript errors
```bash
rm -rf .next node_modules && npm install
```

## 📍 Key File Locations

```
Project Root: /Users/domgielar/Desktop/Personal_Portfolio/
├── Components: components/ui/*.tsx
├── Main Page: app/page.tsx ← Edit this!
├── Styles: app/globals.css
├── Docs: README.md, SETUP_GUIDE.md
└── GitHub: https://github.com/domgielar/Personal_Project
```

## 🔑 Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "typescript": "^5.2.0",
  "tailwindcss": "^3.3.0",
  "framer-motion": "^10.16.0",
  "@splinetool/react-spline": "^2.2.0",
  "lucide-react": "^0.263.0"
}
```

## 🎯 Next Steps Checklist

- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] View at http://localhost:3000
- [ ] Update hero text in `app/page.tsx`
- [ ] Update social links
- [ ] Add your projects
- [ ] Test on mobile (CMD+Shift+M)
- [ ] Run `npm run build` (check for errors)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Share with friends! 🎉

## 📞 Resources

- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com
- **Framer**: https://framer.com/motion
- **Spline**: https://spline.design
- **Icons**: https://lucide.dev

---

**You're all set!** Start with step 1 (install), then customize as needed. 🚀
