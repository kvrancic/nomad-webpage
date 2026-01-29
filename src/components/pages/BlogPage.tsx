'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FileText, Calendar, User } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Link } from '@/i18n/routing'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityBlogPost } from '../../../sanity/lib'

interface BlogPageProps {
  posts?: SanityBlogPost[]
  locale?: string
}

export function BlogPage({ posts, locale = 'hr' }: BlogPageProps) {
  const t = useTranslations('blog')

  const hasPosts = posts && posts.length > 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {hasPosts ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => {
              const title = locale === 'en' && post.titleEn ? post.titleEn : post.title
              const excerpt = locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt

              return (
                <motion.div key={post._id} variants={fadeInUp}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card hover variant="elevated" className="h-full overflow-hidden">
                      {post.featuredImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={urlFor(post.featuredImage).width(600).height(338).url()}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardContent className="flex flex-col h-full">
                        <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </span>
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author.name}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl text-anthracite-500 mb-3 line-clamp-2">
                          {title}
                        </h3>
                        {excerpt && (
                          <p className="text-neutral-600 text-sm mb-4 flex-grow line-clamp-3">
                            {excerpt}
                          </p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-mint-50 text-mint-700 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          /* Empty state - shown until blog posts are added via CMS */
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
        )}
      </div>
    </section>
  )
}
