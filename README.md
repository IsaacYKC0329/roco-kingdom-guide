# Roco Kingdom Mobile Guide

A fan-made, open-source guide website for **Roco Kingdom Mobile** (洛克王国：世界 / 洛克王国手游), the mobile MMORPG pet-collecting game by MoreFun Studios.

**Live Site**: https://isaacykc0329.github.io/roco-kingdom-guide/

## Features

- **Pet Index** — 15 pets with official artwork from BiliGame Wiki, stats, skills, and evolution chains
- **20-Element Type Chart** — Complete matchup system including Light type
- **Skill Database** — 20 skills with power, PP, accuracy, and descriptions
- **PVP Tier List** — S/A/B tier rankings with meta team compositions
- **In-Depth Guides** — Starter choice, open world secrets, PVP strategy, fast progression
- **Google AdSense Ready** — 3 ad slots pre-configured, just add your Publisher ID

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Custom WebGL Shader (Hero section crystal ball effect)
- Lucide React icons

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/repo-name.git
cd repo-name

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deploy to GitHub Pages

### 1. Update configs

Replace these placeholders before deploying:

| File | Placeholder | Your Value |
|------|-------------|-----------|
| `index.html` | `isaacykc0329.github.io/roco-kingdom-guide` | Your actual GitHub Pages URL |
| `index.html` | `ca-pub-YOUR_PUBLISHER_ID` | Your Google AdSense Publisher ID (optional) |
| `robots.txt` | `isaacykc0329.github.io/roco-kingdom-guide` | Your actual GitHub Pages URL |
| `public/404.html` | Update `segmentCount` if needed | `0` for user pages, `1` for project pages |

### 2. Build and push to `gh-pages` branch

```bash
# Build the project
npm run build

# Push dist/ to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

### 3. Enable GitHub Pages

1. Go to **Settings > Pages** in your GitHub repo
2. Set **Source** to **Deploy from a branch**
3. Select the **`gh-pages`** branch and `/ (root)` folder
4. Your site will be live at `https://isaacykc0329.github.io/roco-kingdom-guide/`

## Enabling Google AdSense

1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Replace `ca-pub-XXXXXXXXXXXX` in `index.html` with your Publisher ID
3. Replace ad slot IDs in `src/App.tsx` with your actual ad unit IDs
4. Uncomment the AdSense script in `index.html`

## Pet Data Sources

All pet artwork is sourced from the [BiliGame Roco Kingdom Wiki](https://wiki.biligame.com/rocom/), the official Chinese community wiki. This is a non-commercial fan project with no affiliation to MoreFun Studios or Tencent.

## License

MIT License — feel free to fork, modify, and use for your own projects.

## Disclaimer

This is a fan-made website with no affiliation to MoreFun Studios or Tencent. All game content, trademarks, and artwork belong to their respective owners.
