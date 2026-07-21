"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@lib/prisma"
import { z } from "zod"

const settingsSchema = z.object({
  siteName: z.string().min(1),
  heroTitle: z.string().min(1),
  heroTitleML: z.string().optional().nullable(),
  heroSubtitle: z.string().min(1),
  heroSubtitleML: z.string().optional().nullable(),
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
  const settings = await prisma.setting.findUnique({
    where: { id: "default" },
  })
  return settings ?? {
    id: "default",
    siteName: "Sreejith P.S.",
    heroTitle: "Inspiring Change Through Action",
    heroTitleML: null,
    heroSubtitle: "Agricultural & Physical Education Center",
    heroSubtitleML: null,
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
