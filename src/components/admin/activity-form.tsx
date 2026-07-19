"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createActivity, updateActivity } from "@actions/activities"
import { extractYouTubeId } from "@lib/youtube"
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
    shortDescription: string
    story: string
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
  const [shortDescription, setShortDescription] = useState(
    activity?.shortDescription ?? ""
  )
  const [story, setStory] = useState(activity?.story ?? "")
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
    const id = extractYouTubeId(url)
    if (id) setYoutubeVideoId(id)
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
        shortDescription,
        story,
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
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Activity title"
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
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief summary..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Full Story</Label>
            <Textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write the full story..."
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
            <Label>YouTube Video</Label>
            <Input
              value={youtubeUrl}
              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
            {youtubeVideoId && (
              <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
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
