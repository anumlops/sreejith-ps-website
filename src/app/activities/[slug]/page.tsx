import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getActivityBySlug, getPublishedActivities } from "@actions/activities"
import { T } from "@lib/lang"

export const dynamic = "force-dynamic"
import { formatDate } from "@lib/utils"
import { ActivityCard } from "@components/public/activity-card"
import { LightboxGallery } from "./lightbox-gallery"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)
  if (!activity) return { title: "Not Found" }
  return {
    title: activity.title,
    description: activity.shortDescription,
    openGraph: activity.coverImage
      ? { images: [activity.coverImage] }
      : undefined,
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
        <img
          src={activity.coverImage}
          alt={activity.title}
          className="w-full aspect-video object-cover rounded-2xl mb-12"
        />
      )}

      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {activity.category && (
            <span className="text-xs uppercase tracking-wider">
              <T en={activity.category.name} ml={activity.category.nameML} />
            </span>
          )}
          <span>{activity.publishedAt && formatDate(activity.publishedAt)}</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          <T en={activity.title} ml={activity.titleML} />
        </h1>
        <p className="text-xl text-text-muted">
          <T en={activity.shortDescription} ml={activity.shortDescriptionML} />
        </p>
      </div>

      <div className="prose prose-neutral max-w-none mb-16 whitespace-pre-line">
        <T en={activity.story} ml={activity.storyML} />
      </div>

      {activity.images.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6"><T en="Gallery" ml="ഗാലറി" /></h2>
          <LightboxGallery images={activity.images} />
        </div>
      )}

      {activity.youtubeVideoId && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6"><T en="Video" ml="വീഡിയോ" /></h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={activity.youtubeVideoId}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="border-t pt-16">
          <h2 className="text-2xl font-bold mb-8"><T en="Related Activities" ml="ബന്ധപ്പെട്ട പ്രവർത്തനങ്ങൾ" /></h2>
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
