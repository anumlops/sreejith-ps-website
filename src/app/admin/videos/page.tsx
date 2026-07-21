import { prisma } from "@lib/prisma"
import { Card, CardContent } from "@components/ui/card"
import { getYouTubeThumbnail, isYouTubeEmbed } from "@lib/youtube"

export const dynamic = "force-dynamic"

export default async function AdminVideos() {
  const activities = await prisma.activity.findMany({
    where: { youtubeVideoId: { not: null } },
    select: {
      id: true,
      title: true,
      youtubeVideoId: true,
      status: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Videos</h1>
      {activities.length === 0 ? (
        <p className="text-neutral-500">
          No videos added yet. Add a YouTube or Google Drive link when creating an activity.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4">
                {getYouTubeThumbnail(a.youtubeVideoId!) ? (
                  <img
                    src={getYouTubeThumbnail(a.youtubeVideoId!)!}
                    alt={a.title}
                    className="w-full aspect-video object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-muted rounded-lg mb-2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                )}
                <p className="font-medium text-sm truncate">{a.title}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    a.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
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
