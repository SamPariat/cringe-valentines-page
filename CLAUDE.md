# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev` (runs on http://localhost:3000)
- **Build**: `pnpm build`
- **Lint**: `pnpm lint` (uses Biome)
- **Format**: `pnpm format` (Biome with 2-space indentation)

## Tech Stack

- Next.js 16 with App Router (`src/app/`)
- React 19 with React Compiler enabled (`next.config.ts`)
- Tailwind CSS 4 via `@tailwindcss/postcss`
- TypeScript with strict mode
- Biome for linting and formatting (replaces ESLint/Prettier)

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json)
