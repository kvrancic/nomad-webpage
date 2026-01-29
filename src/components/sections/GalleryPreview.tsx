'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GalleryItem } from '@/components/ui/GalleryItem'
import { Link } from '@/i18n/routing'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityGalleryItem } from '../../../sanity/lib'

interface GalleryPreviewProps {
  gallery?: SanityGalleryItem[]
  locale?: string
}

// Placeholder gallery items (fallback)
const placeholderGalleryItems = [
  { id: '1', category: 'fades', barber: 'Sara', service: 'Skin Fade' },
  { id: '2', category: 'classic', barber: 'Stjepan', service: 'Classic Cut' },
  { id: '3', category: 'beard', barber: 'Ivan', service: 'Beard Trim' },
  { id: '4', category: 'fades', barber: 'Lovro', service: 'Mid Fade' },
]

export function GalleryPreview({ gallery, locale = 'hr' }: GalleryPreviewProps) {
  const t = useTranslations('gallery')

  // Use Sanity data if available, otherwise fall back to placeholder
  const hasSanityData = gallery && gallery.length > 0
  const displayItems = hasSanityData ? gallery.slice(0, 4) : placeholderGalleryItems

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          {displayItems.map((item, index) => {
            const isSanityItem = '_id' in item
            const itemId = isSanityItem ? item._id : item.id
            const barberName = isSanityItem && item.barber ? item.barber.name : item.barber
            const serviceName = isSanityItem && item.service
              ? (locale === 'en' && item.service.nameEn ? item.service.nameEn : item.service.name)
              : 'service' in item ? item.service : ''
            const category = item.category

            // If Sanity data, get image URLs
            const beforeImageUrl = isSanityItem
              ? urlFor(item.beforeImage).width(400).height(500).url()
              : undefined
            const afterImageUrl = isSanityItem
              ? urlFor(item.afterImage).width(400).height(500).url()
              : undefined

            return (
              <motion.div key={itemId} variants={fadeInUp}>
                <GalleryItem
                  beforeLabel={t('before')}
                  afterLabel={t('after')}
                  barber={barberName as string}
                  service={serviceName as string}
                  category={category}
                  aspectRatio={index === 0 || index === 3 ? 'portrait' : 'square'}
                  beforeImage={beforeImageUrl}
                  afterImage={afterImageUrl}
                />
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center">
          <Link href="/gallery">
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
