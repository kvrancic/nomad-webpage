'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Scissors, Users, Wine, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityAboutPage, SanitySiteSettings } from '../../../sanity/lib'

const valueIcons = [
  { key: 'craftsmanship', icon: Scissors },
  { key: 'community', icon: Users },
  { key: 'experience', icon: Wine },
  { key: 'quality', icon: Star },
]

interface AboutPageProps {
  data?: SanityAboutPage | null
  locale?: string
  settings?: SanitySiteSettings | null
}

export function AboutPage({ data, locale = 'hr', settings }: AboutPageProps) {
  const t = useTranslations('about')

  const storyTitle = data
    ? (locale === 'en' && data.storyTitleEn ? data.storyTitleEn : data.storyTitle)
    : t('story.title')
  const storyContent = data
    ? (locale === 'en' && data.storyContentEn ? data.storyContentEn : data.storyContent)
    : t('story.content')
  const storyContent2 = data
    ? (locale === 'en' && data.storyContent2En ? data.storyContent2En : data.storyContent2)
    : t('story.content2')
  const storyContent3 = data
    ? (locale === 'en' && data.storyContent3En ? data.storyContent3En : data.storyContent3)
    : t('story.content3')

  const philosophyTitle = data
    ? (locale === 'en' && data.philosophyTitleEn ? data.philosophyTitleEn : data.philosophyTitle)
    : t('philosophy.title')
  const philosophyContent = data
    ? (locale === 'en' && data.philosophyContentEn ? data.philosophyContentEn : data.philosophyContent)
    : t('philosophy.content')
  const philosophyContent2 = data
    ? (locale === 'en' && data.philosophyContent2En ? data.philosophyContent2En : data.philosophyContent2)
    : t('philosophy.content2')
  const philosophyContent3 = data
    ? (locale === 'en' && data.philosophyContent3En ? data.philosophyContent3En : data.philosophyContent3)
    : t('philosophy.content3')

  const bookingUrl = settings?.freshaUrl || FRESHA_URLS.default

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
                {storyTitle}
              </h2>
              <div className="space-y-4 text-neutral-600 text-lg">
                <p>{storyContent}</p>
                {storyContent2 && <p>{storyContent2}</p>}
                {storyContent3 && <p>{storyContent3}</p>}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {data?.storyImage ? (
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={urlFor(data.storyImage).width(600).height(400).url()}
                    alt={storyTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  category="location"
                  label="Our Story"
                  aspectRatio="landscape"
                  className="rounded-lg shadow-2xl"
                />
              )}
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
              {data?.philosophyImage ? (
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={urlFor(data.philosophyImage).width(600).height(400).url()}
                    alt={philosophyTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  category="experience"
                  label="Our Philosophy"
                  aspectRatio="landscape"
                  className="rounded-lg shadow-2xl"
                />
              )}
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="heading-2 text-anthracite-500 mb-6">
                {philosophyTitle}
              </h2>
              <div className="space-y-4 text-neutral-600 text-lg">
                <p>{philosophyContent}</p>
                {philosophyContent2 && <p>{philosophyContent2}</p>}
                {philosophyContent3 && <p>{philosophyContent3}</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Static */}
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

      {/* CTA Section - Static */}
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
              <Button href={bookingUrl} variant="secondary" size="lg">
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
