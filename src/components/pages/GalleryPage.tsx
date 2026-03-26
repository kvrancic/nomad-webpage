'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GalleryItem } from '@/components/ui/GalleryItem'
import { fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityGalleryItem, SanitySiteSettings } from '../../../sanity/lib'
import { SITE_CONFIG } from '@/lib/constants'

// Placeholder gallery items (fallback)
const placeholderGalleryItems = [
  { id: '1', category: 'fades' as const, barber: 'Sara', service: 'Skin Fade' },
  { id: '2', category: 'classic' as const, barber: 'Stjepan', service: 'Classic Cut' },
  { id: '3', category: 'beard' as const, barber: 'Ivan', service: 'Beard Trim' },
  { id: '4', category: 'fades' as const, barber: 'Lovro', service: 'Mid Fade' },
  { id: '5', category: 'classic' as const, barber: 'Magdalena', service: 'Long Hair' },
  { id: '6', category: 'fades' as const, barber: 'Sara', service: 'High Fade' },
  { id: '7', category: 'beard' as const, barber: 'Stjepan', service: 'Royal Beard' },
  { id: '8', category: 'classic' as const, barber: 'Ivan', service: 'Textured Crop' },
  { id: '9', category: 'fades' as const, barber: 'Lovro', service: 'Taper Fade' },
  { id: '10', category: 'beard' as const, barber: 'Magdalena', service: 'Beard Design' },
  { id: '11', category: 'classic' as const, barber: 'Sara', service: 'Pompadour' },
  { id: '12', category: 'fades' as const, barber: 'Stjepan', service: 'Low Fade' },
]

interface GalleryPageProps {
  gallery?: SanityGalleryItem[]
  locale?: string
  settings?: SanitySiteSettings | null
}

export function GalleryPage({ gallery, locale = 'hr', settings }: GalleryPageProps) {
  const t = useTranslations('gallery')

  const hasSanityData = gallery && gallery.length > 0
  const displayItems = hasSanityData ? gallery : placeholderGalleryItems

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayItems.map((item, index) => {
              const isSanity = '_id' in item
              const itemId = isSanity ? item._id : item.id
              const barberName = isSanity && item.barber ? item.barber.name : ('barber' in item ? item.barber : '')

              const beforeImageUrl = isSanity
                ? urlFor(item.beforeImage).width(400).height(500).url()
                : undefined
              const afterImageUrl = isSanity
                ? urlFor(item.afterImage).width(400).height(500).url()
                : undefined

              return (
                <motion.div
                  key={itemId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={index % 5 === 0 || index % 7 === 0 ? 'row-span-2' : ''}
                >
                  <GalleryItem
                    beforeLabel={t('before')}
                    afterLabel={t('after')}
                    barber={barberName as string}
                    aspectRatio={index % 5 === 0 || index % 7 === 0 ? 'portrait' : 'square'}
                    className="h-full"
                    beforeImage={beforeImageUrl}
                    afterImage={afterImageUrl}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 mb-4">
            {t('shareTransformation')}
          </p>
          <a
            href={settings?.instagram || SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-mint-500 font-medium hover:text-mint-600 transition-colors"
          >
            @{(settings?.instagram || SITE_CONFIG.instagram).replace(/^https?:\/\/(www\.)?instagram\.com\//, '')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
