"use client"

import { useState } from "react"
import { getYouTubeThumbnail } from "@lib/youtube"

interface Props {
  videoId: string
  title: string
}

export function VideoCard({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay"
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group relative aspect-video rounded-xl overflow-hidden bg-muted w-full"
    >
      <img
        src={getYouTubeThumbnail(videoId)}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-transparent border-l-foreground ml-1" />
        </div>
      </div>
    </button>
  )
}
