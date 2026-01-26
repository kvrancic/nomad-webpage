'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'
import { fadeInUp } from '@/lib/animations'

interface BlogPostPageProps {
  slug: string
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const t = useTranslations('blog')

  // TODO: Fetch post from CMS using slug
  // For now, show coming soon state

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToBlog')}
          </Button>
        </Link>

        {/* Empty state - post not found or CMS not connected */}
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
