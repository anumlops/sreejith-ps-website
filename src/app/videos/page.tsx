import type { Metadata } from "next"
import { prisma } from "@lib/prisma"
import { VideoCard } from "@components/public/video-card"
import { T } from "@lib/lang"

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
      titleML: true,
      youtubeVideoId: true,
      shortDescription: true,
      shortDescriptionML: true,
    },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4"><T en="Videos" ml="വീഡിയോകൾ" /></h1>
      <p className="text-xl text-text-muted mb-12">
        <T en="Watch our activities in action." ml="ഞങ്ങളുടെ പ്രവർത്തനങ്ങൾ ആക്ഷനിൽ കാണുക." />
      </p>
      {activities.length === 0 ? (
        <p className="text-muted-foreground"><T en="No videos yet." ml="ഇതുവരെ വീഡിയോകളൊന്നുമില്ല." /></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((a) => (
            <div key={a.id} className="space-y-3">
              <VideoCard embedUrl={a.youtubeVideoId!} title={a.title} />
              <h3 className="font-semibold"><T en={a.title} ml={a.titleML} /></h3>
              <p className="text-sm text-muted-foreground">
                <T en={a.shortDescription} ml={a.shortDescriptionML} />
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
