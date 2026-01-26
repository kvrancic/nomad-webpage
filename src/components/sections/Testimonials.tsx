'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Star, Quote } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

// Review IDs that map to translations
const reviewIds = ['1', '2', '3', '4']

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

export function Testimonials() {
  const t = useTranslations('testimonials')

  const averageRating = 4.9
  const totalReviews = 200

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
          {reviewMeta.map((review) => (
            <motion.div key={review.id} variants={fadeInUp}>
              <Card hover variant="outlined" className="h-full">
                <CardContent className="flex flex-col h-full">
                  <Quote className="w-8 h-8 text-mint-200 mb-4" />

                  <p className="text-neutral-600 text-sm mb-4 flex-grow">
                    &ldquo;{t(`reviews.${review.id}`)}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-anthracite-500">
                          {review.author}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {t(`timeAgo.${review.timeKey}`, { count: review.timeCount })}
                        </p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
