'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Gift, CreditCard, Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'

const stepKeys = [
  { key: 'amount', icon: CreditCard, step: 1 },
  { key: 'personalize', icon: Send, step: 2 },
  { key: 'gift', icon: Gift, step: 3 },
] as const

const benefitKeys = [
  'neverExpires',
  'allLocations',
  'transferable',
  'allServices',
] as const

export function GiftCardsPage() {
  const t = useTranslations('giftCards')

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
              <h1 className="heading-1 mb-6">{t('title')}</h1>
              <p className="text-xl text-white/80 mb-4">{t('subtitle')}</p>
              <p className="text-lg text-white/70 mb-8">{t('description')}</p>
              <Button
                href={FRESHA_URLS.giftCards}
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
              <PlaceholderImage
                category="service"
                label="Gift Card"
                aspectRatio="landscape"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <SectionHeader
            title={t('howItWorks')}
            subtitle={t('howItWorksSubtitle')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {stepKeys.map((stepItem) => {
              const Icon = stepItem.icon
              return (
                <motion.div key={stepItem.step} variants={fadeInUp}>
                  <Card variant="outlined" className="text-center h-full relative">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-mint-500 text-white rounded-full flex items-center justify-center font-bold">
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

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <PlaceholderImage
                category="experience"
                label="Gift Experience"
                aspectRatio="landscape"
                className="rounded-lg shadow-xl"
              />
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="heading-2 text-anthracite-500 mb-6">
                {t('whyTitle')}
              </h2>
              <p className="text-neutral-600 text-lg mb-8">
                {t('whyDescription')}
              </p>
              <ul className="space-y-4">
                {benefitKeys.map((benefitKey) => (
                  <li key={benefitKey} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-mint-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-anthracite-500 font-medium">{t(`benefits.${benefitKey}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
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
              href={FRESHA_URLS.giftCards}
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
