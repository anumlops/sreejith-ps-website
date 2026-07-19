# Sreejith P.S. — Premium Portfolio & Archive Website

## Overview

Single Next.js 15 application serving two surfaces:

1. **Public website** — documentary-style portfolio for Sreejith P.S. and APEC
2. **Private admin panel** — simple CRUD for activities, images, videos, settings

The admin adds content once; the public site reflects it automatically. No manual page updates.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| ORM | Prisma |
| Database | Neon PostgreSQL |
| Image Hosting | Cloudinary |
| Auth | NextAuth.js (Auth.js) |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

## Architecture

```
┌─────────────────────────────────────┐
│         Public Website              │
│  /  /about  /activities  /gallery   │
│  /videos  /contact  /apec-vision    │
└────────────┬────────────────────────┘
             │ Server Components / Actions
┌────────────▼────────────────────────┐
│        Next.js API/Server Layer     │
│  Server Actions  │  Route Handlers  │
└────────────┬────────────────────────┘
             │ Prisma
┌────────────▼────────────────────────┐
│      Neon PostgreSQL (Metadata)     │
│  Activities, Images, Categories,    │
│  Settings, Users                    │
└─────────────────────────────────────┘
          ▲
          │ Cloudinary URLs / YouTube IDs
          ▼
┌─────────────────────────────────────┐
│     Cloudinary (image storage)      │
│     YouTube (video hosting)         │
└─────────────────────────────────────┘
```

## Database Schema

**Users** — `id`, `name`, `email`, `hashedPassword`, `role`, `createdAt`
**Activities** — `id`, `title`, `slug`, `shortDescription`, `story`, `coverImage`, `youtubeVideoId`, `categoryId`, `status` (draft/published), `publishedAt`, `createdAt`, `updatedAt`
**Images** — `id`, `activityId`, `imageUrl`, `caption`, `displayOrder`
**Categories** — `id`, `name`, `slug`
**Settings** — `id`, `siteName`, `heroTitle`, `heroSubtitle`, `contactEmail`, `phone`, `address`, `logo`, `favicon`, `socialLinks`, `heroImage`, `createdAt`, `updatedAt`

## Authentication

- NextAuth.js with Google OAuth + Email/Password credentials
- Middleware protects all `/admin/*` routes
- Session-based, redirect to `/auth/signin` if unauthenticated

## Admin Panel

### Routes
- `/admin` — Dashboard (stats, recent activities, quick actions)
- `/admin/activities` — List all activities (table)
- `/admin/activities/new` — Create activity form
- `/admin/activities/[id]/edit` — Edit activity form
- `/admin/gallery` — Manage uploaded images
- `/admin/videos` — Manage YouTube videos
- `/admin/settings` — Site settings

### Form (Create/Edit Activity)
- Title (text)
- Short Description (textarea)
- Story (editor / textarea)
- Date (date picker)
- Category (dropdown)
- Cover Image (Cloudinary upload widget)
- Gallery Images (multiple, Cloudinary upload)
- YouTube URL (paste → auto-extract ID)
- Status toggle: Draft / Published

### Dashboard Widgets
- Recent activities
- Draft count
- Published count
- Quick "New Activity" button
- Storage summary

## Public Pages

### Home (`/`)
- Hero (full-width image + mission statement)
- Latest 3 activities
- Featured gallery section
- Featured video
- CTA

### About (`/about`)
- Story of Sreejith P.S.
- Values, mission, journey timeline

### Activities (`/activities`)
- Grid of published activity cards (cover, title, date, excerpt)
- Newest first
- Click → activity detail page

### Activity Detail (`/activities/[slug]`)
- Cover image, title, date, category
- Full story
- Image gallery (masonry + lightbox)
- Embedded YouTube video (if present)
- Related activities

### Gallery (`/gallery`)
- Masonry layout with all images from published activities
- Category filter
- Lightbox on click
- Lazy loading

### Videos (`/videos`)
- YouTube thumbnails grid
- Title + description
- Click → embed player

### APEC Vision (`/apec-vision`)
- Static page about APEC vision and mission

### Contact (`/contact`)
- Phone, email, address
- Google Maps embed
- Social links
- Contact form

## Design System

### Style
- Minimal, Apple-inspired
- Max-width containers (1280px)
- Generous whitespace
- Large typography (Inter font)
- Subtle Framer Motion animations on scroll
- Soft shadows, rounded corners
- Dark/light mode via Tailwind

### Components (shadcn/ui)
- Button, Card, Input, Textarea, Dialog, Sheet, Dropdown, Badge, Avatar, Separator, Table, Tabs, Toast/Sonner

## SEO

- Dynamic metadata per page
- Open Graph + Twitter cards for activities
- Auto-generated XML sitemap
- robots.txt
- Semantic HTML

## Implementation Order

1. Project scaffold + dependencies
2. Prisma schema + migrate
3. Auth setup
4. Admin layout + sidebar
5. Admin dashboard
6. Activity CRUD (create, edit, delete)
7. Cloudinary upload integration
8. YouTube URL → ID extraction
9. Settings page
10. Public layout + home page
11. Activities list + detail pages
12. Gallery page (masonry + lightbox)
13. Videos page
14. About + APEC Vision + Contact pages
15. SEO (metadata, sitemap, robots)
16. Deployment config (vercel.json, env vars)
