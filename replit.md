# Diamond Ace Growth - Marketing Website

## Overview

This is a modern, responsive single-page marketing website for **Diamond Ace Growth**, an email/lifecycle consulting brand. The site features a dark, muted green/teal theme with smooth scrolling, scroll-triggered animations, and a contact form that submits lead data to a PostgreSQL database. The layout includes sections for Hero, Problem, Services, Process, Proof, About, and a Contact/CTA form.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — but this is effectively a single-page site with anchor-based smooth scrolling between sections
- **Styling**: Tailwind CSS with a custom dark color palette (muted greens/teals: `#2f3e46`, `#354f52`, `#52796f`, `#84a98c`, `#cad2c5`) and accent colors (`#146ef4` blue, `#fff7bb` yellow). CSS variables defined in `client/src/index.css`
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives, stored in `client/src/components/ui/`
- **Animations**: Framer Motion for entrance animations and scroll-triggered effects
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Typography**: Inter and Outfit fonts (loaded via Google Fonts)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via `tsx` in dev mode
- **API**: Single REST endpoint `POST /api/contact` for contact form submissions
- **API Contract**: Defined in `shared/routes.ts` using Zod schemas — both client and server share the same validation logic
- **Dev Server**: Vite dev server is mounted as Express middleware (via `server/vite.ts`) for HMR during development
- **Production Build**: Vite builds the client to `dist/public/`, esbuild bundles the server to `dist/index.cjs`

### Shared Layer (`shared/`)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions and Zod schemas generated via `drizzle-zod`. The `contactMessages` table stores lead form data (name, email, company, business type, platform, revenue range, implemented features, pain points).
- **Routes** (`shared/routes.ts`): API route definitions with paths, methods, input schemas, and response schemas. This creates a type-safe contract between frontend and backend.

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: `pg` Pool using `DATABASE_URL` environment variable
- **Migrations**: Drizzle Kit configured to output migrations to `./migrations/`, schema push via `npm run db:push`
- **Storage Pattern**: `server/storage.ts` implements an `IStorage` interface with a `DatabaseStorage` class, making it easy to swap storage implementations

### Build System
- **Dev**: `npm run dev` runs `tsx server/index.ts` with Vite middleware for HMR
- **Build**: `npm run build` runs a custom `script/build.ts` that builds the client with Vite and bundles the server with esbuild
- **Production**: `npm start` runs the compiled `dist/index.cjs`

### Key Design Decisions
1. **Shared validation schemas**: Zod schemas in `shared/` are used by both client (React Hook Form) and server (Express route handler), ensuring consistent validation without duplication
2. **Single-page with anchored sections**: Not a multi-page app — navigation uses hash links (`#problem`, `#services`, etc.) with smooth scrolling
3. **Storage abstraction**: The `IStorage` interface in `server/storage.ts` decouples business logic from the database implementation
4. **Component library**: Full shadcn/ui component set is installed for rapid UI development

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable. Used for storing contact form submissions.
- **Google Fonts**: Inter and Outfit fonts loaded from `fonts.googleapis.com`
- **Replit Plugins** (dev only): `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` — only active in development on Replit
- **No authentication**: This is a public marketing site with no auth system
- **No external APIs**: The only API is the internal `POST /api/contact` endpoint