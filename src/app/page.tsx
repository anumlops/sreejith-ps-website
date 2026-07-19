import { getSettings } from "@actions/settings"
import { getPublishedActivities } from "@actions/activities"
import { HeroSection } from "@components/public/hero-section"

export const dynamic = "force-dynamic"
import { ActivityCard } from "@components/public/activity-card"
import { SectionTitle } from "@components/public/section-title"

export default async function Home() {
  const [settings, activities] = await Promise.all([
    getSettings(),
    getPublishedActivities(),
  ])
  const featured = activities.slice(0, 3)

  return (
    <>
      <HeroSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        heroImage={settings.heroImage}
      />

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <SectionTitle
            title="Latest Activities"
            description="Recent events and initiatives"
            href="/activities"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {featured.map((a) => (
              <ActivityCard key={a.id} {...a} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-neutral-50 py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">About Sreejith P.S.</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Dedicated to empowering communities through sustainable agriculture
            and physical education. APEC (Agricultural & Physical Education
            Center) is the vision that drives meaningful change.
          </p>
        </div>
      </section>
    </>
  )
}
