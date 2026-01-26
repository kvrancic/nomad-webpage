'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Wine, Beer, Coffee, Music, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'

const features = [
  { key: 'whiskey', icon: Wine },
  { key: 'beer', icon: Beer },
  { key: 'coffee', icon: Coffee },
  { key: 'atmosphere', icon: Music },
]

const whiskeyBrands = ['Monkey Shoulder', 'Glenfiddich', 'Tullamore Dew', 'Jameson', 'Chivas Regal']
const beerBrands = ['Varionica', 'Grif', 'Zmajska Pivovara', 'Garden Brewery', 'Nova Runda']

export function ExperiencePage() {
  const t = useTranslations('experience')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-anthracite-500 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-mint-500 via-transparent to-transparent" />
        </motion.div>

        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="mint" className="mb-6">
                {t('badge')}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="heading-1 text-white mb-6"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-neutral-300 mb-8"
            >
              {t('description')}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button href={FRESHA_URLS.default} variant="primary" size="lg">
                {t('bookExperience')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={containerRef} className="py-16 md:py-20">
        <div className="container-custom">
          <SectionHeader
            title={t('featuresTitle')}
            subtitle={t('featuresSubtitle')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.key} variants={fadeInUp}>
                  <Card hover variant="outlined" className="text-center h-full">
                    <CardContent className="py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-mint-50 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-mint-500" />
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500 mb-2">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Whiskey Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Badge variant="anthracite" className="mb-4">
                {t('whiskey.badge')}
              </Badge>
              <h2 className="heading-2 text-anthracite-500 mb-4">
                {t('whiskey.title')}
              </h2>
              <p className="text-neutral-600 text-lg mb-6">
                {t('whiskey.description')}
              </p>
              <ul className="space-y-3">
                {whiskeyBrands.map((brand) => (
                  <li key={brand} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-mint-500" />
                    <span className="text-anthracite-500">{brand}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <PlaceholderImage
                category="experience"
                label="Whiskey Selection"
                aspectRatio="landscape"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beer Section */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <PlaceholderImage
                category="experience"
                label="Craft Beer Selection"
                aspectRatio="landscape"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <Badge variant="mint" className="mb-4">
                {t('beer.badge')}
              </Badge>
              <h2 className="heading-2 text-anthracite-500 mb-4">
                {t('beer.title')}
              </h2>
              <p className="text-neutral-600 text-lg mb-6">
                {t('beer.description')}
              </p>
              <ul className="space-y-3">
                {beerBrands.map((brand) => (
                  <li key={brand} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-mint-500" />
                    <span className="text-anthracite-500">{brand}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-mint-500 to-mint-600">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">{t('readyTitle')}</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('readyDescription')}
            </p>
            <Button
              href={FRESHA_URLS.default}
              variant="secondary"
              size="lg"
            >
              {t('bookNow')}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
