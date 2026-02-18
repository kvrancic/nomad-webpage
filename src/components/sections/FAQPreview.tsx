'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import { Link } from '@/i18n/routing'
import { fadeInUp } from '@/lib/animations'
import type { SanityFaq } from '../../../sanity/lib'

interface FAQPreviewProps {
  faqs?: SanityFaq[]
  locale?: string
}

// Fallback FAQ keys for translation-based content
const faqKeys = ['reservation', 'drinks', 'parking', 'giftcards', 'kids']

export function FAQPreview({ faqs, locale = 'hr' }: FAQPreviewProps) {
  const t = useTranslations('faq')

  // Use Sanity data if available, otherwise fall back to translations
  const hasSanityData = faqs && faqs.length > 0

  const faqItems = hasSanityData
    ? faqs.map((faq) => ({
        id: faq._id,
        title: locale === 'en' && faq.questionEn ? faq.questionEn : faq.question,
        content: locale === 'en' && faq.answerEn ? faq.answerEn : faq.answer,
      }))
    : faqKeys.map((key) => ({
        id: key,
        title: t(`items.${key}.title`),
        content: t(`items.${key}.content`),
      }))

  return (
    <section className="py-10 md:py-14">
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
