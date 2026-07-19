import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getActivityBySlug, getPublishedActivities } from "@actions/activities"

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
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          {activity.category && (
            <span className="text-xs uppercase tracking-wider">
              {activity.category.name}
            </span>
          )}
          <span>{activity.publishedAt && formatDate(activity.publishedAt)}</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          {activity.title}
        </h1>
        <p className="text-xl text-neutral-600">
          {activity.shortDescription}
        </p>
      </div>

      <div className="prose prose-neutral max-w-none mb-16">
        {activity.story
          .split("\n")
          .filter(Boolean)
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
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
