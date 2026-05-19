# 🐱 JUMPING CATS — The Internet Is Our Playground

> A hyper-animated cyberpunk arcade web experience.  
> Cats have taken the internet. Are you ready?

---

## Overview

JUMPING CATS is a cinematic, motion-heavy interactive website + arcade game built with a retro-cyberpunk aesthetic. Think: **Netflix intro meets arcade game meets cat chaos**.

### Visual Style
- Dark cyberpunk city backgrounds
- Neon pink / cyan / purple color palette
- CRT scanlines + VHS grain overlay
- Glitch text effects + RGB splits
- Smooth scroll parallax layers
- Particle fields + bloom glow

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + GSAP |
| Smooth Scroll | @studio-freight/lenis |
| Sound | Howler.js |
| State | Zustand |
| Deployment | Netlify |

---

## Project Structure

```
jumping-cats/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main page orchestrator
│   └── globals.css             # Global styles + keyframes
├── components/
│   ├── effects/
│   │   ├── CRTOverlay.tsx      # Scanlines + VHS noise
│   │   ├── CustomCursor.tsx    # Glowing cursor
│   │   ├── ParticleField.tsx   # Canvas particle system
│   │   └── StarField.tsx       # Background stars
│   ├── sections/
│   │   ├── LoadingScreen.tsx   # Cinematic boot sequence
│   │   ├── HeroSection.tsx     # Cat drop + title reveal
│   │   ├── ChaosSection.tsx    # Scroll-animated text
│   │   ├── MotionTextSection.tsx
│   │   ├── ScrollExperience.tsx # Game world parallax
│   │   ├── GameSection.tsx     # Game features + modes
│   │   └── Footer.tsx          # World domination counter
│   └── ui/
│       └── Navigation.tsx      # Top navigation bar
├── hooks/
│   └── useLenis.ts             # Smooth scroll setup
├── netlify.toml                # Netlify deployment config
└── next.config.ts              # Next.js config
```

---

## Setup

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/jumping-cats.git
cd jumping-cats

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

---

## Deployment — Netlify

1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. `netlify.toml` in the repo handles all configuration automatically

**GitHub → Netlify Pipeline:**  
Every push to `main` triggers an automatic production deploy. PRs get deploy previews.

---

## Sections

1. **Loading Screen** — Cat Protocol initialization with boot terminal, glitch effects, progress bar
2. **Hero** — Full-screen cinematic with cat drop, JUMPING CATS title reveal, parallax
3. **Chaos** — Scroll-triggered stagger: "WE JUMP. WE SCRATCH. WE BREAK THE INTERNET."
4. **Motion Text** — "CHAOS. CATS. DOMINATION." glitch line sequence
5. **Scroll World** — Parallax game world with platforms, coins, running cats, neon signs
6. **Game Features** — Feature cards for Jump/Scratch/Collect/Dominate + game modes
7. **Footer** — Animated World Domination % counter reaching 100%

---

## Performance Notes

- Heavy effects lazy-loaded via `next/dynamic`
- Canvas particle system optimized for 60fps
- CSS animations for continuous loops (zero JS overhead)
- Framer Motion only for scroll-triggered one-shot animations
- Google Fonts preloaded in layout head

---

## License

MIT — Do whatever you want, just give cats the credit.

---

*Built with obsessive attention to motion, cinematic timing, and neon aesthetics.*
