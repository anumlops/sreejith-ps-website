# Sreejith P.S. Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready premium portfolio/archive website with admin panel

**Architecture:** Single Next.js 15 App Router app. Public surface served from server components + Server Actions. Admin surface protected by NextAuth middleware. Prisma ORM on Neon PostgreSQL. Cloudinary for images, YouTube for videos.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind, shadcn/ui, Framer Motion, Prisma, Neon, Cloudinary, NextAuth, React Hook Form, Zod

---

## File Structure

```
📁 sreejith-ps-website/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── activities/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── apec-vision/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── videos/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── auth/
│   │   │   └── signin/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── activities/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── videos/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── upload/route.ts
│   │   │   └── revalidate/route.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── public/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── activity-card.tsx
│   │   │   ├── section-title.tsx
│   │   │   ├── masonry-gallery.tsx
│   │   │   ├── lightbox.tsx
│   │   │   ├── video-card.tsx
│   │   │   ├── contact-form.tsx
│   │   │   └── theme-toggle.tsx
│   │   └── admin/
│   │       ├── admin-sidebar.tsx
│   │       ├── dashboard-stats.tsx
│   │       └── activity-form.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── auth.config.ts
│   │   ├── cloudinary.ts
│   │   ├── youtube.ts
│   │   └── utils.ts
│   ├── actions/
│   │   ├── activities.ts
│   │   └── settings.ts
│   └── types/
│       └── index.ts
├── public/
│   └── robots.txt
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── components.json
├── vercel.json
└── package.json
```

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `.env.example`
- Create: `components.json`

- [ ] **Step 1: Initialize project**

Run:
```powershell
cd "C:\Users\Anu\OneDrive\Desktop\Personal project\Paa protoflio 3"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

- [ ] **Step 2: Install dependencies**

```powershell
npm install prisma @prisma/client @auth/prisma-adapter next-auth@beta @auth/core
npm install cloudinary @next/third-parties
npm install react-hook-form @hookform/resolvers zod
npm install framer-motion
npm install lucide-react
npm install sonner
npm install rehype prettier
npm install sharp
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-tabs @radix-ui/react-avatar @radix-ui/react-toast @radix-ui/react-select @radix-ui/react-checkbox
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate
npm install @tailwindcss/typography
npm install next-sitemap
```

- [ ] **Step 3: Install shadcn CLI and initialize**

```powershell
npx shadcn@latest init
```

(Answer defaults: Yes to TypeScript, Yes to Tailwind, choose Neutral or Slate or Zinc color, Yes to CSS variables, use `@/` alias)

- [ ] **Step 4: Add basic shadcn components**

```powershell
npx shadcn@latest add button card input textarea dialog sheet dropdown-menu separator table tabs badge avatar toast select checkbox
```

- [ ] **Step 5: Create `.env.example`**

```
# Database
DATABASE_URL="postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth
AUTH_SECRET="your-secret-here"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

- [ ] **Step 6: Create `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@components",
    "utils": "@lib/utils",
    "ui": "@components/ui",
    "lib": "@lib",
    "hooks": "@hooks"
  }
}
```

---

### Task 2: Prisma Schema + Database Setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`

- [ ] **Step 1: Write Prisma schema**

`prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String    @id @default(cuid())
  name           String?
  email          String    @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  role           String    @default("admin")
  accounts       Account[]
  sessions       Session[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Activity {
  id               String     @id @default(cuid())
  title            String
  slug             String     @unique
  shortDescription String     @db.Text
  story            String     @db.Text
  coverImage       String?
  youtubeVideoId   String?
  categoryId       String?
  category         Category?  @relation(fields: [categoryId], references: [id])
  images           Image[]
  status           String     @default("draft")
  publishedAt      DateTime?
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
}

model Image {
  id           String   @id @default(cuid())
  activityId   String?
  activity     Activity? @relation(fields: [activityId], references: [id], onDelete: Cascade)
  imageUrl     String   @db.Text
  caption      String?
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
}

model Category {
  id        String     @id @default(cuid())
  name      String     @unique
  slug      String     @unique
  activities Activity[]
  createdAt DateTime   @default(now())
}

model Setting {
  id            String   @id @default(cuid())
  siteName      String   @default("Sreejith P.S.")
  heroTitle     String   @default("Inspiring Change Through Action")
  heroSubtitle  String   @default("Agricultural & Physical Education Center")
  contactEmail  String?
  phone         String?
  address       String?
  logo          String?
  favicon       String?
  heroImage     String?
  socialLinks   String?  @db.Text
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

- [ ] **Step 2: Create `src/lib/prisma.ts`**

```typescript
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

- [ ] **Step 3: Generate and push schema**

```powershell
npx prisma generate
npx prisma db push
```

---

### Task 3: Authentication Setup

**Files:**
- Create: `src/lib/auth.config.ts`
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Create: `src/middleware.ts`
- Create: `src/app/auth/signin/page.tsx`

- [ ] **Step 1: Create `src/lib/auth.config.ts`**

```typescript
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      if (isOnAdmin && !isLoggedIn) return false
      return true
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        ;(session.user as any).role = (user as any).role
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
```

- [ ] **Step 2: Create `src/lib/auth.ts`**

