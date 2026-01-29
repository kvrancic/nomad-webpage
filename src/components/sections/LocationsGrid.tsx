'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MapPin, Clock, Phone, Car, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Button } from '@/components/ui/Button'
import { LOCATIONS, FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityLocation, SanitySiteSettings } from '../../../sanity/lib'

interface LocationsGridProps {
  locations?: SanityLocation[]
  locale?: string
  settings?: SanitySiteSettings | null
}

export function LocationsGrid({ locations, locale, settings }: LocationsGridProps) {
  const t = useTranslations('locations')

  // Use Sanity data if available, otherwise fall back to constants
  const displayLocations = locations && locations.length > 0 ? locations : LOCATIONS

  const getBookingUrl = (location: SanityLocation | typeof LOCATIONS[0]) => {
    // If it's a Sanity location with freshaUrl
    if ('freshaUrl' in location && location.freshaUrl) {
      return location.freshaUrl
    }
    // If it's a constant location, use the FRESHA_URLS mapping
    if ('id' in location) {
      return FRESHA_URLS.locations[location.id as keyof typeof FRESHA_URLS.locations] || FRESHA_URLS.default
    }
    // Fallback to settings or default
    return settings?.freshaUrl || FRESHA_URLS.default
  }

  return (
    <section className="py-16 md:py-20 bg-anthracite-500">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          className="text-white [&_h2]:text-white [&_p]:text-neutral-300"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayLocations.map((location) => {
            const locationId = '_id' in location ? location._id : location.id
            const locationName = location.name
            const hasSanityImage = '_id' in location && location.image

            return (
              <motion.div key={locationId} variants={fadeInUp}>
                <Card
                  hover
                  variant="default"
                  padding="none"
                  className="h-full bg-anthracite-400 border border-anthracite-300"
                >
                  {/* Image */}
                  {hasSanityImage ? (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={urlFor(location.image!).width(400).height(225).url()}
                        alt={locationName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PlaceholderImage
                      category="location"
                      label={locationName}
                      aspectRatio="video"
                    />
                  )}

                  <CardContent className="p-5">
                    {/* Name */}
                    <h3 className="font-display text-xl uppercase tracking-tight text-white mb-3">
                      {locationName}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-neutral-300 text-sm mb-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-mint-400 flex-shrink-0" />
                      <span>
                        {location.address}, {location.city}
                      </span>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-2 text-neutral-300 text-sm mb-3">
                      <Clock className="w-4 h-4 mt-0.5 text-mint-400 flex-shrink-0" />
                      <div>
                        <p>
                          {t('hours.weekdays')}: {location.hours.weekdays}
                        </p>
                        <p>
                          {t('hours.saturday')}: {location.hours.saturday}
                        </p>
                        {location.hours.sunday === null && (
                          <p className="text-neutral-500">
                            {t('hours.sunday')}: {t('hours.closed')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <a
                      href={`tel:${location.phone}`}
                      className="flex items-center gap-2 text-neutral-300 text-sm mb-3 hover:text-mint-400 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-mint-400" />
                      {location.phone}
                    </a>

                    {/* Parking */}
                    {location.parking && (
                      <div className="flex items-center gap-2 text-neutral-400 text-sm mb-4">
                        <Car className="w-4 h-4" />
                        {t('parking')}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-anthracite-300">
                      <Button
                        href={getBookingUrl(location)}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        {t('book')}
                      </Button>
                      <Button
                        href={`https://maps.google.com/?q=${location.address},${location.city}`}
                        variant="ghost"
                        size="sm"
                        className="text-neutral-300 hover:text-white hover:bg-anthracite-300"
                        icon={<ExternalLink className="w-4 h-4" />}
                      >
                        {t('directions')}
                      </Button>
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
