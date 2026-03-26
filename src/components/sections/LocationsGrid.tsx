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

  // Group locations by city, preserving order
  type LocationItem = SanityLocation | typeof LOCATIONS[0]
  const cityGroups: { city: string; locations: LocationItem[] }[] = []
  for (const location of displayLocations) {
    const existing = cityGroups.find((g) => g.city === location.city)
    if (existing) {
      existing.locations.push(location)
    } else {
      cityGroups.push({ city: location.city, locations: [location] })
    }
  }

  const getBookingUrl = (location: SanityLocation | typeof LOCATIONS[0]) => {
    if ('freshaUrl' in location && location.freshaUrl) {
      return location.freshaUrl
    }
    if ('id' in location) {
      return FRESHA_URLS.locations[location.id as keyof typeof FRESHA_URLS.locations] || FRESHA_URLS.default
    }
    return settings?.freshaUrl || FRESHA_URLS.default
  }

  const getGoogleMapsUrl = (location: SanityLocation | typeof LOCATIONS[0]) => {
    if ('googleMapsUrl' in location && location.googleMapsUrl) {
      return location.googleMapsUrl
    }
    return `https://maps.google.com/?q=Nomad+Barbershop+${encodeURIComponent(location.name)},+${encodeURIComponent(location.city)}`
  }

  return (
    <section className="py-10 md:py-14 bg-neutral-50">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {cityGroups.map((group) => (
          <div key={group.city} className="mb-10 last:mb-0">
            {/* City header */}
            <div className="flex items-center gap-4 mb-6">
              <h3 className="font-display text-2xl uppercase tracking-tight text-anthracite-500">
                {group.city}
              </h3>
              <div className="flex-1 h-px bg-neutral-300" />
            </div>

            {/* Locations grid for this city */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {group.locations.map((location) => {
                const locationId = '_id' in location ? location._id : location.id
                const locationName = location.name
                const hasSanityImage = '_id' in location && location.image

                return (
                  <motion.div key={locationId} variants={fadeInUp}>
                    <Card
                      hover
                      variant="default"
                      padding="none"
                      className="h-full bg-white border border-neutral-200"
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
                        <h4 className="font-display text-xl uppercase tracking-tight text-anthracite-500 mb-3">
                          {locationName}
                        </h4>

                        {/* Address */}
                        <div className="flex items-start gap-2 text-neutral-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 mt-0.5 text-mint-500 flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start gap-2 text-neutral-600 text-sm mb-3">
                          <Clock className="w-4 h-4 mt-0.5 text-mint-500 flex-shrink-0" />
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
                          className="flex items-center gap-2 text-neutral-600 text-sm mb-3 hover:text-mint-500 transition-colors"
                        >
                          <Phone className="w-4 h-4 text-mint-500" />
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
                        <div className="flex gap-2 pt-3 border-t border-neutral-200">
                          <Button
                            href={getBookingUrl(location)}
                            variant="primary"
                            size="sm"
                            className="flex-1"
                          >
                            {t('book')}
                          </Button>
                          <Button
                            href={getGoogleMapsUrl(location)}
                            variant="ghost"
                            size="sm"
                            className="text-neutral-600 hover:text-anthracite-500 hover:bg-neutral-100"
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
        ))}
      </div>
    </section>
  )
}
