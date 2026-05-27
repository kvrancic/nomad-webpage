'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { BARBERS, LOCATIONS, LIME_BOOKING_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, imageZoom } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityBarber, SanitySiteSettings } from '../../../sanity/lib'

interface TeamPageProps {
  barbers?: SanityBarber[]
  locale?: string
  settings?: SanitySiteSettings | null
}

// Helper to get location name by id
const getLocationName = (locationId: string) => {
  const location = LOCATIONS.find(loc => loc.id === locationId)
  return location?.name || locationId
}

export function TeamPage({ barbers, locale = 'hr', settings }: TeamPageProps) {
  const t = useTranslations('team')

  const hasSanityData = barbers && barbers.length > 0
  const displayBarbers = hasSanityData ? barbers : BARBERS
  const globalBookingUrl = LIME_BOOKING_URLS.default

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayBarbers.map((barber) => {
            const barberId = '_id' in barber ? barber._id : barber.id
            const barberName = barber.name
            const barberRole = '_id' in barber
              ? (locale === 'en' && barber.roleEn ? barber.roleEn : barber.role)
              : barber.role
            const hasSanityPhoto = '_id' in barber && barber.photo
            const locationName = '_id' in barber && barber.location
              ? barber.location.name
              : 'location' in barber
                ? getLocationName(barber.location as string)
                : ''

            // Look up per-barber booking URL by lowercase name; fall back to general URL.
            const bookingUrl = LIME_BOOKING_URLS.barbers[barberName.toLowerCase()] || globalBookingUrl

            return (
              <motion.div key={barberId} variants={fadeInUp}>
                <Card hover variant="default" padding="none" className="overflow-hidden group">
                  {/* Image */}
                  <motion.div
                    className="relative overflow-hidden"
                    initial="rest"
                    whileHover="hover"
                  >
                    <motion.div variants={imageZoom}>
                      {hasSanityPhoto ? (
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image
                            src={urlFor(barber.photo!).width(400).height(533).url()}
                            alt={barberName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <PlaceholderImage
                          category="barber"
                          label={barberName}
                          aspectRatio="portrait"
                        />
                      )}
                    </motion.div>

                    {/* Simplified overlay - just booking button */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-anthracite-900 via-anthracite-900/50 to-transparent flex flex-col justify-end p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        href={bookingUrl}
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        {t('bookWith', { name: barberName })}
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Basic info always visible: name, role, location */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl uppercase tracking-tight text-anthracite-500">
                      {barberName}
                    </h3>
                    <p className="text-neutral-500">{barberRole}</p>
                    {locationName && (
                      <p className="text-neutral-400 text-sm mt-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {locationName}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
