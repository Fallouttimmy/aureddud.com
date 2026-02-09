# Aureddud Official Hub

## Overview

This is a personal website/hub for "Aureddud," a YouTube commentary creator. The site serves as a landing page showcasing the creator's brand, latest YouTube videos, and links to social platforms (Discord, YouTube). It features a hero section with branding, an auto-syncing video grid that pulls from YouTube's RSS feed, and a simple admin panel for manually adding videos.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (React + Vite)
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: `wouter` for lightweight client-side routing (single page app with Home + 404)
- **Styling**: Tailwind CSS with shadcn/ui component library (new-york style). Custom CSS variables define the brand theme (purple primary color). Three font families: Oswald (display/headings), Inter (body), JetBrains Mono (monospace)
- **State Management**: TanStack React Query for server state (fetching/caching videos)
- **Animations**: Framer Motion for scroll reveals, entrance animations, and interactive elements
- **Icons**: react-icons (Discord, YouTube icons) and lucide-react (UI icons)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend (Express + Node.js)
- **Framework**: Express.js running on Node with TypeScript (via tsx)
- **API Pattern**: REST API with routes defined in `shared/routes.ts` using Zod schemas for type-safe request/response validation. API routes are prefixed with `/api/`
- **YouTube Integration**: Server fetches videos from YouTube RSS feed (`fast-xml-parser` for XML parsing, `axios` for HTTP) for the channel `UCzpAriEqlUU34cP5CtXmBYw`. Returns the 6 most recent videos
- **Dev/Prod Split**: In development, Vite dev server runs as middleware with HMR. In production, static files are served from `dist/public/`

### Database (PostgreSQL + Drizzle ORM)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema** (in `shared/schema.ts`):
  - `users` table: id (serial PK), username (unique text), password (text)
  - `videos` table: id (serial PK), title (text), thumbnailUrl (text), videoUrl (text), description (text, nullable), publishedAt (timestamp, defaults to now)
- **Migrations**: Drizzle Kit manages schema changes. Use `npm run db:push` to push schema to database
- **Connection**: Uses `DATABASE_URL` environment variable with `pg.Pool`
- **Storage Layer**: `DatabaseStorage` class in `server/storage.ts` implements `IStorage` interface for data access

### Shared Code
- `shared/schema.ts` — Database table definitions and Zod insert schemas (shared between client and server)
- `shared/routes.ts` — API route definitions with paths, methods, and Zod response schemas (used by both frontend hooks and backend handlers)

### Build System
- Custom build script (`script/build.ts`) that runs Vite build for client and esbuild for server
- Server is bundled to `dist/index.cjs` with select dependencies bundled (allowlisted) and others externalized
- Production start: `node dist/index.cjs`

### Key API Endpoints
- `GET /api/videos` — Returns list of videos (fetched live from YouTube RSS, falling back to database)
- `POST /api/videos` — Creates a new video entry (used by admin panel)

## External Dependencies

- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **YouTube RSS Feed**: `https://www.youtube.com/feeds/videos.xml?channel_id=UCzpAriEqlUU34cP5CtXmBYw` — fetched server-side to auto-populate latest videos
- **Google Fonts**: Oswald, Inter, JetBrains Mono, DM Sans, Fira Code, Geist Mono loaded via CDN
- **YouTube Image CDN**: Thumbnail images served from `i.ytimg.com`
- **External Links**: Discord server (`discord.gg/Fns2xa65Yc`), YouTube channel page
- **Replit Plugins** (dev only): `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`