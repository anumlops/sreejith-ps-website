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
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  })
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

  console.log("Seed complete: categories, admin user, and default settings created.")
}

main().catch(console.error).finally(() => prisma.$disconnect())