```typescript
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.hashedPassword) return null
        const isValid = await bcrypt.compare(password, user.hashedPassword)
        if (!isValid) return null
        return user
      },
    }),
  ],
})
```

- [ ] **Step 3: Create route handler**

`src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import { handlers } from "@lib/auth"
export const { GET, POST } = handlers
```

- [ ] **Step 4: Create `src/middleware.ts`**

```typescript
import NextAuth from "next-auth"
import { authConfig } from "@lib/auth.config"

export default NextAuth(authConfig).auth

export const config = {
  matcher: ["/admin/:path*"],
}
```

- [ ] **Step 5: Create sign-in page**

`src/app/auth/signin/page.tsx`:
```typescript
import { auth, signIn } from "@lib/auth"
import { redirect } from "next/navigation"
import { AuthForm } from "./auth-form"

export default async function SignIn() {
  const session = await auth()
  if (session?.user) redirect("/admin")
  return <AuthForm />
}
```

- [ ] **Step 6: Create `src/app/auth/signin/auth-form.tsx`**

```typescript
"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Separator } from "@components/ui/separator"
import { Chrome } from "lucide-react"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signIn("credentials", { email, password, callbackUrl: "/admin" })
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          <Separator />
          <form onSubmit={handleCredentialsLogin} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in with Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

### Task 4: Lib Utilities + Types + Cloudinary + YouTube

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/cloudinary.ts`
- Create: `src/lib/youtube.ts`
- Create: `src/types/index.ts`
- Create: `src/lib/validations.ts`

- [ ] **Step 1: `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
```

- [ ] **Step 2: `src/lib/cloudinary.ts`**

```typescript
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  file: string,
  folder = "sreejith-ps"
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  })
  return result.secure_url
}

export async function deleteImage(url: string) {
  const publicId = url.split("/").pop()?.split(".")[0]
  if (publicId) await cloudinary.uploader.destroy(`sreejith-ps/${publicId}`)
}

export { cloudinary }
```

- [ ] **Step 3: `src/lib/youtube.ts`**

```typescript
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/shorts\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function getYouTubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}`
}

export function getYouTubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}
```

- [ ] **Step 4: `src/types/index.ts`**

```typescript
export interface ActivityWithImages {
  id: string
  title: string
  slug: string
  shortDescription: string
  story: string
  coverImage: string | null
  youtubeVideoId: string | null
  category: { id: string; name: string; slug: string } | null
  images: { id: string; imageUrl: string; caption: string | null; displayOrder: number }[]
  status: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface SettingsData {
  siteName: string
  heroTitle: string
  heroSubtitle: string
  contactEmail: string | null
  phone: string | null
  address: string | null
  logo: string | null
  favicon: string | null
  heroImage: string | null
  socialLinks: string | null
}
```

---

### Task 5: Server Actions

**Files:**
- Create: `src/actions/activities.ts`
- Create: `src/actions/settings.ts`

- [ ] **Step 1: `src/actions/activities.ts`**

```typescript
"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@lib/prisma"
import { slugify } from "@lib/utils"
import { z } from "zod"

const activitySchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  story: z.string().min(1),
  coverImage: z.string().optional().nullable(),
  youtubeVideoId: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional().nullable(),
  images: z.array(z.object({ imageUrl: z.string(), caption: z.string().optional().nullable(), displayOrder: z.number() })).optional(),
})

export async function createActivity(data: z.infer<typeof activitySchema>) {
  const validated = activitySchema.parse(data)
  let slug = slugify(validated.title)
  const existing = await prisma.activity.findUnique({ where: { slug } })
  if (existing) slug = `${slug}-${Date.now()}`

  const activity = await prisma.activity.create({
    data: {
      title: validated.title,
      slug,
      shortDescription: validated.shortDescription,
      story: validated.story,
      coverImage: validated.coverImage,
      youtubeVideoId: validated.youtubeVideoId,
      categoryId: validated.categoryId,
      status: validated.status,
      publishedAt: validated.status === "published" ? new Date().toISOString() : null,
      images: validated.images ? { create: validated.images } : undefined,
    },
  })

  revalidatePath("/")
  revalidatePath("/activities")
  revalidatePath("/admin/activities")
  return activity
}

export async function updateActivity(id: string, data: z.infer<typeof activitySchema>) {
  const validated = activitySchema.parse(data)

  await prisma.image.deleteMany({ where: { activityId: id } })

  const activity = await prisma.activity.update({
    where: { id },
    data: {
      title: validated.title,
      shortDescription: validated.shortDescription,
      story: validated.story,
      coverImage: validated.coverImage,
      youtubeVideoId: validated.youtubeVideoId,
      categoryId: validated.categoryId,
      status: validated.status,
      publishedAt: validated.status === "published" ? validated.publishedAt || new Date().toISOString() : null,
      images: validated.images ? { create: validated.images } : undefined,
    },
  })

  revalidatePath("/")
  revalidatePath("/activities")
  revalidatePath(`/activities/${activity.slug}`)
  revalidatePath("/admin/activities")
  return activity
}

