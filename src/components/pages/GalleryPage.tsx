'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GalleryItem } from '@/components/ui/GalleryItem'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'

type FilterCategory = 'all' | 'fades' | 'classic' | 'beard'

// Placeholder gallery items
const galleryItems = [
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

const filters: FilterCategory[] = ['all', 'fades', 'classic', 'beard']

export function GalleryPage() {
  const t = useTranslations('gallery')
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeFilter === filter
                  ? 'bg-mint-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  // Varying heights for masonry effect
                  index % 5 === 0 || index % 7 === 0 ? 'row-span-2' : ''
                )}
              >
                <GalleryItem
                  beforeLabel={t('before')}
                  afterLabel={t('after')}
                  barber={item.barber}
                  service={item.service}
                  category={item.category}
                  aspectRatio={index % 5 === 0 || index % 7 === 0 ? 'portrait' : 'square'}
                  className="h-full"
                />
              </motion.div>
            ))}
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
            href="https://instagram.com/nomadbarbershop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-mint-500 font-medium hover:text-mint-600 transition-colors"
          >
            @nomadbarbershop
          </a>
        </motion.div>
      </div>
    </section>
  )
}
