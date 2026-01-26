'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GalleryItem } from '@/components/ui/GalleryItem'
import { Link } from '@/i18n/routing'
import { staggerContainer, fadeInUp } from '@/lib/animations'

// Placeholder gallery items
const galleryItems = [
  { id: '1', category: 'fades', barber: 'Sara', service: 'Skin Fade' },
  { id: '2', category: 'classic', barber: 'Stjepan', service: 'Classic Cut' },
  { id: '3', category: 'beard', barber: 'Ivan', service: 'Beard Trim' },
  { id: '4', category: 'fades', barber: 'Lovro', service: 'Mid Fade' },
]

export function GalleryPreview() {
  const t = useTranslations('gallery')

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
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
            >
              <GalleryItem
                beforeLabel={t('before')}
                afterLabel={t('after')}
                barber={item.barber}
                service={item.service}
                category={item.category}
                aspectRatio={index === 0 || index === 3 ? 'portrait' : 'square'}
              />
            </motion.div>
          ))}
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
