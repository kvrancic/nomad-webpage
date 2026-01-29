'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { urlFor } from '../../../sanity/lib'
import type { SanityTestimonial } from '../../../sanity/lib'

interface TestimonialsProps {
  testimonials?: SanityTestimonial[]
  locale?: string
}

// Fallback review meta data for translation-based content
const reviewMeta = [
  { id: '1', author: 'Marko P.', rating: 5, timeKey: 'weeks', timeCount: 2 },
  { id: '2', author: 'Ivan K.', rating: 5, timeKey: 'month', timeCount: 1 },
  { id: '3', author: 'Luka M.', rating: 5, timeKey: 'weeks', timeCount: 3 },
  { id: '4', author: 'Petar S.', rating: 5, timeKey: 'months', timeCount: 2 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-4 h-4',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200'
          )}
        />
      ))}
    </div>
  )
}

export function Testimonials({ testimonials, locale = 'hr' }: TestimonialsProps) {
  const t = useTranslations('testimonials')

  // Use Sanity data if available, otherwise fall back to translations
  const hasSanityData = testimonials && testimonials.length > 0
  const displayTestimonials = hasSanityData ? testimonials.slice(0, 4) : reviewMeta

  const averageRating = hasSanityData
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : 4.9
  const totalReviews = hasSanityData ? testimonials.length : 200

  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-4xl text-anthracite-500">
              {averageRating}
            </span>
            <div className="flex flex-col">
              <StarRating rating={5} />
              <span className="text-sm text-neutral-500">
                {t('basedOn', { count: totalReviews })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayTestimonials.map((item) => {
            const isSanityItem = '_id' in item
            const itemId = isSanityItem ? item._id : item.id
            const authorName = isSanityItem ? item.name : item.author
            const rating = item.rating
            const reviewText = isSanityItem
              ? (locale === 'en' && item.reviewEn ? item.reviewEn : item.review)
              : t(`reviews.${item.id}`)
            const hasSanityAvatar = isSanityItem && item.avatar

            return (
              <motion.div key={itemId} variants={fadeInUp}>
                <Card hover variant="outlined" className="h-full">
                  <CardContent className="flex flex-col h-full">
                    <Quote className="w-8 h-8 text-mint-200 mb-4" />

                    <p className="text-neutral-600 text-sm mb-4 flex-grow">
                      &ldquo;{reviewText}&rdquo;
                    </p>

                    <div className="pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {hasSanityAvatar && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={urlFor(item.avatar!).width(40).height(40).url()}
                                alt={authorName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-anthracite-500">
                              {authorName}
                            </p>
                            {!isSanityItem && (
                              <p className="text-xs text-neutral-400">
                                {t(`timeAgo.${item.timeKey}`, { count: item.timeCount })}
                              </p>
                            )}
                            {isSanityItem && item.location && (
                              <p className="text-xs text-neutral-400">
                                {item.location.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <StarRating rating={rating} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
