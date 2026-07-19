"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateSettings } from "@actions/settings"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Label } from "@components/ui/label"
import { Card, CardContent } from "@components/ui/card"
import { toast } from "sonner"

export function SettingsForm({ settings }: { settings: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    siteName: settings.siteName ?? "",
    heroTitle: settings.heroTitle ?? "",
    heroSubtitle: settings.heroSubtitle ?? "",
    contactEmail: settings.contactEmail ?? "",
    phone: settings.phone ?? "",
    address: settings.address ?? "",
    socialLinks: settings.socialLinks ?? "",
  })

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
