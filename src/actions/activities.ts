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
  images: z
    .array(
      z.object({
        imageUrl: z.string(),
        caption: z.string().optional().nullable(),
        displayOrder: z.number(),
      })
    )
    .optional(),
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
      publishedAt:
        validated.status === "published" ? new Date().toISOString() : null,
      images: validated.images
        ? { create: validated.images }
        : undefined,
    },
  })

  revalidatePath("/")
  revalidatePath("/activities")
  revalidatePath("/admin/activities")
  return activity
}

export async function updateActivity(
  id: string,
  data: z.infer<typeof activitySchema>
) {
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
      publishedAt:
        validated.status === "published"
          ? validated.publishedAt || new Date().toISOString()
          : null,
      images: validated.images
        ? { create: validated.images }
        : undefined,
    },
  })

  revalidatePath("/")
  revalidatePath("/activities")
  revalidatePath(`/activities/${activity.slug}`)
  revalidatePath("/admin/activities")
  return activity
}

export async function deleteActivity(id: string) {
  await prisma.image.deleteMany({ where: { activityId: id } })
  await prisma.activity.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/activities")
  revalidatePath("/admin/activities")
}

export async function getActivity(id: string) {
  return prisma.activity.findUnique({
    where: { id },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      category: true,
    },
  })
}

export async function getActivityBySlug(slug: string) {
  return prisma.activity.findFirst({
    where: { slug, status: "published" },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      category: true,
    },
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
