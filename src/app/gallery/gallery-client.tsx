"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { T } from "@lib/lang"

interface GalleryImage {
  id: string
  imageUrl: string
  caption: string | null
  activity: { title: string } | null
}

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState<number | null>(null)

  if (images.length === 0) {
    return <p className="text-muted-foreground"><T en="No images in the gallery yet." ml="ഗാലറിയിൽ ഇതുവരെ ചിത്രങ്ങളൊന്നുമില്ല." /></p>
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setCurrent(i)}
            className="break-inside-avoid rounded-xl overflow-hidden"
          >
            <img
              src={img.imageUrl}
              alt={img.caption ?? img.activity?.title ?? "Gallery image"}
              className="w-full hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {current !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setCurrent(null)}
        >
          <button
            className="absolute top-4 right-4 text-white z-10"
            onClick={() => setCurrent(null)}
          >
            <X className="h-8 w-8" />
          </button>
          {current > 0 && (
            <button
              className="absolute left-4 text-white z-10"
              onClick={(e) => {
                e.stopPropagation()
                setCurrent(current - 1)
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {current < images.length - 1 && (
            <button
              className="absolute right-4 text-white z-10"
              onClick={(e) => {
                e.stopPropagation()
                setCurrent(current + 1)
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
          <img
            src={images[current].imageUrl}
            alt={images[current].caption ?? ""}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
