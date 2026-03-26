'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { staggerContainer, fadeInLeft, fadeInRight } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityWhatToExpect } from '../../../sanity/lib'

interface WhatToExpectProps {
  data?: SanityWhatToExpect | null
  locale?: string
}

const defaultImageLabels = ['Ambiance', 'Precision', 'Style', 'Relaxation']
const defaultImageCategories: Array<'experience' | 'service' | 'gallery' | 'experience'> = [
  'experience', 'service', 'gallery', 'experience',
]
const defaultAspectRatios: Array<'portrait' | 'square'> = ['portrait', 'square', 'square', 'portrait']

export function WhatToExpect({ data, locale = 'hr' }: WhatToExpectProps) {
  const t = useTranslations('whatToExpect')

  const badge = data
    ? (locale === 'en' && data.badgeEn ? data.badgeEn : data.badge)
    : t('badge')
  const title = data
    ? (locale === 'en' && data.titleEn ? data.titleEn : data.title)
    : t('title')
  const subtitle = data
    ? (locale === 'en' && data.subtitleEn ? data.subtitleEn : data.subtitle)
    : t('subtitle')
  const description = data
    ? (locale === 'en' && data.descriptionEn ? data.descriptionEn : data.description)
    : t('description')

  const hasImages = data?.images && data.images.length > 0

  return (
    <section className="py-10 md:py-14 bg-anthracite-500">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left - Images Grid */}
          <motion.div variants={fadeInLeft} className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                {hasImages && data.images![0] ? (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={urlFor(data.images![0]).width(400).height(500).url()}
                      alt={data.images![0].label || 'Image 1'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    category={defaultImageCategories[0]}
                    label={defaultImageLabels[0]}
                    aspectRatio={defaultAspectRatios[0]}
                    className="rounded-lg shadow-lg"
                  />
                )}
                {hasImages && data.images![1] ? (
                  <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={urlFor(data.images![1]).width(400).height(400).url()}
                      alt={data.images![1].label || 'Image 2'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    category={defaultImageCategories[1]}
                    label={defaultImageLabels[1]}
                    aspectRatio={defaultAspectRatios[1]}
                    className="rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className="space-y-3 pt-6">
                {hasImages && data.images![2] ? (
                  <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={urlFor(data.images![2]).width(400).height(400).url()}
                      alt={data.images![2].label || 'Image 3'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    category={defaultImageCategories[2]}
                    label={defaultImageLabels[2]}
                    aspectRatio={defaultAspectRatios[2]}
                    className="rounded-lg shadow-lg"
                  />
                )}
                {hasImages && data.images![3] ? (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={urlFor(data.images![3]).width(400).height(500).url()}
                      alt={data.images![3].label || 'Image 4'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    category={defaultImageCategories[3]}
                    label={defaultImageLabels[3]}
                    aspectRatio={defaultAspectRatios[3]}
                    className="rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-mint-500/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-mint-500/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={fadeInRight}>
            {badge && (
              <Badge variant="mint" className="mb-4">
                {badge}
              </Badge>
            )}

            <h2 className="heading-2 text-white mb-4">
              {title}
            </h2>

            {subtitle && (
              <p className="text-mint-400 text-xl font-medium mb-4">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-neutral-300 text-lg max-w-lg leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
