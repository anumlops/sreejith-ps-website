import { prisma } from "@lib/prisma"
import { ActivityForm } from "@components/admin/activity-form"

export const dynamic = "force-dynamic"

export default async function NewActivity() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  })
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Activity</h1>
      <ActivityForm categories={categories} />
    </div>
  )
}
