'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Wine, Beer, Coffee, Music } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'

const features = [
  { key: 'whiskey', icon: Wine },
  { key: 'beer', icon: Beer },
  { key: 'coffee', icon: Coffee },
  { key: 'atmosphere', icon: Music },
]

export function ExperienceShowcase() {
  const t = useTranslations('experience')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-20 overflow-hidden bg-anthracite-500"
    >
      {/* Parallax background element */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-mint-500 via-transparent to-transparent" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInLeft}>
              <Badge variant="mint" className="mb-4">
                {t('badge')}
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeInLeft}
              className="heading-2 text-white mb-4"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              variants={fadeInLeft}
              className="text-mint-400 text-xl font-medium mb-4"
            >
              {t('subtitle')}
            </motion.p>

            <motion.p
              variants={fadeInLeft}
              className="text-neutral-300 text-lg mb-8 max-w-lg"
            >
              {t('description')}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.key}
                    variants={fadeInUp}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                  >
                    <Icon className="w-6 h-6 text-mint-400 mb-2" />
                    <h3 className="text-white font-medium mb-1">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <Link href="/experience">
                <Button variant="outline" className="border-mint-500 text-mint-400 hover:bg-mint-500 hover:text-white">
                  {t('cta')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Image Gallery */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative z-10">
              <PlaceholderImage
                category="experience"
                label="Whiskey & Beer"
                aspectRatio="landscape"
                className="rounded-lg shadow-2xl"
              />
            </div>

            {/* Floating secondary image */}
            <motion.div
              className="absolute -bottom-8 -left-8 w-48 md:w-64 z-20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <PlaceholderImage
                category="experience"
                label="The Ritual"
                aspectRatio="square"
                className="rounded-lg shadow-xl border-4 border-anthracite-500"
              />
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-mint-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
