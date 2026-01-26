'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import { Link } from '@/i18n/routing'
import { fadeInUp } from '@/lib/animations'

const faqKeys = [
  'reservation',
  'drinks',
  'parking',
  'giftcards',
  'cancel',
  'products',
  'kids',
  'first-visit',
]

export function FAQPage() {
  const t = useTranslations('faq')

  const faqItems = faqKeys.map(key => ({
    id: key,
    title: t(`items.${key}.title`),
    content: t(`items.${key}.content`),
  }))

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-3xl">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion
            items={faqItems}
            className="bg-white rounded-lg shadow-lg p-6"
          />
        </motion.div>

        {/* Still have questions */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 mb-4">{t('stillQuestions')}</p>
          <Link href="/contact">
            <Button variant="primary">{t('contactUs')}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
