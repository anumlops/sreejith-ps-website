"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { toast } from "sonner"

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // ponytail: no backend for contact form yet, add email service when needed
    await new Promise((r) => setTimeout(r, 1000))
    toast("Message sent! We'll get back to you.")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Your Name" required />
      <Input type="email" placeholder="Your Email" required />
      <Input placeholder="Subject" />
      <Textarea placeholder="Your Message" rows={6} required />
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
