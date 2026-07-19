export interface ActivityWithImages {
  id: string
  title: string
  slug: string
  shortDescription: string
  story: string
  coverImage: string | null
  youtubeVideoId: string | null
  category: { id: string; name: string; slug: string } | null
  images: { id: string; imageUrl: string; caption: string | null; displayOrder: number }[]
  status: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface SettingsData {
  siteName: string
  heroTitle: string
  heroSubtitle: string
  contactEmail: string | null
  phone: string | null
  address: string | null
  logo: string | null
  favicon: string | null
  heroImage: string | null
  socialLinks: string | null
}
