'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Gift, CreditCard, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { LIME_BOOKING_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityGiftCardsPage, SanitySiteSettings } from '../../../sanity/lib'

const iconMap = {
  creditCard: CreditCard,
  send: Send,
  gift: Gift,
} as const

const fallbackStepKeys = [
  { key: 'amount', icon: CreditCard, step: 1 },
  { key: 'personalize', icon: Send, step: 2 },
  { key: 'gift', icon: Gift, step: 3 },
] as const

interface GiftCardsPageProps {
  data?: SanityGiftCardsPage | null
  locale?: string
  settings?: SanitySiteSettings | null
}

export function GiftCardsPage({ data, locale = 'hr', settings }: GiftCardsPageProps) {
  const t = useTranslations('giftCards')

  const heroTitle = data
    ? (locale === 'en' && data.heroTitleEn ? data.heroTitleEn : data.heroTitle)
    : t('title')
  const heroSubtitle = data
    ? (locale === 'en' && data.heroSubtitleEn ? data.heroSubtitleEn : data.heroSubtitle)
    : t('subtitle')
  const heroDescription = data
    ? (locale === 'en' && data.heroDescriptionEn ? data.heroDescriptionEn : data.heroDescription)
    : t('description')

  const howItWorksTitle = data?.howItWorksTitle
    ? (locale === 'en' && data.howItWorksTitleEn ? data.howItWorksTitleEn : data.howItWorksTitle)
    : t('howItWorks')
  const howItWorksSubtitle = data?.howItWorksSubtitle
    ? (locale === 'en' && data.howItWorksSubtitleEn ? data.howItWorksSubtitleEn : data.howItWorksSubtitle)
    : t('howItWorksSubtitle')

  const giftCardsUrl = LIME_BOOKING_URLS.giftCards

  const hasCmsSteps = data?.steps && data.steps.length > 0

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-mint-500 to-mint-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              animate="visible"
              className="text-white"
            >
              <h1 className="heading-1 mb-6">{heroTitle}</h1>
              <p className="text-xl text-white/80 mb-4">{heroSubtitle}</p>
              <p className="text-lg text-white/70 mb-8">{heroDescription}</p>
              <Button
                href={giftCardsUrl}
                variant="secondary"
                size="lg"
                icon={<Gift className="w-5 h-5" />}
              >
                {t('purchase')}
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
            >
              {data?.heroImage ? (
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={urlFor(data.heroImage).width(600).height(400).url()}
                    alt={heroTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  category="service"
                  label="Gift Card"
                  aspectRatio="landscape"
                  className="rounded-lg shadow-2xl"
                />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <SectionHeader
            title={howItWorksTitle || t('howItWorks')}
            subtitle={howItWorksSubtitle || t('howItWorksSubtitle')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {hasCmsSteps
              ? data!.steps!.map((step, index) => {
                  const Icon = step.icon ? iconMap[step.icon] : Gift
                  const stepTitle = locale === 'en' && step.titleEn ? step.titleEn : step.title
                  const stepDesc = locale === 'en' && step.descriptionEn ? step.descriptionEn : step.description
                  return (
                    <motion.div key={step._key} variants={fadeInUp} className="pt-4">
                      <Card variant="outlined" className="text-center h-full relative overflow-visible">
                        {/* Step number */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-mint-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>

                        <CardContent className="pt-12 pb-8 px-6">
                          <div className="w-16 h-16 mx-auto mb-6 bg-mint-50 rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-mint-500" />
                          </div>
                          <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500 mb-3">
                            {stepTitle}
                          </h3>
                          <p className="text-neutral-600 text-sm leading-relaxed">
                            {stepDesc}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })
              : fallbackStepKeys.map((stepItem) => {
                  const Icon = stepItem.icon
                  return (
                    <motion.div key={stepItem.step} variants={fadeInUp} className="pt-4">
                      <Card variant="outlined" className="text-center h-full relative overflow-visible">
                        {/* Step number */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-mint-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {stepItem.step}
                        </div>

                        <CardContent className="pt-12 pb-8 px-6">
                          <div className="w-16 h-16 mx-auto mb-6 bg-mint-50 rounded-full flex items-center justify-center">
                            <Icon className="w-8 h-8 text-mint-500" />
                          </div>
                          <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500 mb-3">
                            {t(`steps.${stepItem.key}.title`)}
                          </h3>
                          <p className="text-neutral-600 text-sm leading-relaxed">
                            {t(`steps.${stepItem.key}.description`)}
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
      <section className="py-16 md:py-20 bg-anthracite-500">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">{t('ctaTitle')}</h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <Button
              href={giftCardsUrl}
              variant="primary"
              size="lg"
              icon={<Gift className="w-5 h-5" />}
            >
              {t('purchase')}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
