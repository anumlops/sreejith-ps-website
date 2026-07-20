import type { Metadata } from "next"
import { prisma } from "@lib/prisma"
import { VideoCard } from "@components/public/video-card"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch videos of activities and events.",
}

export default async function Videos() {
  const activities = await prisma.activity.findMany({
    where: { youtubeVideoId: { not: null }, status: "published" },
    select: {
      id: true,
      title: true,
      youtubeVideoId: true,
      shortDescription: true,
    },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Videos</h1>
      <p className="text-xl text-text-muted mb-12">
        Watch our activities in action.
      </p>
      {activities.length === 0 ? (
        <p className="text-muted-foreground">No videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((a) => (
            <div key={a.id} className="space-y-3">
              <VideoCard videoId={a.youtubeVideoId!} title={a.title} />
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground">
                {a.shortDescription}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
