"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Image {
  id: string
  imageUrl: string
  caption?: string | null
}

export function LightboxGallery({ images }: { images: Image[] }) {
  const [current, setCurrent] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setCurrent(i)}
            className="aspect-square rounded-xl overflow-hidden"
          >
            <img
              src={img.imageUrl}
              alt={img.caption ?? ""}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
            className="absolute top-4 right-4 text-white"
            onClick={() => setCurrent(null)}
          >
            <X className="h-8 w-8" />
          </button>
          {current > 0 && (
            <button
              className="absolute left-4 text-white"
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
              className="absolute right-4 text-white"
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
