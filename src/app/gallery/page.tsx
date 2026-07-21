import type { Metadata } from "next"
import { prisma } from "@lib/prisma"
import { GalleryClient } from "./gallery-client"
import { T } from "@lib/lang"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of activities and events.",
}

export default async function Gallery() {
  const images = await prisma.image.findMany({
    where: { activity: { status: "published" } },
    include: { activity: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4"><T en="Gallery" ml="ഗാലറി" /></h1>
      <p className="text-xl text-text-muted mb-12">
        <T en="Moments captured from our activities." ml="ഞങ്ങളുടെ പ്രവർത്തനങ്ങളിൽ നിന്നുള്ള നിമിഷങ്ങൾ." />
      </p>
      <GalleryClient images={images} />
    </div>
  )
}
