import type { Metadata } from "next"
import { getSettings } from "@actions/settings"
import { ContactForm } from "@components/public/contact-form"

export const dynamic = "force-dynamic"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sreejith P.S. and APEC.",
}

export default async function Contact() {
  const settings = await getSettings()

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Contact</h1>
      <p className="text-xl text-neutral-600 mb-12">
        Get in touch with us.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          {settings.phone && (
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 mt-1 text-neutral-400" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-neutral-600">{settings.phone}</p>
              </div>
            </div>
          )}
          {settings.contactEmail && (
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 mt-1 text-neutral-400" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-neutral-600">
                  {settings.contactEmail}
                </p>
              </div>
            </div>
          )}
          {settings.address && (
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 text-neutral-400" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-neutral-600 whitespace-pre-line">
                  {settings.address}
                </p>
              </div>
            </div>
          )}
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
