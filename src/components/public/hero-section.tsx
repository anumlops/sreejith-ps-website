"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@components/ui/button"
import { useRef } from "react"
import { T } from "@lib/lang"

interface Props {
  title: string
  titleML?: string | null
  subtitle: string
  subtitleML?: string | null
  heroImage?: string | null
}

export function HeroSection({ title, subtitle, heroImage }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -50])

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {heroImage ? (
        <motion.img
          src={heroImage}
          alt=""
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 text-center text-white px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <T en={title} ml={titleML} />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 mb-8"
        >
          <T en={subtitle} ml={subtitleML} />
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link href="/activities">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90"
            >
              <T en="View Activities" ml="പ്രവർത്തനങ്ങൾ കാണുക" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90"
            >
              <T en="Learn More" ml="കൂടുതൽ അറിയുക" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
