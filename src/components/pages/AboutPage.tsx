'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Scissors, Users, Wine, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'

const valueIcons = [
  { key: 'craftsmanship', icon: Scissors },
  { key: 'community', icon: Users },
  { key: 'experience', icon: Wine },
  { key: 'quality', icon: Star },
]

export function AboutPage() {
  const t = useTranslations('about')

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-anthracite-500 to-anthracite-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="heading-1 mb-6">{t('title')}</h1>
            <p className="text-xl text-neutral-300">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="heading-2 text-anthracite-500 mb-6">
                {t('story.title')}
              </h2>
              <div className="space-y-4 text-neutral-600 text-lg">
                <p>{t('story.content')}</p>
                <p>{t('story.content2')}</p>
                <p>{t('story.content3')}</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <PlaceholderImage
                category="location"
                label="Our Story"
                aspectRatio="landscape"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
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
                label="Our Philosophy"
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
              <h2 className="heading-2 text-anthracite-500 mb-6">
                {t('philosophy.title')}
              </h2>
              <div className="space-y-4 text-neutral-600 text-lg">
                <p>{t('philosophy.content')}</p>
                <p>{t('philosophy.content2')}</p>
                <p>{t('philosophy.content3')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <SectionHeader
            title={t('values.title')}
            subtitle={t('values.subtitle')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueIcons.map((value) => {
              const Icon = value.icon
              return (
                <motion.div key={value.key} variants={fadeInUp}>
                  <Card hover variant="outlined" className="text-center h-full">
                    <CardContent className="py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-mint-50 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-mint-500" />
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500 mb-2">
                        {t(`values.${value.key}.title`)}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {t(`values.${value.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
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
            <h2 className="heading-2 mb-4">{t('cta.title')}</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href={FRESHA_URLS.default} variant="secondary" size="lg">
                {t('cta.book')}
              </Button>
              <Link href="/team">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-mint-600"
                >
                  {t('cta.meetTeam')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
