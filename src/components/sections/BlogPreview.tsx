'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Link } from '@/i18n/routing'
import NextLink from 'next/link'
import { staggerContainer, fadeInUp } from '@/lib/animations'

// Placeholder blog posts - will be replaced with CMS data
const PLACEHOLDER_POSTS: Array<{
  id: string
  title: string
  excerpt: string
  date: string
}> = []

export function BlogPreview() {
  const t = useTranslations('blog')

  const hasPosts = PLACEHOLDER_POSTS.length > 0

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="container-custom">
        <SectionHeader
          title={t('previewTitle')}
          subtitle={t('previewSubtitle')}
        />

        {hasPosts ? (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {PLACEHOLDER_POSTS.slice(0, 3).map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card hover variant="elevated" className="h-full">
                    <CardContent className="flex flex-col h-full">
                      <span className="text-sm text-neutral-400 mb-2">
                        {post.date}
                      </span>
                      <h3 className="font-display text-xl text-anthracite-500 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-mint-600 hover:text-mint-700 font-medium text-sm"
                      >
                        {t('readMore')} →
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <Link href="/blog">
                <Button variant="outline">{t('viewAll')}</Button>
              </Link>
            </div>
          </>
        ) : (
          /* Empty state - shown until blog posts are added via CMS */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-mint-600" />
            </div>
            <h3 className="font-display text-xl text-anthracite-500 mb-2">
              {t('comingSoon')}
            </h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              {t('comingSoonDescription')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
