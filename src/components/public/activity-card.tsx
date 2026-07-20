import Link from "next/link"
import { formatDate } from "@lib/utils"

interface Props {
  title: string
  slug: string
  shortDescription: string
  coverImage?: string | null
  publishedAt?: Date | string | null
  category?: { name: string } | null
}

export function ActivityCard({
  title,
  slug,
  shortDescription,
  coverImage,
  publishedAt,
  category,
}: Props) {
  return (
    <Link href={`/activities/${slug}`} className="group block">
      <article className="space-y-3">
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              No image
            </div>
          )}
        </div>
        <div className="space-y-1">
          {category && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {category.name}
            </p>
          )}
          <h3 className="font-semibold text-lg group-hover:text-foreground transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {shortDescription}
          </p>
          {publishedAt && (
            <p className="text-xs text-muted-foreground">
              {formatDate(publishedAt)}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
