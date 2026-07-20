# Troubleshooting Log

## Issue 1: Prisma 7 Breaking Changes

**Error:** `The datasource property url is no longer supported in schema files`

**Cause:** Prisma 7 removed support for `url = env("DATABASE_URL")` in `schema.prisma`. Requires migration to `prisma.config.ts`.

**Fix:** Downgraded Prisma to v6.19.3 which supports the familiar schema syntax.

```powershell
npm install prisma@6 @prisma/client@6
```

---

## Issue 2: `tailwindcss-animate` Import Error

**Error:** `Can't resolve 'tailwindcss-animate'` in Next.js Turbopack build

**Cause:** `tailwindcss-animate` is incompatible with Tailwind CSS v4's CSS-based import system.

**Fix:** Removed `@import "tailwindcss-animate"` from `globals.css`. Not needed since Framer Motion handles all animations.

---

## Issue 3: `Chrome` Icon Missing in lucide-react

**Error:** `Export Chrome doesn't exist in target module`

**Cause:** `lucide-react` v1.25.0 removed the `Chrome` icon. Brand icons (Google, Chrome, etc.) are no longer included.

**Fix:** Removed the Google Sign-In button from the auth form. Credentials-only login works standalone.

---

## Issue 4: `publishedAt` Type Mismatch

**Error:** `Type 'Date | null' is not assignable to type 'string | null | undefined'`

**Cause:** Prisma returns `Date` objects for DateTime fields, but `ActivityCard` component expected `string`.

**Fix:** Updated `ActivityCard` `Props` interface to accept `Date | string | null` for `publishedAt`.

---

## Issue 5: Gallery Activity Type Nullable

**Error:** `Type '{ activity: { title: string; } | null; }' is not assignable to type '{ activity: { title: string; } }'`

**Cause:** Prisma's relation type makes `activity` nullable even with a WHERE filter.

**Fix:** Updated `GalleryImage` interface to allow `activity: { title: string } | null`.

---

## Issue 6: Static Generation Fails Without Database

**Error:** `Can't reach database server` during Next.js build

**Cause:** Server components and pages that directly query Prisma try to connect during build time static generation. With no real database available during build, it crashes.

**Fix:** Added `export const dynamic = "force-dynamic"` to all pages that use Prisma directly or via server actions. Wrapped the sitemap's Prisma call in a try-catch.

Affected pages:
- `/admin`, `/admin/activities`, `/admin/activities/new`, `/admin/activities/[id]/edit`
- `/admin/videos`, `/admin/settings`
- `/activities`, `/activities/[slug]`, `/gallery`, `/videos`, `/contact`
- `/` (home)

---

## Issue 7: Next.js 16 Middleware Deprecation

**Warning:** `The "middleware" file convention is deprecated. Please use "proxy" instead.`

**Cause:** Next.js 16 renamed `middleware.ts` to `proxy.ts` to avoid confusion with service worker middleware.

**Fix:** Renamed `src/middleware.ts` → `src/proxy.ts`. The API (function signature, `config.matcher`) is identical.

---

## Issue 8: CSRF Token Mismatch on Login (Missing AUTH_SECRET)

**Error:** Login form submits but redirects back to login page. Server returns `error=MissingCSRF`.

**Cause:** `AUTH_SECRET` environment variable was not set in Vercel. Without it, NextAuth generates an ephemeral secret that changes on every serverless function cold start, causing CSRF cookie verification to fail.

**Fix:** Added `AUTH_SECRET` to Vercel's environment variables. Also added proper error handling to the login form (try-catch, `redirect: false`, error message display).

```env
AUTH_SECRET = e5baa9d2bdbf4e6d9cf83e52748326a0d5dc479f79e9f0ec47b052734f820dc8
```

---

## Issue 9: Login Form No Feedback on Failure

**Error:** User clicks login, button shows "Signing in..." briefly, then goes back with no feedback.

**Cause:** The `signIn()` function has no try-catch, and with `redirect: true` (default), on error it redirects back to the sign-in page. User sees no error message.

**Fix:** Changed to `redirect: false`, handles the result object manually, and displays an error message in red:

```tsx
const result = await signIn("credentials", {
  email, password, callbackUrl: "/admin", redirect: false,
})
if (result?.error) setError("Invalid email or password")
else if (result?.url) window.location.href = result.url
```

---

## Environment Variables Required for Vercel

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth encryption key (generate with `crypto.randomBytes(32).toString('hex')`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_BASE_URL` | Vercel deployment URL |
