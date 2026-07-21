import Link from "next/link"
import { formatDate } from "@lib/utils"
import { T } from "@lib/lang"

interface Props {
  title: string
  titleML?: string | null
  slug: string
  shortDescription: string
  shortDescriptionML?: string | null
  coverImage?: string | null
  publishedAt?: Date | string | null
  category?: { name: string; nameML?: string | null } | null
}

export function ActivityCard({
  title,
  titleML,
  slug,
  shortDescription,
  shortDescriptionML,
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
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <T en="No image" ml="ചിത്രം ഇല്ല" />
            </div>
          )}
        </div>
        <div className="space-y-1">
          {category && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              <T en={category.name} ml={category.nameML} />
            </p>
          )}
          <h3 className="font-semibold text-lg group-hover:text-foreground transition-colors">
            <T en={title} ml={titleML} />
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            <T en={shortDescription} ml={shortDescriptionML} />
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
