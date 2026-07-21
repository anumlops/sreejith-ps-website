import type { Metadata } from "next"
import { T } from "@lib/lang"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sreejith P.S. — journey, values, and mission.",
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-8"><T en="About" ml="എന്നെക്കുറിച്ച്" /></h1>
      <div className="prose prose-neutral max-w-none">
        <p className="text-xl text-text-muted leading-relaxed">
          <T en="Sreejith P.S. is a community leader dedicated to transforming lives through sustainable agriculture and physical education." ml="സുസ്ഥിര കൃഷിയിലൂടെയും ശാരീരിക വിദ്യാഭ്യാസത്തിലൂടെയും ജീവിതങ്ങളെ പരിവർത്തനപ്പെടുത്തുന്നതിന് സമർപ്പിതനായ കമ്മ്യൂണിറ്റി നേതാവാണ് ശ്രീജിത്ത് പി.എസ്." />
        </p>
        <h2><T en="Journey" ml="യാത്ര" /></h2>
        <p>
          <T en="With years of experience in community development, Sreejith has worked tirelessly to bridge the gap between traditional agricultural practices and modern sustainable methods, all while promoting health and wellness through physical education." ml="കമ്മ്യൂണിറ്റി വികസനത്തിൽ വർഷങ്ങളുടെ പരിചയസമ്പത്തോടെ, പരമ്പരാഗത കാർഷിക രീതികളും ആധുനിക സുസ്ഥിര രീതികളും തമ്മിലുള്ള വിടവ് നികത്താൻ ശ്രീജിത്ത് അക്ഷീണം പ്രവർത്തിച്ചു, അതേസമയം ശാരീരിക വിദ്യാഭ്യാസത്തിലൂടെ ആരോഗ്യവും ക്ഷേമവും പ്രോത്സാഹിപ്പിക്കുന്നു." />
        </p>
        <h2><T en="Values" ml="മൂല്യങ്ങൾ" /></h2>
        <ul>
          <li><strong><T en="Community First" ml="കമ്മ്യൂണിറ്റി ഫസ്റ്റ്" /></strong> — <T en="Every initiative starts with the community's needs" ml="എല്ലാ സംരംഭവും കമ്മ്യൂണിറ്റിയുടെ ആവശ്യങ്ങളിൽ നിന്നാണ് ആരംഭിക്കുന്നത്" /></li>
          <li><strong><T en="Sustainability" ml="സുസ്ഥിരത" /></strong> — <T en="Building practices that last for generations" ml="തലമുറകളോളം നിലനിൽക്കുന്ന സമ്പ്രദായങ്ങൾ കെട്ടിപ്പടുക്കൽ" /></li>
          <li><strong><T en="Education" ml="വിദ്യാഭ്യാസം" /></strong> — <T en="Empowering through knowledge and skills" ml="അറിവിലൂടെയും കഴിവുകളിലൂടെയും ശാക്തീകരണം" /></li>
          <li><strong><T en="Wellness" ml="ക്ഷേമം" /></strong> — <T en="Promoting physical and mental well-being" ml="ശാരീരികവും മാനസികവുമായ ക്ഷേമം പ്രോത്സാഹിപ്പിക്കൽ" /></li>
        </ul>
        <h2><T en="Mission" ml="ദൗത്യം" /></h2>
        <p>
          <T en="To create a healthier, more sustainable world by empowering communities with the knowledge, skills, and resources they need to thrive." ml="അഭിവൃദ്ധി പ്രാപിക്കാൻ ആവശ്യമായ അറിവും കഴിവുകളും വിഭവങ്ങളും കമ്മ്യൂണിറ്റികൾക്ക് നൽകി ആരോഗ്യകരവും കൂടുതൽ സുസ്ഥിരവുമായ ഒരു ലോകം സൃഷ്ടിക്കുക." />
        </p>
      </div>
    </div>
  )
}
