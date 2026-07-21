import type { Metadata } from "next"
import { T } from "@lib/lang"

export const metadata: Metadata = {
  title: "APEC Vision",
  description: "Agricultural & Physical Education Center — vision for community transformation.",
}

export default function ApecVision() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-8"><T en="APEC Vision" ml="APEC ദർശനം" /></h1>
      <div className="prose prose-neutral max-w-none">
        <h2><T en="Agricultural & Physical Education Center" ml="കാർഷിക, ശാരീരിക വിദ്യാഭ്യാസ കേന്ദ്രം" /></h2>
        <p className="text-xl text-text-muted">
          <T en="APEC represents a holistic approach to community development, combining agricultural sustainability with physical wellness." ml="കാർഷിക സുസ്ഥിരതയെ ശാരീരിക ക്ഷേമവുമായി സംയോജിപ്പിച്ച് കമ്മ്യൂണിറ്റി വികസനത്തിനുള്ള സമഗ്രമായ സമീപനത്തെ APEC പ്രതിനിധീകരിക്കുന്നു." />
        </p>
        <h2><T en="Our Vision" ml="ഞങ്ങളുടെ ദർശനം" /></h2>
        <p>
          <T en="A world where every community has access to sustainable food systems and opportunities for physical activity that promote health, well-being, and social connection." ml="എല്ലാ കമ്മ്യൂണിറ്റികൾക്കും സുസ്ഥിര ഭക്ഷണ സംവിധാനങ്ങളിലേക്കും ആരോഗ്യം, ക്ഷേമം, സാമൂഹിക ബന്ധം എന്നിവ പ്രോത്സാഹിപ്പിക്കുന്ന ശാരീരിക പ്രവർത്തനങ്ങൾക്കുള്ള അവസരങ്ങളിലേക്കും പ്രവേശനമുള്ള ഒരു ലോകം." />
        </p>
        <h2><T en="Key Focus Areas" ml="പ്രധാന ശ്രദ്ധാ മേഖലകൾ" /></h2>
        <ul>
          <li><T en="Sustainable farming practices and education" ml="സുസ്ഥിര കൃഷിരീതികളും വിദ്യാഭ്യാസവും" /></li>
          <li><T en="Community physical education programs" ml="കമ്മ്യൂണിറ്റി ശാരീരിക വിദ്യാഭ്യാസ പരിപാടികൾ" /></li>
          <li><T en="Youth development and leadership" ml="യുവജന വികസനവും നേതൃത്വവും" /></li>
          <li><T en="Environmental conservation" ml="പരിസ്ഥിതി സംരക്ഷണം" /></li>
          <li><T en="Health and wellness initiatives" ml="ആരോഗ്യ ക്ഷേമ സംരംഭങ്ങൾ" /></li>
        </ul>
      </div>
    </div>
  )
}
