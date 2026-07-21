"use client"

import { useState } from "react"
import { getYouTubeThumbnail, isYouTubeEmbed } from "@lib/youtube"

interface Props {
  embedUrl: string
  title: string
}

export function VideoCard({ embedUrl, title }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`${embedUrl}${isYouTubeEmbed(embedUrl) ? "?autoplay=1" : ""}`}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay"
        />
      </div>
    )
  }

  const thumbnail = getYouTubeThumbnail(embedUrl)

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group relative aspect-video rounded-xl overflow-hidden bg-muted w-full"
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-transparent border-l-foreground ml-1" />
        </div>
      </div>
    </button>
  )
}
