import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { T } from "@lib/lang"

interface Props {
  title: ReactNode
  description?: ReactNode
  href?: string
}

export function SectionTitle({ title, description, href }: Props) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <T en="View all" ml="എല്ലാം കാണുക" /> <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}
