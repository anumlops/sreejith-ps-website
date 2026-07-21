"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createActivity, updateActivity } from "@actions/activities"
import { getEmbedUrl } from "@lib/youtube"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Label } from "@components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import { Card, CardContent } from "@components/ui/card"
import { Upload, X, Save, Send, ImagePlus } from "lucide-react"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

interface ImageData {
  imageUrl: string
  caption?: string | null
  displayOrder: number
}

interface Props {
  activity?: {
    id: string
    title: string
    titleML?: string | null
    shortDescription: string
    shortDescriptionML?: string | null
    story: string
    storyML?: string | null
    section?: string
    coverImage?: string | null
    youtubeVideoId?: string | null
    categoryId?: string | null
    images?: ImageData[]
  }
  categories: Category[]
}

export function ActivityForm({ activity, categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(activity?.title ?? "")
  const [titleML, setTitleML] = useState(activity?.titleML ?? "")
  const [shortDescription, setShortDescription] = useState(
    activity?.shortDescription ?? ""
  )
  const [shortDescriptionML, setShortDescriptionML] = useState(
    activity?.shortDescriptionML ?? ""
  )
  const [story, setStory] = useState(activity?.story ?? "")
  const [storyML, setStoryML] = useState(activity?.storyML ?? "")
  const [section, setSection] = useState<string>(activity?.section ?? "activities")
  const [categoryId, setCategoryId] = useState(activity?.categoryId ?? "")
  const [coverImage, setCoverImage] = useState(activity?.coverImage ?? "")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [youtubeVideoId, setYoutubeVideoId] = useState(
    activity?.youtubeVideoId ?? ""
  )
  const [images, setImages] = useState<ImageData[]>(activity?.images ?? [])
  const [uploading, setUploading] = useState(false)

  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url)
    const embed = getEmbedUrl(url)
    if (embed) setYoutubeVideoId(embed)
  }

  const uploadToCloudinary = useCallback(async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()
    setUploading(false)
    return data.url
  }, [])

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadToCloudinary(file)
    setCoverImage(url)
  }

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const url = await uploadToCloudinary(file)
      setImages((prev) => [
        ...prev,
        { imageUrl: url, caption: null, displayOrder: prev.length },
      ])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (status: "draft" | "published") => {
    setLoading(true)
    try {
      const data = {
        title,
        titleML: titleML || null,
        shortDescription,
        shortDescriptionML: shortDescriptionML || null,
        story,
        storyML: storyML || null,
        section: section as "about" | "activities" | "gallery" | "videos" | "apec-vision",
        coverImage: coverImage || null,
        youtubeVideoId: youtubeVideoId || null,
        categoryId: categoryId || null,
        status,
        images: images.map((img, i) => ({ ...img, displayOrder: i })),
      }

      if (activity) {
        await updateActivity(activity.id, data)
        toast("Activity updated")
      } else {
        await createActivity(data)
        toast("Activity created")
      }
      router.push("/admin/activities")
      router.refresh()
    } catch {
      toast("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="about">About</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
                <SelectItem value="gallery">Gallery</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
                <SelectItem value="apec-vision">APEC Vision</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (English)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Activity title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="titleML">Title (മലയാളം)</Label>
            <Input
              id="titleML"
              value={titleML}
              onChange={(e) => setTitleML(e.target.value)}
              placeholder="പ്രവർത്തനത്തിന്റെ തലക്കെട്ട്"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description (English)</Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief summary..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortDescriptionML">Short Description (മലയാളം)</Label>
            <Textarea
              id="shortDescriptionML"
              value={shortDescriptionML}
              onChange={(e) => setShortDescriptionML(e.target.value)}
              placeholder="ഹ്രസ്വ വിവരണം..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Full Story (English)</Label>
            <Textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write the full story..."
              rows={12}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storyML">Full Story (മലയാളം)</Label>
            <Textarea
              id="storyML"
              value={storyML}
              onChange={(e) => setStoryML(e.target.value)}
              placeholder="പൂർണ്ണ വിവരണം എഴുതുക..."
              rows={12}
            />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                type="button"
                disabled={uploading}
                onClick={() => document.getElementById("cover-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Cover"}
              </Button>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </div>
            {coverImage && (
              <div className="relative w-48 mt-2">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setCoverImage("")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <Button
              variant="outline"
              type="button"
              disabled={uploading}
              onClick={() =>
                document.getElementById("gallery-upload")?.click()
              }
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Add Images"}
            </Button>
            <input
              id="gallery-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryUpload}
            />
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Video Link (YouTube or Google Drive)</Label>
            <Input
              value={youtubeUrl}
              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://drive.google.com/file/d/..."
            />
            {youtubeVideoId && (
              <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden">
                <iframe
                  src={youtubeVideoId}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() => handleSubmit("draft")}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button disabled={loading} onClick={() => handleSubmit("published")}>
          <Send className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>
    </div>
  )
}
