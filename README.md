# Cinema — Movie Reservation Frontend

A movie reservation web app built with Next.js. Browse movies, pick seats, and book tickets.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (Pages Router) |
| Language | TypeScript 5.9 |
| UI Library | HeroUI 2.6 |
| Styling | Tailwind CSS 3.4 |
| Auth | NextAuth 4 (JWT strategy) |
| Server State | React Query 5 (@tanstack/react-query) |
| Forms | React Hook Form 7 + Yup validation |
| HTTP Client | Axios 1.7 |
| Testing | Vitest 4 + React Testing Library |
| Linting | ESLint (next/core-web-vitals) |
| Formatting | Prettier + tailwindcss plugin |
| Git Hooks | Husky |

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:8080/api` (see [API_REFERENCE.md](API_REFERENCE.md))

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXTAUTH_SECRET=<your-secret>
```

## Scripts

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm start          # Start production server
npm run lint       # ESLint
npm run test       # Vitest (watch mode)
npm run test:run   # Vitest (single run)
```

## Project Structure

```
src/
├── components/
│   ├── commons/        # AppShell, PageHead, DropdownAction, ErrorBoundary
│   ├── layouts/        # LandingPageLayout, DashboardLayout, AuthLayout
│   ├── ui/             # DataTable, MovieCard, SeatGrid, Toaster
│   └── views/          # Page-level components organized by domain
│       ├── Admin/      # Genre, Movie, MovieForm, Theater, Showtime, Reservation, User, Dashboard
│       ├── Auth/       # Login, Register
│       ├── Home/
│       ├── Movie/      # Public movie listing
│       ├── MovieDetail/
│       ├── Profile/
│       ├── Reservation/       # Member reservation list
│       ├── ReservationDetail/
│       ├── SeatPicker/
│       └── TheaterDetail/
├── config/             # Environment config
├── constants/          # Pagination defaults
├── contexts/           # ToasterContext
├── hooks/              # useChangeUrl, useDebounce
├── libs/axios/         # Axios instance + interceptors
├── pages/              # Next.js pages (routes)
├── services/           # API service layer (one file per domain)
├── styles/             # Global CSS (Tailwind directives)
├── test/               # Vitest setup + test utilities
├── types/              # TypeScript interfaces (Auth, Genre, Movie, Theater, Showtime, Reservation, User)
└── utils/              # cn(), currency formatter, date utils
```

## Routes

### Public

| Route | Description |
|---|---|
| `/` | Home / landing page |
| `/movies` | Browse movies (search, genre filter, pagination) |
| `/movies/[id]` | Movie detail + showtimes |
| `/theaters/[id]` | Theater detail + seat layout |
| `/showtimes/[id]/seats` | Interactive seat picker + booking |

### Auth

| Route | Description |
|---|---|
| `/auth/login` | Login (email + password) |
| `/auth/register` | Register (name + email + password) |

### Member (auth required)

| Route | Description |
|---|---|
| `/member/reservations` | My reservations list |
| `/member/reservations/[id]` | Reservation detail + cancel |
| `/member/profile` | User profile |

### Admin (admin role required)

| Route | Description |
|---|---|
| `/admin/dashboard` | Stats overview |
| `/admin/movies` | CRUD movies |
| `/admin/movies/new` | Create movie |
| `/admin/movies/[id]/edit` | Edit movie |
| `/admin/genres` | CRUD genres |
| `/admin/theaters` | Manage theaters |
| `/admin/showtimes` | Manage showtimes |
| `/admin/reservations` | All reservations + force cancel |
| `/admin/users` | User list + promote to admin |

## Architecture

- **Pages** — thin wrappers composing a Layout + a View component via `getLayout`
- **Views** — page-level UI and logic, each with a custom hook (`useXxx`) for data fetching via React Query
- **Services** — axios-based API calls, one file per domain; endpoints defined in `endpoint.constant.ts`
- **Auth** — NextAuth with Credentials provider + JWT strategy; middleware protects `/admin` (role check) and `/member` (auth check)
- **Forms** — react-hook-form with yup schemas for validation; modal-based CRUD for admin pages
