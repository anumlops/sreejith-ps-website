export function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([^&?/]+)/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const drive = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`
  const driveId = url.match(/[?&]id=([^&]+)/)
  if (driveId && url.includes("drive.google.com")) return `https://drive.google.com/file/d/${driveId[1]}/preview`
  return null
}

export function isYouTubeEmbed(url: string): boolean {
  return url.includes("youtube.com/embed")
}

export function getYouTubeThumbnail(embedUrl: string): string | null {
  const match = embedUrl.match(/youtube\.com\/embed\/([^?]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null
}
