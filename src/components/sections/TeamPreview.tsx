'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { BARBERS, LOCATIONS, FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, imageZoom } from '@/lib/animations'

// Helper to get location name by id
const getLocationName = (locationId: string) => {
  const location = LOCATIONS.find(loc => loc.id === locationId)
  return location?.name || locationId
}

// Show first 3 barbers
const previewBarbers = BARBERS.slice(0, 3)

export function TeamPreview() {
  const t = useTranslations('team')

  return (
    <section className="py-16 md:py-20">
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
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {previewBarbers.map((barber) => (
            <motion.div key={barber.id} variants={fadeInUp}>
              <Card hover variant="default" padding="none" className="overflow-hidden group">
                {/* Image */}
                <motion.div
                  className="relative overflow-hidden"
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div variants={imageZoom}>
                    <PlaceholderImage
                      category="barber"
                      label={barber.name}
                      aspectRatio="portrait"
                    />
                  </motion.div>

                  {/* Overlay with info on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-anthracite-900 via-anthracite-900/50 to-transparent flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white/80 text-sm mb-3">{barber.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {barber.specialties.map((specialty) => (
                        <Badge key={specialty} variant="mint" size="sm">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      href={FRESHA_URLS.default}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      {t('bookWith', { name: barber.name })}
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Basic info always visible */}
                <div className="p-6">
                  <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500">
                    {barber.name}
                  </h3>
                  <p className="text-neutral-500 text-sm">{barber.role}</p>
                  <p className="text-neutral-400 text-xs mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {getLocationName(barber.location)}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/team">
            <Button variant="outline">{t('viewAll')}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
