import { getSettings } from "@actions/settings"
import { getPublishedActivities } from "@actions/activities"
import { HeroSection } from "@components/public/hero-section"
import { T } from "@lib/lang"

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
        titleML={settings.heroTitleML}
        subtitle={settings.heroSubtitle}
        subtitleML={settings.heroSubtitleML}
        heroImage={settings.heroImage}
      />

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <SectionTitle
            title={<T en="Latest Activities" ml="ഏറ്റവും പുതിയ പ്രവർത്തനങ്ങൾ" />}
            description={<T en="Recent events and initiatives" ml="സമീപകാല ഇവന്റുകളും സംരംഭങ്ങളും" />}
            href="/activities"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {featured.map((a) => (
              <ActivityCard key={a.id} {...a} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-bg-alt py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4"><T en="About Sreejith P.S." ml="ശ്രീജിത്ത് പി.എസ്. നെക്കുറിച്ച്" /></h2>
          <p className="text-lg text-text-muted mb-8">
            <T en="Dedicated to empowering communities through sustainable agriculture and physical education. APEC (Agricultural & Physical Education Center) is the vision that drives meaningful change." ml="സുസ്ഥിര കൃഷിയിലൂടെയും ശാരീരിക വിദ്യാഭ്യാസത്തിലൂടെയും കമ്മ്യൂണിറ്റികളെ ശാക്തീകരിക്കാൻ സമർപ്പിതർ. APEC അർത്ഥപൂർണ്ണമായ മാറ്റത്തിന് പ്രേരകമായ ദർശനമാണ്." />
          </p>
        </div>
      </section>
    </>
  )
}
