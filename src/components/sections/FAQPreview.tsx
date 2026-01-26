'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import { Link } from '@/i18n/routing'
import { fadeInUp } from '@/lib/animations'

// Show first 4 FAQ items on homepage
const faqKeys = ['reservation', 'drinks', 'parking', 'giftcards']

export function FAQPreview() {
  const t = useTranslations('faq')

  const faqItems = faqKeys.map(key => ({
    id: key,
    title: t(`items.${key}.title`),
    content: t(`items.${key}.content`),
  }))

  return (
    <section className="py-16 md:py-20">
      <div className="container-custom max-w-3xl">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion
            items={faqItems}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          />
        </motion.div>

        <div className="text-center">
          <Link href="/faq">
            <Button
              variant="outline"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {t('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
