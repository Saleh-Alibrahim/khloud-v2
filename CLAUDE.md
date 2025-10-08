# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript wedding wishes application built with Vite and styled using Tailwind CSS and shadcn/ui components. The app displays animated Arabic wedding messages with background music.

## Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:8080

# Building
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for faster compilation
- **Styling**: Tailwind CSS + shadcn/ui component library
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Component Structure**:
  - `/src/components/ui/` - shadcn/ui components (pre-built UI library)
  - `/src/components/` - Custom application components
  - `/src/pages/` - Page components for routing
  - `/src/lib/` - Utility functions and helpers
  
## Key Files

- `src/App.tsx` - Main app setup with providers and routing
- `src/pages/Index.tsx` - Home page component
- `src/components/WeddingWishes.tsx` - Main wedding wishes component with music and animations

## Development Notes

- The app uses path aliases: `@/` maps to `./src/`
- Port 8080 is configured for development server
- Component tagger is enabled in development mode for Lovable integration
- The project uses SWC instead of Babel for faster React compilation