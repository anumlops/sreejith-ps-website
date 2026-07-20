import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sreejith P.S. — journey, values, and mission.",
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold tracking-tight mb-8">About</h1>
      <div className="prose prose-neutral max-w-none">
        <p className="text-xl text-text-muted leading-relaxed">
          Sreejith P.S. is a community leader dedicated to transforming lives
          through sustainable agriculture and physical education.
        </p>
        <h2>Journey</h2>
        <p>
          With years of experience in community development, Sreejith has worked
          tirelessly to bridge the gap between traditional agricultural practices
          and modern sustainable methods, all while promoting health and wellness
          through physical education.
        </p>
        <h2>Values</h2>
        <ul>
          <li>
            <strong>Community First</strong> — Every initiative starts with the
            community&apos;s needs
          </li>
          <li>
            <strong>Sustainability</strong> — Building practices that last for
            generations
          </li>
          <li>
            <strong>Education</strong> — Empowering through knowledge and skills
          </li>
          <li>
            <strong>Wellness</strong> — Promoting physical and mental well-being
          </li>
        </ul>
        <h2>Mission</h2>
        <p>
          To create a healthier, more sustainable world by empowering communities
          with the knowledge, skills, and resources they need to thrive.
        </p>
      </div>
    </div>
  )
}
