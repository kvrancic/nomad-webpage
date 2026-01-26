'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FileText } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fadeInUp } from '@/lib/animations'

export function BlogPage() {
  const t = useTranslations('blog')

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Empty state - shown until blog posts are added via CMS */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-mint-600" />
          </div>
          <h3 className="font-display text-2xl text-anthracite-500 mb-3">
            {t('comingSoon')}
          </h3>
          <p className="text-neutral-500 max-w-md mx-auto">
            {t('comingSoonDescription')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
