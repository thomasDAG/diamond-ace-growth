# Diamond Ace Growth - Marketing Website

## Overview

This is a modern, responsive single-page marketing website for **Diamond Ace Growth**, an email/lifecycle consulting brand. The site features a dark, muted green/teal theme with smooth scrolling, scroll-triggered animations, and a contact form that submits lead data to a PostgreSQL database. The layout includes sections for Hero, Problem, Services, Process, Proof, About, and a Contact/CTA form. Includes a lightweight internal CRM for lead management at `/admin`.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — single-page marketing site with anchor-based smooth scrolling, plus admin CRM pages
- **Styling**: Tailwind CSS with a custom dark color palette (muted greens/teals: `#2f3e46`, `#354f52`, `#52796f`, `#84a98c`, `#cad2c5`) and accent colors (`#146ef4` blue, `#fff7bb` yellow). CSS variables defined in `client/src/index.css`
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives, stored in `client/src/components/ui/`
- **Animations**: Framer Motion for entrance animations and scroll-triggered effects; CSS animations for hero gradient glow, floating particles, marquee
- **SEO**: react-helmet-async for dynamic meta tags; static meta tags in `client/index.html`
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Typography**: Inter and Outfit fonts (loaded via Google Fonts)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via `tsx` in dev mode
- **API Endpoints**:
  - `POST /api/contact` — public contact form submission (upserts lead, creates activity, sends email notification)
  - `POST /api/admin/login` — admin authentication (rate-limited)
  - `POST /api/admin/logout` — admin logout
  - `GET /api/admin/me` — check auth status
  - `GET /api/admin/leads` — list all leads
  - `GET /api/admin/leads/:id` — get lead detail with activities and tasks
  - `PATCH /api/admin/leads/:id` — update lead status/follow-up date
  - `DELETE /api/admin/leads/:id` — delete lead (cascades to activities/tasks)
  - `POST /api/admin/leads/:id/activities` — log activity
  - `POST /api/admin/leads/:id/tasks` — create task
  - `PATCH /api/admin/tasks/:id/complete` — mark task complete
- **Session**: express-session with connect-pg-simple (PostgreSQL session store), trust proxy enabled for production
- **Email**: Nodemailer with Gmail SMTP (GMAIL_APP_PASSWORD secret), sends lead notification to thomas@diamondacegrowth.com with Reply-To set to lead's email
- **API Contract**: Defined in `shared/routes.ts` using Zod schemas
- **Dev Server**: Vite dev server is mounted as Express middleware (via `server/vite.ts`) for HMR during development
- **Production Build**: Vite builds the client to `dist/public/`, esbuild bundles the server to `dist/index.cjs`

### Shared Layer (`shared/`)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions and Zod schemas. Tables: `contactMessages`, `leads`, `activities`, `tasks`. Activities and tasks have `onDelete: "cascade"` on their lead foreign keys.
- **Routes** (`shared/routes.ts`): API route definitions with paths, methods, input schemas, and response schemas.

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: `pg` Pool using `DATABASE_URL` environment variable
- **Tables**: `contactMessages`, `leads`, `activities`, `tasks`, `session` (auto-created by connect-pg-simple)
- **Migrations**: Drizzle Kit configured to output migrations to `./migrations/`, schema push via `npm run db:push`
- **Storage Pattern**: `server/storage.ts` implements an `IStorage` interface with a `DatabaseStorage` class

### CRM Admin Area
- **Auth**: Single password (ADMIN_PASSWORD env secret), session-based with PostgreSQL session store
- **Pages**: `/admin/login`, `/admin/leads` (list), `/admin/leads/:id` (detail with Overview/Timeline/Tasks tabs)
- **Lead statuses**: new, contacted, qualified, proposal_sent, won, lost, nurture
- **Features**: Status management, activity logging (note, email_sent, email_received, call, meeting), task creation/completion, lead deletion
- **Client API**: `client/src/lib/admin-api.ts` wraps all admin fetch calls with credentials

### Additional Pages
- **AI Work Portfolio** (`/portfolio`): Thomas Nilsen's AI builder portfolio page. Integrated from a standalone HTML file (`attached_assets/portfolio_1777068585724.html`) using Vite's `?raw` import. Portfolio-specific CSS is in `client/src/styles/portfolio.css` (scoped to `.portfolio-page`). Body content injected via `dangerouslySetInnerHTML`, JS animations run in `useEffect`. The portfolio's own nav and footer were already stripped; it uses the site's Navbar and shared footer.

### Build System
- **Dev**: `npm run dev` runs `tsx server/index.ts` with Vite middleware for HMR
- **Build**: `npm run build` runs a custom `script/build.ts` that builds the client with Vite and bundles the server with esbuild
- **Production**: `npm start` runs the compiled `dist/index.cjs`

### Key Design Decisions
1. **Shared validation schemas**: Zod schemas in `shared/` used by both client and server
2. **Single-page with anchored sections**: Navigation uses hash links with smooth scrolling; Navbar links use `/#` prefix so legal pages can navigate back to main page sections
3. **Storage abstraction**: `IStorage` interface decouples business logic from database
4. **Cascade deletes**: Activities and tasks are automatically deleted when a lead is removed
5. **Hero enhancements**: CSS-only gradient glow, floating particles (configurable via PARTICLES array), marquee with fade masks and hover underlines, CTA glow effect — all respect `prefers-reduced-motion`

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL`. Stores leads, activities, tasks, sessions, and contact messages.
- **Google Fonts**: Inter and Outfit fonts loaded from `fonts.googleapis.com`
- **Gmail SMTP**: Nodemailer sends lead notifications using GMAIL_APP_PASSWORD secret
- **react-helmet-async**: Dynamic SEO meta tags per page
- **connect-pg-simple**: PostgreSQL-backed session store for admin auth persistence
- **Replit Plugins** (dev only): `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`
