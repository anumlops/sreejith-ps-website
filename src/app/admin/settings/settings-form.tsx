"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateSettings } from "@actions/settings"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Label } from "@components/ui/label"
import { Card, CardContent } from "@components/ui/card"
import { Upload, X } from "lucide-react"
import { toast } from "sonner"

export function SettingsForm({ settings }: { settings: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    siteName: settings.siteName ?? "",
    heroTitle: settings.heroTitle ?? "",
    heroSubtitle: settings.heroSubtitle ?? "",
    heroImage: settings.heroImage ?? "",
    contactEmail: settings.contactEmail ?? "",
    phone: settings.phone ?? "",
    address: settings.address ?? "",
    socialLinks: settings.socialLinks ?? "",
  })
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await updateSettings(form)
    toast("Settings updated")
    router.refresh()
    setLoading(false)
  }

  const set =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input value={form.siteName} onChange={set("siteName")} />
          </div>
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input value={form.heroTitle} onChange={set("heroTitle")} />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Input value={form.heroSubtitle} onChange={set("heroSubtitle")} />
          </div>
          <div className="space-y-2">
            <Label>Hero Background Image</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                type="button"
                disabled={uploading}
                onClick={() => document.getElementById("hero-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                id="hero-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  setUploading(true)
                  const fd = new FormData()
                  fd.append("file", file)
                  const res = await fetch("/api/upload", { method: "POST", body: fd })
                  const data = await res.json()
                  setForm((prev) => ({ ...prev, heroImage: data.url }))
                  setUploading(false)
                }}
              />
              {form.heroImage && (
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, heroImage: "" }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {form.heroImage && (
              <img
                src={form.heroImage}
                alt="Hero"
                className="w-48 h-32 object-cover rounded-lg mt-2"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              type="email"
              value={form.contactEmail}
              onChange={set("contactEmail")}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={form.phone} onChange={set("phone")} />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea value={form.address} onChange={set("address")} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Social Links (JSON)</Label>
            <Textarea
              value={form.socialLinks}
              onChange={set("socialLinks")}
              rows={3}
              placeholder='{"instagram":"...","facebook":"...","youtube":"..."}'
            />
          </div>
        </CardContent>
      </Card>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  )
}
