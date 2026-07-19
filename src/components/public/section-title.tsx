import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Props {
  title: string
  description?: string
  href?: string
}

export function SectionTitle({ title, description, href }: Props) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="text-neutral-500 mt-1">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
        >
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
