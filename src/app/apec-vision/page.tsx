import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "APEC Vision",
  description:
    "Agricultural & Physical Education Center — vision for community transformation.",
}

export default function ApecVision() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-8">APEC Vision</h1>
      <div className="prose prose-neutral max-w-none">
        <h2>Agricultural & Physical Education Center</h2>
        <p className="text-xl text-neutral-600">
          APEC represents a holistic approach to community development,
          combining agricultural sustainability with physical wellness.
        </p>
        <h2>Our Vision</h2>
        <p>
          A world where every community has access to sustainable food systems
          and opportunities for physical activity that promote health, well-being,
          and social connection.
        </p>
        <h2>Key Focus Areas</h2>
        <ul>
          <li>Sustainable farming practices and education</li>
          <li>Community physical education programs</li>
          <li>Youth development and leadership</li>
          <li>Environmental conservation</li>
          <li>Health and wellness initiatives</li>
        </ul>
      </div>
    </div>
  )
}
