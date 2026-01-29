'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Link } from '@/i18n/routing'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityBlogPost } from '../../../sanity/lib'

interface BlogPreviewProps {
  posts?: SanityBlogPost[]
  locale?: string
}

export function BlogPreview({ posts, locale = 'hr' }: BlogPreviewProps) {
  const t = useTranslations('blog')

  const hasPosts = posts && posts.length > 0
  const displayPosts = hasPosts ? posts.slice(0, 3) : []

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

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
              {displayPosts.map((post) => {
                const title = locale === 'en' && post.titleEn ? post.titleEn : post.title
                const excerpt = locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt

                return (
                  <motion.div key={post._id} variants={fadeInUp}>
                    <Card hover variant="elevated" className="h-full overflow-hidden">
                      {post.featuredImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={urlFor(post.featuredImage).width(400).height(225).url()}
                            alt={title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="flex flex-col h-full">
                        <span className="text-sm text-neutral-400 mb-2">
                          {formatDate(post.publishedAt)}
                        </span>
                        <h3 className="font-display text-xl text-anthracite-500 mb-3">
                          {title}
                        </h3>
                        {excerpt && (
                          <p className="text-neutral-600 text-sm mb-4 flex-grow">
                            {excerpt}
                          </p>
                        )}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-mint-600 hover:text-mint-700 font-medium text-sm"
                        >
                          {t('readMore')} →
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
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
