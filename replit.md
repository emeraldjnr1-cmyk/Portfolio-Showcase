# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Denver No-Code Solutions Portfolio (`artifacts/portfolio`)
- **Type**: React + Vite (presentation-first, no backend)
- **Preview path**: `/`
- **Purpose**: Personal portfolio website for Denver Peter, no-code automation specialist
- **Sections**: Hero, Problem, Services, Capabilities, Workflow Showcase, Video Testimonials, Client Reviews, How It Works, About, Final CTA
- **CTAs**: WhatsApp + Telegram throughout — primary: wa.me/1234567890, Telegram: t.me/DenverNoCode
- **Design**: Powder Blue (#E6F0F5), White, Deep Teal (#1F3A5F), Charcoal (#333333)
- **Key deps**: framer-motion, embla-carousel-autoplay, lucide-react, react-icons
- **Workflow screenshots**: Imported from attached_assets/ via @assets/ alias

### To customize:
- WhatsApp number: search `wa.me/1234567890` and replace with real number
- Telegram handle: search `t.me/DenverNoCode` and replace with real handle
- Profile photo: replace placeholder in About section
- Video testimonials: swap placeholder cards with real video embeds in the carousel
- Client reviews: update names/quotes in ClientReviews section
