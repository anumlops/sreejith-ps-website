import { prisma } from "@lib/prisma"
import { notFound } from "next/navigation"
import { ActivityForm } from "@components/admin/activity-form"

export const dynamic = "force-dynamic"

export default async function EditActivity({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [activity, categories] = await Promise.all([
    prisma.activity.findUnique({
      where: { id },
      include: { images: { orderBy: { displayOrder: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])
  if (!activity) notFound()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Activity</h1>
      <ActivityForm activity={activity} categories={categories} />
    </div>
  )
}
