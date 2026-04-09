# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Event management frontend ("Acara") built with Next.js 15 (Pages Router), TypeScript, HeroUI, and Tailwind CSS. Connects to a backend API and integrates Midtrans payment gateway.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint (next/core-web-vitals)
npm start         # Start production server
```

No test framework is configured.

## Architecture

### Routing & Pages (Pages Router)

- **Public**: `/` (home), `/event` (listing), `/event/[slug]` (detail)
- **Auth**: `/auth/login`, `/auth/register`, `/auth/activation`
- **Admin** (role-gated): `/admin/event`, `/admin/banner`, `/admin/category`, `/admin/transaction`
- **Member** (auth-gated): `/member/profile`, `/member/transaction`
- **Payment**: `/payment/[status]`

### Key Layers

- **Pages** (`src/pages/`) — thin wrappers that compose a Layout + a View component
- **Views** (`src/components/views/`) — page-level UI and logic, organized by domain (Admin/, Auth/, Member/, etc.)
- **Layouts** (`src/components/layouts/`) — DashboardLayout, AuthLayout, LandingPageLayout
- **UI** (`src/components/ui/`) — reusable components: DataTable, CardEvent, InputFile, Toaster
- **Commons** (`src/components/commons/`) — AppShell (root providers), PageHead, DropdownAction
- **Services** (`src/services/`) — axios-based API calls, one file per domain (auth, event, banner, category, ticket, order, upload). Endpoints defined in `endpoint.constant.ts`
- **Hooks** (`src/hooks/`) — `useChangeUrl` (URL query params/filtering), `useDebounce`, `useMediaHandling` (file uploads)
- **Types** (`src/types/`) — TypeScript interfaces per domain (`.d.ts` files)
- **Libs** (`src/libs/axios/`) — Axios instance with auth token interceptor and centralized error/response handling

### Auth Flow

NextAuth 4 with Credentials provider + JWT strategy. Middleware (`src/middleware.ts`) protects `/admin` (admin role only) and `/member` routes. Axios interceptor injects the token; expired tokens trigger auto-signout.

### State Management

- **Server state**: React Query (@tanstack/react-query)
- **Auth state**: NextAuth sessions/JWT
- **Local state**: React Context (ToasterContext)

### Forms

react-hook-form + yup validation. CRUD operations use modal-based forms (Add/Edit/Delete modals).

## Key Conventions

- Path alias: `@/*` maps to `src/*`
- Classname utility: `cn()` from `src/utils/cn.ts` (clsx + tailwind-merge)
- UI components from HeroUI (imported as `@heroui/*`)
- Dark mode via Tailwind class strategy
- Remote images allowed from `res.cloudinary.com` (configured in `next.config.mjs`)
- Prettier with tailwindcss plugin for class sorting
- Husky for git hooks
