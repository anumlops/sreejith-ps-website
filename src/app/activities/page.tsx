import type { Metadata } from "next"
import { getPublishedActivities } from "@actions/activities"
import { ActivityCard } from "@components/public/activity-card"
import { T } from "@lib/lang"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Activities",
  description: "Browse all activities and initiatives by Sreejith P.S.",
}

export default async function Activities() {
  const activities = await getPublishedActivities()

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-4"><T en="Activities" ml="പ്രവർത്തനങ്ങൾ" /></h1>
      <p className="text-xl text-text-muted mb-12">
        <T en="Events, initiatives, and community programs." ml="ഇവന്റുകൾ, സംരംഭങ്ങൾ, കമ്മ്യൂണിറ്റി പ്രോഗ്രാമുകൾ." />
      </p>
      {activities.length === 0 ? (
        <p className="text-muted-foreground"><T en="No activities published yet." ml="ഇതുവരെ പ്രവർത്തനങ്ങളൊന്നും പ്രസിദ്ധീകരിച്ചിട്ടില്ല." /></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((a) => (
            <ActivityCard key={a.id} {...a} />
          ))}
        </div>
      )}
    </div>
  )
}