export async function deleteActivity(id: string) {
  const activity = await prisma.activity.findUnique({ where: { id } })
  if (!activity) throw new Error("Not found")
  await prisma.image.deleteMany({ where: { activityId: id } })
  await prisma.activity.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/activities")
  revalidatePath("/admin/activities")
}

export async function getActivity(id: string) {
  return prisma.activity.findUnique({
    where: { id },
    include: { images: { orderBy: { displayOrder: "asc" } }, category: true },
  })
}

export async function getActivityBySlug(slug: string) {
  return prisma.activity.findFirst({
    where: { slug, status: "published" },
    include: { images: { orderBy: { displayOrder: "asc" } }, category: true },
  })
}

export async function getPublishedActivities() {
  return prisma.activity.findMany({
    where: { status: "published" },
    include: { images: { take: 1 }, category: true },
    orderBy: { publishedAt: "desc" },
  })
}

export async function getAllActivities() {
  return prisma.activity.findMany({
    include: { images: { take: 1 }, category: true },
    orderBy: { createdAt: "desc" },
  })
}

export async function getRecentActivities(limit = 5) {
  return prisma.activity.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  })
}

export async function getDashboardStats() {
  const [total, drafts, published, categories] = await Promise.all([
    prisma.activity.count(),
    prisma.activity.count({ where: { status: "draft" } }),
    prisma.activity.count({ where: { status: "published" } }),
    prisma.category.count(),
  ])
  return { total, drafts, published, categories }
}
```

- [ ] **Step 2: `src/actions/settings.ts`**

```typescript
"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@lib/prisma"
import { z } from "zod"

const settingsSchema = z.object({
  siteName: z.string().min(1),
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  contactEmail: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  favicon: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable(),
  socialLinks: z.string().optional().nullable(),
})

export async function updateSettings(data: z.infer<typeof settingsSchema>) {
  const validated = settingsSchema.parse(data)
  const settings = await prisma.setting.upsert({
    where: { id: "default" },
    update: validated,
    create: { id: "default", ...validated },
  })
  revalidatePath("/")
  revalidatePath("/admin/settings")
  return settings
}

