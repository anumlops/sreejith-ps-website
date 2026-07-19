import { getSettings } from "@actions/settings"
import { SettingsForm } from "./settings-form"

export const dynamic = "force-dynamic"

export default async function AdminSettings() {
  const settings = await getSettings()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  )
}
