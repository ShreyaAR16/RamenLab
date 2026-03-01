# Ramen Lab - Build Your Perfect Bowl

An interactive ramen bowl construction app where you craft your dream bowl by choosing a soup base, noodle type, and toppings. Built with a warm Japanese aesthetic featuring hand-drawn SVG bowl visuals, animated steam, chopsticks, and traditional Japanese typography.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

---

## Features

### Bowl Builder
- **6 Soup Bases** -- Tonkotsu, Shoyu, Miso, Shio, Tantanmen, and Veggie Green, each with distinct broth colors rendered in the SVG bowl
- **4 Noodle Types** -- Shirataki (white, thin), Glass Noodles (transparent), Udon (thick), and Thin Noodles (classic golden), each with realistic strand rendering
- **10 Toppings** -- Chashu Pork, Soft-Boiled Egg, Nori, Scallions, Sweet Corn, Mushrooms, Bamboo Shoots, Narutomaki, Bok Choy, and Tempura

### User Experience
- Step-by-step guided builder (Soup > Noodles > Toppings)
- Live order summary panel
- Reset and completion flow with celebration screen
- Fully responsive layout for desktop and mobile

---

## Tech Stack

| Layer       | Technology                     |
| ----------- | ------------------------------ |
| Framework   | Next.js 16 (App Router)       |
| Language    | TypeScript 5                   |
| Styling     | Tailwind CSS 4                 |
| UI Library  | shadcn/ui + Radix UI           |
| Font        | Noto Serif JP (Google Fonts)   |
| Graphics    | Hand-crafted inline SVG        |
| Deployment  | Vercel                         |


## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ShreyaAR16/RamenLab.git
cd RamenLab

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Customization

### Adding a New Soup Base

1. Add the new ID to the `SoupBase` union type in `lib/ramen-data.ts`
2. Add a new entry to the `soupBases` array with name, Japanese text, description, and color
3. Add the broth color mapping in `ramen-bowl-svg.tsx` inside the `brothColors` object

### Adding a New Topping

1. Add the new ID to the `ToppingId` union type in `lib/ramen-data.ts`
2. Add a new entry to the `toppings` array
3. Add the SVG rendering for the topping inside the `renderTopping` function in `ramen-bowl-svg.tsx`

### Adding a New Noodle Type

1. Add the new ID to the `NoodleType` union type in `lib/ramen-data.ts`
2. Add a new entry to the `noodleTypes` array
3. Add the noodle color/style mapping and icon in `noodle-selector.tsx`
4. Add noodle appearance config in `ramen-bowl-svg.tsx`

---

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

```bash
# Deploy with Vercel CLI
npx vercel
```

Or connect your GitHub repository directly in the Vercel dashboard for automatic deployments on push.

---

## Live Demo

Check out the deployed app here: [https://v0-ramen-bowl-builder.vercel.app/](https://v0-ramen-bowl-builder.vercel.app/)

---

## License

MIT