export async function getSettings() {
  const settings = await prisma.setting.findUnique({ where: { id: "default" } })
  return settings ?? {
    id: "default",
    siteName: "Sreejith P.S.",
    heroTitle: "Inspiring Change Through Action",
    heroSubtitle: "Agricultural & Physical Education Center",
    contactEmail: null,
    phone: null,
    address: null,
    logo: null,
    favicon: null,
    heroImage: null,
    socialLinks: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
```

---

### Task 6: Admin Layout + Sidebar + Dashboard

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/components/admin/admin-sidebar.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/components/admin/dashboard-stats.tsx`

- [ ] **Step 1: `src/components/admin/admin-sidebar.tsx`**

```typescript
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@lib/utils"
import { Button } from "@components/ui/button"
import { LayoutDashboard, ListOrdered, Images, Video, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/activities", label: "Activities", icon: ListOrdered },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="font-semibold text-lg">Admin Panel</h2>
        <p className="text-sm text-neutral-500">Sreejith P.S.</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-3", isActive && "bg-neutral-100 font-medium")}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          )
        })}
      </nav>
      <Button variant="ghost" className="justify-start gap-3 text-red-500" onClick={() => signOut()}>
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </aside>
  )
}
```

- [ ] **Step 2: `src/app/admin/layout.tsx`**

```typescript
import { AdminSidebar } from "@components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-neutral-50">{children}</main>
    </div>
  )
}
```

- [ ] **Step 3: `src/components/admin/dashboard-stats.tsx`**

```typescript
import { Card, CardContent } from "@components/ui/card"
import { FileText, FileCheck, FilePen, Folder } from "lucide-react"

interface Stats {
  total: number
  drafts: number
  published: number
  categories: number
}

const statCards = [
  { label: "Total Activities", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Published", icon: FileCheck, color: "text-green-600", bg: "bg-green-50" },
  { label: "Drafts", icon: FilePen, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Categories", icon: Folder, color: "text-purple-600", bg: "bg-purple-50" },
]

export function DashboardStats({ stats }: { stats: Stats }) {
  const values = [stats.total, stats.published, stats.drafts, stats.categories]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => {
        const Icon = card.icon
        return (
          <Card key={card.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{values[i]}</p>
                <p className="text-sm text-neutral-500">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: `src/app/admin/page.tsx`**

```typescript
import Link from "next/link"
import { getDashboardStats, getRecentActivities } from "@actions/activities"
import { DashboardStats } from "@components/admin/dashboard-stats"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Plus } from "lucide-react"
import { formatDate } from "@lib/utils"

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getDashboardStats(), getRecentActivities(5)])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/admin/activities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Activity
          </Button>
        </Link>
      </div>

      <DashboardStats stats={stats} />

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-neutral-500 text-sm">No activities yet. Create your first one!</p>
          ) : (
            <div className="space-y-3">
              {recent.map((a) => (
                <Link key={a.id} href={`/admin/activities/${a.id}/edit`} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-neutral-500">{formatDate(a.createdAt)}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${a.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {a.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

---

### Task 7: Admin Activities List + Create/Edit Forms

**Files:**
- Create: `src/components/admin/activity-form.tsx`
- Create: `src/app/admin/activities/page.tsx`
- Create: `src/app/admin/activities/new/page.tsx`
- Create: `src/app/admin/activities/[id]/edit/page.tsx`

- [ ] **Step 1: `src/app/admin/activities/page.tsx`**

```typescript
import Link from "next/link"
import { getAllActivities, deleteActivity } from "@actions/activities"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { formatDate } from "@lib/utils"
import { DeleteButton } from "./delete-button"

export default async function AdminActivities() {
  const activities = await getAllActivities()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activities</h1>
        <Link href="/admin/activities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Activity
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {activities.length === 0 ? (
            <div className="p-6 text-center text-neutral-500">No activities yet.</div>
          ) : (
            <div className="divide-y">
              {activities.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    {a.coverImage && (
                      <img src={a.coverImage} alt="" className="w-12 h-12 rounded object-cover" />
                    )}
                    <div>
                      <p className="font-medium">{a.title}</p>
                      <p className="text-sm text-neutral-500">{formatDate(a.createdAt)} · {a.category?.name ?? "Uncategorized"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${a.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {a.status}
                    </span>
                    <Link href={`/admin/activities/${a.id}/edit`}>
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    </Link>
                    <DeleteButton id={a.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Delete button component**

`src/app/admin/activities/delete-button.tsx`:
```typescript
"use client"

import { deleteActivity } from "@actions/activities"
import { Button } from "@components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-500"
      onClick={async () => {
        if (confirm("Delete this activity?")) {
          await deleteActivity(id)
          router.refresh()
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
```

- [ ] **Step 3: `src/components/admin/activity-form.tsx`**

```typescript
"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createActivity, updateActivity } from "@actions/activities"
import { extractYouTubeId } from "@lib/youtube"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Card, CardContent } from "@components/ui/card"
import { Upload, X, Save, Send, ImagePlus } from "lucide-react"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

interface ImageData {
  imageUrl: string
  caption?: string | null
  displayOrder: number
}

interface Props {
  activity?: any
  categories: Category[]
}

export function ActivityForm({ activity, categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(activity?.title ?? "")
  const [shortDescription, setShortDescription] = useState(activity?.shortDescription ?? "")
  const [story, setStory] = useState(activity?.story ?? "")
  const [categoryId, setCategoryId] = useState(activity?.categoryId ?? "")
  const [coverImage, setCoverImage] = useState(activity?.coverImage ?? "")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [youtubeVideoId, setYoutubeVideoId] = useState(activity?.youtubeVideoId ?? "")
  const [images, setImages] = useState<ImageData[]>(activity?.images ?? [])
  const [uploading, setUploading] = useState(false)

  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url)
    const id = extractYouTubeId(url)
    if (id) setYoutubeVideoId(id)
  }

  const uploadToCloudinary = useCallback(async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()
    setUploading(false)
    return data.url
  }, [])

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadToCloudinary(file)
    setCoverImage(url)
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const url = await uploadToCloudinary(file)
      setImages((prev) => [...prev, { imageUrl: url, caption: null, displayOrder: prev.length }])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (status: "draft" | "published") => {
    setLoading(true)
    try {
      const data = {
        title,
        shortDescription,
        story,
        coverImage: coverImage || null,
        youtubeVideoId: youtubeVideoId || null,
        categoryId: categoryId || null,
        status,
        images: images.map((img, i) => ({ ...img, displayOrder: i })),
      }

      if (activity) {
        await updateActivity(activity.id, data)
        toast("Activity updated")
      } else {
        await createActivity(data)
        toast("Activity created")
      }
      router.push("/admin/activities")
      router.refresh()
    } catch (err) {
      toast("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Activity title" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea id="shortDescription" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Brief summary..." rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Full Story</Label>
            <Textarea id="story" value={story} onChange={(e) => setStory(e.target.value)} placeholder="Write the full story..." rows={12} />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex items-center gap-4">
              <Button variant="outline" type="button" disabled={uploading} onClick={() => document.getElementById("cover-upload")?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Cover"}
              </Button>
              <input id="cover-upload" type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </div>
            {coverImage && (
              <div className="relative w-48 mt-2">
                <img src={coverImage} alt="Cover" className="w-48 h-32 object-cover rounded-lg" />
                <button onClick={() => setCoverImage("")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X className="h-3 w-3" /></button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <Button variant="outline" type="button" disabled={uploading} onClick={() => document.getElementById("gallery-upload")?.click()}>
              <ImagePlus className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Add Images"}
            </Button>
            <input id="gallery-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img.imageUrl} alt="" className="w-full h-24 object-cover rounded-lg" />
                    <button onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>YouTube Video</Label>
            <Input
              value={youtubeUrl}
              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
            {youtubeVideoId && (
              <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden">
                <iframe src={`https://www.youtube.com/embed/${youtubeVideoId}`} className="w-full h-full" allowFullScreen />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button variant="secondary" disabled={loading} onClick={() => handleSubmit("draft")}>
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button disabled={loading} onClick={() => handleSubmit("published")}>
          <Send className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: `src/app/admin/activities/new/page.tsx`**

```typescript
import { prisma } from "@lib/prisma"
import { ActivityForm } from "@components/admin/activity-form"

export default async function NewActivity() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  return <ActivityForm categories={categories} />
}
```

- [ ] **Step 5: `src/app/admin/activities/[id]/edit/page.tsx`**

```typescript
import { prisma } from "@lib/prisma"
import { notFound } from "next/navigation"
import { ActivityForm } from "@components/admin/activity-form"

export default async function EditActivity({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [activity, categories] = await Promise.all([
    prisma.activity.findUnique({
      where: { id },
      include: { images: { orderBy: { displayOrder: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])
  if (!activity) notFound()
  return <ActivityForm activity={activity} categories={categories} />
}
```

---

### Task 8: Upload API Route + Admin Videos + Settings Pages

**Files:**
- Create: `src/app/api/upload/route.ts`
- Create: `src/app/admin/videos/page.tsx`
- Create: `src/app/admin/settings/page.tsx`

- [ ] **Step 1: `src/app/api/upload/route.ts`**

```typescript
import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const result = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sreejith-ps", resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result))
    )
    stream.end(buffer)
  })

  return NextResponse.json({ url: result.secure_url })
}
```

- [ ] **Step 2: `src/app/admin/videos/page.tsx`**

```typescript
import { prisma } from "@lib/prisma"
import { Card, CardContent } from "@components/ui/card"
import { getYouTubeThumbnail } from "@lib/youtube"

export default async function AdminVideos() {
  const activities = await prisma.activity.findMany({
    where: { youtubeVideoId: { not: null } },
    select: { id: true, title: true, youtubeVideoId: true, status: true, slug: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Videos</h1>
      {activities.length === 0 ? (
        <p className="text-neutral-500">No videos added yet. Add a YouTube link when creating an activity.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4">
                <img src={getYouTubeThumbnail(a.youtubeVideoId!)} alt={a.title} className="w-full aspect-video object-cover rounded-lg mb-2" />
                <p className="font-medium text-sm truncate">{a.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {a.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: `src/app/admin/settings/page.tsx`**

```typescript
import { getSettings } from "@actions/settings"
import { SettingsForm } from "./settings-form"

export default async function AdminSettings() {
  const settings = await getSettings()
  return <SettingsForm settings={settings} />
}
```

- [ ] **Step 4: `src/app/admin/settings/settings-form.tsx`**

```typescript
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateSettings } from "@actions/settings"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Label } from "@components/ui/label"
import { Card, CardContent } from "@components/ui/card"
import { toast } from "sonner"

export function SettingsForm({ settings }: { settings: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    siteName: settings.siteName ?? "",
    heroTitle: settings.heroTitle ?? "",
    heroSubtitle: settings.heroSubtitle ?? "",
    contactEmail: settings.contactEmail ?? "",
    phone: settings.phone ?? "",
    address: settings.address ?? "",
    socialLinks: settings.socialLinks ?? "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await updateSettings(form)
    toast("Settings updated")
    router.refresh()
    setLoading(false)
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input value={form.siteName} onChange={set("siteName")} />
            </div>
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input value={form.heroTitle} onChange={set("heroTitle")} />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Input value={form.heroSubtitle} onChange={set("heroSubtitle")} />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input type="email" value={form.contactEmail} onChange={set("contactEmail")} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={set("phone")} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea value={form.address} onChange={set("address")} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Social Links (JSON)</Label>
              <Textarea value={form.socialLinks} onChange={set("socialLinks")} rows={3} placeholder='{"instagram":"...","facebook":"...","youtube":"..."}' />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Settings"}</Button>
      </form>
    </div>
  )
}
```

---

### Task 9: Public Layout + Header + Footer

**Files:**
- Create: `src/components/public/header.tsx`
- Create: `src/components/public/footer.tsx`
- Create: `src/components/public/theme-toggle.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: `src/components/public/header.tsx`**

```typescript
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@components/ui/button"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activities", label: "Activities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/apec-vision", label: "APEC Vision" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Sreejith P.S.
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-sm font-normal",
                  pathname === link.href && "bg-neutral-100 font-medium"
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className={cn("w-full justify-start", pathname === link.href && "bg-neutral-100")}>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: `src/components/public/footer.tsx`**

```typescript
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Sreejith P.S.</h3>
            <p className="text-sm text-neutral-600">Dedicated to community development through agriculture and physical education.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <div className="space-y-1">
              {[
                { href: "/about", label: "About" },
                { href: "/activities", label: "Activities" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-neutral-600 hover:text-neutral-900">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">APEC</h3>
            <p className="text-sm text-neutral-600">Agricultural & Physical Education Center</p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Sreejith P.S. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Modify `src/app/globals.css`**

Add Tailwind typography and animations to the existing globals.css content.

- [ ] **Step 4: Modify `src/app/layout.tsx`**

```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@components/public/header"
import { Footer } from "@components/public/footer"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sreejith P.S. | Agricultural & Physical Education Center",
  description: "Inspiring change through action — community development through agriculture and physical education.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
```

---

### Task 10: Home Page

**Files:**
- Create: `src/components/public/hero-section.tsx`
- Create: `src/components/public/activity-card.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: `src/components/public/hero-section.tsx`**

```typescript
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@components/ui/button"

interface Props {
  title: string
  subtitle: string
  heroImage?: string | null
}

export function HeroSection({ title, subtitle, heroImage }: Props) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {heroImage ? (
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 mb-8"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link href="/activities">
            <Button size="lg" variant="default" className="bg-white text-black hover:bg-white/90">
              View Activities
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/components/public/activity-card.tsx`**

```typescript
import Link from "next/link"
import { formatDate } from "@lib/utils"

interface Props {
  title: string
  slug: string
  shortDescription: string
  coverImage?: string | null
  publishedAt?: string | null
  category?: { name: string } | null
}

export function ActivityCard({ title, slug, shortDescription, coverImage, publishedAt, category }: Props) {
  return (
    <Link href={`/activities/${slug}`} className="group block">
      <article className="space-y-3">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">No image</div>
          )}
        </div>
        <div className="space-y-1">
          {category && <p className="text-xs text-neutral-500 uppercase tracking-wider">{category.name}</p>}
          <h3 className="font-semibold text-lg group-hover:text-neutral-600 transition-colors">{title}</h3>
          <p className="text-sm text-neutral-500 line-clamp-2">{shortDescription}</p>
          {publishedAt && <p className="text-xs text-neutral-400">{formatDate(publishedAt)}</p>}
        </div>
      </article>
    </Link>
  )
}
```

- [ ] **Step 3: `src/app/page.tsx`**

```typescript
import { getSettings } from "@actions/settings"
import { getPublishedActivities } from "@actions/activities"
import { HeroSection } from "@components/public/hero-section"
import { ActivityCard } from "@components/public/activity-card"
import { SectionTitle } from "@components/public/section-title"

export default async function Home() {
  const [settings, activities] = await Promise.all([
    getSettings(),
    getPublishedActivities(),
  ])
  const featured = activities.slice(0, 3)

  return (
    <>
      <HeroSection title={settings.heroTitle} subtitle={settings.heroSubtitle} heroImage={settings.heroImage} />

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <SectionTitle
            title="Latest Activities"
            description="Recent events and initiatives"
            href="/activities"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {featured.map((a) => (
              <ActivityCard key={a.id} {...a} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-neutral-50 py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">About Sreejith P.S.</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Dedicated to empowering communities through sustainable agriculture and physical education.
            APEC (Agricultural & Physical Education Center) is the vision that drives meaningful change.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Create `src/components/public/section-title.tsx`**

```typescript
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Props {
  title: string
  description?: string
  href?: string
}

export function SectionTitle({ title, description, href }: Props) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="text-neutral-500 mt-1">{description}</p>}
      </div>
      {href && (
        <Link href={href} className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
```

---

### Task 11: About + APEC Vision Pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/apec-vision/page.tsx`

- [ ] **Step 1: `src/app/about/page.tsx`**

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Sreejith P.S.",
  description: "Learn about Sreejith P.S. — journey, values, and mission.",
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-8">About</h1>
      <div className="prose prose-neutral max-w-none">
        <p className="text-xl text-neutral-600 leading-relaxed">
          Sreejith P.S. is a community leader dedicated to transforming lives through
          sustainable agriculture and physical education.
        </p>
        <h2>Journey</h2>
        <p>
          With years of experience in community development, Sreejith has worked tirelessly
          to bridge the gap between traditional agricultural practices and modern sustainable
          methods, all while promoting health and wellness through physical education.
        </p>
        <h2>Values</h2>
        <ul>
          <li><strong>Community First</strong> — Every initiative starts with the community's needs</li>
          <li><strong>Sustainability</strong> — Building practices that last for generations</li>
          <li><strong>Education</strong> — Empowering through knowledge and skills</li>
          <li><strong>Wellness</strong> — Promoting physical and mental well-being</li>
        </ul>
        <h2>Mission</h2>
        <p>
          To create a healthier, more sustainable world by empowering communities with
          the knowledge, skills, and resources they need to thrive.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: `src/app/apec-vision/page.tsx`**

```typescript
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "APEC Vision | Sreejith P.S.",
  description: "Agricultural & Physical Education Center — vision for community transformation.",
}

export default function ApecVision() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-8">APEC Vision</h1>
      <div className="prose prose-neutral max-w-none">
        <h2>Agricultural & Physical Education Center</h2>
        <p className="text-xl text-neutral-600">
          APEC represents a holistic approach to community development, combining
          agricultural sustainability with physical wellness.
        </p>
        <h2>Our Vision</h2>
        <p>
          A world where every community has access to sustainable food systems and
          opportunities for physical activity that promote health, well-being, and
          social connection.
        </p>
        <h2>Key Focus Areas</h2>
        <ul>
          <li>Sustainable farming practices and education</li>
          <li>Community physical education programs</li>
          <li>Youth development and leadership</li>
          <li>Environmental conservation</li>
          <li>Health and wellness initiatives</li>
        </ul>
      </div>
    </div>
  )
}
```

---

### Task 12: Activities List + Detail Pages

**Files:**
- Create: `src/app/activities/page.tsx`
- Create: `src/app/activities/[slug]/page.tsx`

- [ ] **Step 1: `src/app/activities/page.tsx`**

```typescript
import type { Metadata } from "next"
import { getPublishedActivities } from "@actions/activities"
import { ActivityCard } from "@components/public/activity-card"

export const metadata: Metadata = {
  title: "Activities | Sreejith P.S.",
  description: "Browse all activities and initiatives by Sreejith P.S.",
}

export default async function Activities() {
  const activities = await getPublishedActivities()

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Activities</h1>
      <p className="text-xl text-neutral-600 mb-12">Events, initiatives, and community programs.</p>
      {activities.length === 0 ? (
        <p className="text-neutral-500">No activities published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((a) => (
            <ActivityCard key={a.id} {...a} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: `src/app/activities/[slug]/page.tsx`**

```typescript
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getActivityBySlug, getPublishedActivities } from "@actions/activities"
import { formatDate } from "@lib/utils"
import { ActivityCard } from "@components/public/activity-card"
import { LightboxGallery } from "./lightbox-gallery"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)
  if (!activity) return { title: "Not Found" }
  return {
    title: `${activity.title} | Sreejith P.S.`,
    description: activity.shortDescription,
    openGraph: activity.coverImage ? { images: [activity.coverImage] } : undefined,
  }
}

export default async function ActivityDetail({ params }: Props) {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)
  if (!activity) notFound()

  const allActivities = await getPublishedActivities()
  const related = allActivities.filter((a) => a.id !== activity.id).slice(0, 3)

  return (
    <article className="max-w-4xl mx-auto px-4 py-24">
      {activity.coverImage && (
        <img src={activity.coverImage} alt={activity.title} className="w-full aspect-video object-cover rounded-2xl mb-12" />
      )}

      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          {activity.category && <span className="text-xs uppercase tracking-wider">{activity.category.name}</span>}
          <span>{activity.publishedAt && formatDate(activity.publishedAt)}</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">{activity.title}</h1>
        <p className="text-xl text-neutral-600">{activity.shortDescription}</p>
      </div>

      <div className="prose prose-neutral max-w-none mb-16">
        {activity.story.split("\n").map((p, i) => p.trim() && <p key={i}>{p}</p>)}
      </div>

      {activity.images.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <LightboxGallery images={activity.images} />
        </div>
      )}

      {activity.youtubeVideoId && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Video</h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${activity.youtubeVideoId}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="border-t pt-16">
          <h2 className="text-2xl font-bold mb-8">Related Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((a) => (
              <ActivityCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
```

- [ ] **Step 3: `src/app/activities/[slug]/lightbox-gallery.tsx`**

```typescript
"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Image {
  id: string
  imageUrl: string
  caption?: string | null
}

export function LightboxGallery({ images }: { images: Image[] }) {
  const [current, setCurrent] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button key={img.id} onClick={() => setCurrent(i)} className="aspect-square rounded-xl overflow-hidden">
            <img src={img.imageUrl} alt={img.caption ?? ""} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </button>
        ))}
      </div>
      {current !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setCurrent(null)}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setCurrent(null)}><X className="h-8 w-8" /></button>
          {current > 0 && (
            <button className="absolute left-4 text-white" onClick={(e) => { e.stopPropagation(); setCurrent(current - 1) }}>
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {current < images.length - 1 && (
            <button className="absolute right-4 text-white" onClick={(e) => { e.stopPropagation(); setCurrent(current + 1) }}>
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
          <img
            src={images[current].imageUrl}
            alt={images[current].caption ?? ""}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
```

---

### Task 13: Gallery Page (Masonry + Lightbox)

**Files:**
- Create: `src/app/gallery/page.tsx`
- Create: `src/components/public/masonry-gallery.tsx`

- [ ] **Step 1: `src/app/gallery/page.tsx`**

```typescript
import type { Metadata } from "next"
import { prisma } from "@lib/prisma"
import { GalleryClient } from "./gallery-client"

export const metadata: Metadata = {
  title: "Gallery | Sreejith P.S.",
  description: "Photo gallery of activities and events.",
}

export default async function Gallery() {
  const images = await prisma.image.findMany({
    where: { activity: { status: "published" } },
    include: { activity: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Gallery</h1>
      <p className="text-xl text-neutral-600 mb-12">Moments captured from our activities.</p>
      <GalleryClient images={images} />
    </div>
  )
}
```

- [ ] **Step 2: `src/app/gallery/gallery-client.tsx`**

```typescript
"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: string
  imageUrl: string
  caption: string | null
  activity: { title: string }
}

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState<number | null>(null)

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <button key={img.id} onClick={() => setCurrent(i)} className="break-inside-avoid rounded-xl overflow-hidden">
            <img src={img.imageUrl} alt={img.caption ?? img.activity.title} className="w-full hover:scale-105 transition-transform duration-300" loading="lazy" />
          </button>
        ))}
      </div>
      {current !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setCurrent(null)}>
          <button className="absolute top-4 right-4 text-white z-10" onClick={() => setCurrent(null)}><X className="h-8 w-8" /></button>
          {current > 0 && (
            <button className="absolute left-4 text-white z-10" onClick={(e) => { e.stopPropagation(); setCurrent(current - 1) }}>
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {current < images.length - 1 && (
            <button className="absolute right-4 text-white z-10" onClick={(e) => { e.stopPropagation(); setCurrent(current + 1) }}>
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
          <img src={images[current].imageUrl} alt={images[current].caption ?? ""} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
```

---

### Task 14: Videos + Contact Pages

**Files:**
- Create: `src/app/videos/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/components/public/video-card.tsx`
- Create: `src/components/public/contact-form.tsx`

- [ ] **Step 1: `src/components/public/video-card.tsx`**

```typescript
"use client"

import { useState } from "react"
import { getYouTubeThumbnail } from "@lib/youtube"

interface Props {
  videoId: string
  title: string
}

export function VideoCard({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden">
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} className="w-full h-full" allowFullScreen allow="autoplay" />
      </div>
    )
  }

  return (
    <button onClick={() => setPlaying(true)} className="group relative aspect-video rounded-xl overflow-hidden bg-neutral-100 w-full">
      <img src={getYouTubeThumbnail(videoId)} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-black ml-1" />
        </div>
      </div>
    </button>
  )
}
```

- [ ] **Step 2: `src/app/videos/page.tsx`**

```typescript
import type { Metadata } from "next"
import { prisma } from "@lib/prisma"
import { VideoCard } from "@components/public/video-card"

export const metadata: Metadata = {
  title: "Videos | Sreejith P.S.",
  description: "Watch videos of activities and events.",
}

export default async function Videos() {
  const activities = await prisma.activity.findMany({
    where: { youtubeVideoId: { not: null }, status: "published" },
    select: { id: true, title: true, youtubeVideoId: true, shortDescription: true, slug: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Videos</h1>
      <p className="text-xl text-neutral-600 mb-12">Watch our activities in action.</p>
      {activities.length === 0 ? (
        <p className="text-neutral-500">No videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((a) => (
            <div key={a.id} className="space-y-3">
              <VideoCard videoId={a.youtubeVideoId!} title={a.title} />
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-neutral-500">{a.shortDescription}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: `src/app/contact/page.tsx`**

```typescript
import type { Metadata } from "next"
import { getSettings } from "@actions/settings"
import { ContactForm } from "@components/public/contact-form"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Sreejith P.S.",
  description: "Get in touch with Sreejith P.S. and APEC.",
}

export default async function Contact() {
  const settings = await getSettings()

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Contact</h1>
      <p className="text-xl text-neutral-600 mb-12">Get in touch with us.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          {settings.phone && (
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 mt-1 text-neutral-400" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-neutral-600">{settings.phone}</p>
              </div>
            </div>
          )}
          {settings.contactEmail && (
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 mt-1 text-neutral-400" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-neutral-600">{settings.contactEmail}</p>
              </div>
            </div>
          )}
          {settings.address && (
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 text-neutral-400" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-neutral-600 whitespace-pre-line">{settings.address}</p>
              </div>
            </div>
          )}
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: `src/components/public/contact-form.tsx`**

```typescript
"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { toast } from "sonner"

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast("Message sent! We'll get back to you.")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Your Name" required />
      <Input type="email" placeholder="Your Email" required />
      <Input placeholder="Subject" />
      <Textarea placeholder="Your Message" rows={6} required />
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
```

---

### Task 15: SEO, Sitemap, Robots, Deployment Config

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `public/robots.txt`
- Create: `vercel.json`
- Modify: `next.config.ts`

- [ ] **Step 1: `src/app/sitemap.ts`**

```typescript
import { prisma } from "@lib/prisma"

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sreejith-ps.vercel.app"

  const activities = await prisma.activity.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  })

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/activities`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/apec-vision`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ]

  const activityPages = activities.map((a) => ({
    url: `${baseUrl}/activities/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...activityPages]
}
```

- [ ] **Step 2: `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://sreejith-ps.vercel.app/sitemap.xml
```

- [ ] **Step 3: `vercel.json`**

```json
{
  "framework": "nextjs"
}
```

- [ ] **Step 4: Update `next.config.ts`**

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
}

export default nextConfig
```

---

### Task 16: Seed Script (Categories + Default Admin)

**Files:**
- Create: `prisma/seed.ts`

- [ ] **Step 1: `prisma/seed.ts`**

```typescript
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: "Agriculture", slug: "agriculture" },
    { name: "Physical Education", slug: "physical-education" },
    { name: "Community Event", slug: "community-event" },
    { name: "Youth Program", slug: "youth-program" },
    { name: "Workshop", slug: "workshop" },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  const adminEmail = "admin@sreejithps.com"
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        hashedPassword: await bcrypt.hash("admin123", 12),
        role: "admin",
      },
    })
  }

  await prisma.setting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Sreejith P.S.",
      heroTitle: "Inspiring Change Through Action",
      heroSubtitle: "Agricultural & Physical Education Center",
    },
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())
```

- [ ] **Step 2: Add seed config to `package.json`**

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
.next/
.env
.env.local
*.log
```

---

### Task 17: Verify Build + Final Touches

- [ ] **Step 1: Run build to identify errors**

```powershell
npm run build
```

- [ ] **Step 2: Fix any build errors**

- [ ] **Step 3: Run lint**

```powershell
npm run lint
```
