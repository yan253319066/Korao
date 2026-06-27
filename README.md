# korao.ai — Premium AI Domain Landing Page

Premium domain acquisition landing page for `korao.ai`, featuring a liquid-glass design system, custom fading background videos, and interactive domain value exploration.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + `tw-animate-css`
- **Animation:** Motion (Framer Motion v12)
- **Icons:** Lucide React
- **AI SDK:** `@google/genai`
- **Package Manager:** pnpm

## Features

- **Hero Section** — Animated introduction with fading background video, brand badges, and scroll-triggered entrance animations
- **Domain Value Cards** — Three interactive cards (Brand Value, AI Vertical, Premium Investment) with Intersection Observer scroll tracking
- **Value Explorer** — Tabbed interactive panel with:
  - Branding playground (dynamic typography previews)
  - Interactive API sandbox (mock endpoints for `agents`, `models`, `completions`)
  - Comparable domain sales data & investment valuations
- **Inquiry Modal** — Multi-step acquisition form with simulated escrow protocol flow
- **Offer History Drawer** — Persistent offer tracking via `localStorage`
- **Liquid-Glass Design** — Custom glassmorphism UI with frosted backdrop effects

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Gemini AI API key |
| `APP_URL` | Hosted app URL (for callbacks) |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm clean` | Clean Next.js cache |

## Project Structure

```
app/
├── components/          # React components
│   ├── BlurText.tsx       # Blur entrance animation text
│   ├── FadingVideo.tsx    # Fading background video
│   ├── Icons.tsx          # Custom SVG icons
│   ├── InquiryModal.tsx   # Domain acquisition form
│   ├── OfferHistoryDrawer.tsx  # Saved offers panel
│   └── ValueExplorer.tsx  # Interactive value tabs
├── globals.css           # Global styles (Tailwind)
├── layout.tsx            # Root layout (fonts, metadata)
└── page.tsx              # Main landing page
```

## Deployment

Build produces a standalone output (`output: 'standalone'` in `next.config.ts`), deployable to any Node.js hosting environment (Cloud Run, Vercel, Docker, etc.).

## License

Private — All rights reserved.
