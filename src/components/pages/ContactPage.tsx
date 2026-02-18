'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MapPin, Clock, Phone, Car, ExternalLink, Mail, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { LOCATIONS, SITE_CONFIG, FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityLocation, SanitySiteSettings } from '../../../sanity/lib'

interface ContactPageProps {
  locations?: SanityLocation[]
  locale?: string
  settings?: SanitySiteSettings | null
}

export function ContactPage({ locations, locale = 'hr', settings }: ContactPageProps) {
  const t = useTranslations('contact')
  const tLoc = useTranslations('locations')

  const hasSanityData = locations && locations.length > 0
  const displayLocations = hasSanityData ? locations : LOCATIONS

  const getBookingUrl = (location: SanityLocation | typeof LOCATIONS[0]) => {
    if ('freshaUrl' in location && location.freshaUrl) {
      return location.freshaUrl
    }
    if ('id' in location) {
      return FRESHA_URLS.locations[location.id as keyof typeof FRESHA_URLS.locations] || FRESHA_URLS.default
    }
    return settings?.freshaUrl || FRESHA_URLS.default
  }

  return (
    <>
      {/* Locations Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <SectionHeader
            title={tLoc('title')}
            subtitle={tLoc('subtitle')}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-8"
          >
            {displayLocations.map((location) => {
              const locationId = '_id' in location ? location._id : location.id
              const locationName = location.name
              const hasSanityImage = '_id' in location && location.image

              return (
                <motion.div key={locationId} variants={fadeInUp}>
                  <Card hover variant="elevated" padding="none" className="overflow-hidden h-full">
                    <div className="flex flex-col">
                      {/* Image */}
                      {hasSanityImage ? (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={urlFor(location.image!).width(600).height(338).url()}
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
                          className="w-full"
                        />
                      )}

                      {/* Info */}
                      <CardContent className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-2xl uppercase tracking-tight text-anthracite-500 mb-4">
                          {locationName}
                        </h3>

                        {/* Address */}
                        <div className="flex items-start gap-3 text-neutral-600 mb-3">
                          <MapPin className="w-5 h-5 mt-0.5 text-mint-500 flex-shrink-0" />
                          <div>
                            <p>{location.address}</p>
                            <p>{location.city}</p>
                          </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start gap-3 text-neutral-600 mb-3">
                          <Clock className="w-5 h-5 mt-0.5 text-mint-500 flex-shrink-0" />
                          <div>
                            <p>{tLoc('hours.weekdays')}: {location.hours.weekdays}</p>
                            <p>{tLoc('hours.saturday')}: {location.hours.saturday}</p>
                            {location.hours.sunday === null && (
                              <p className="text-neutral-400">
                                {tLoc('hours.sunday')}: {tLoc('hours.closed')}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Phone */}
                        <a
                          href={`tel:${location.phone}`}
                          className="flex items-center gap-3 text-neutral-600 mb-3 hover:text-mint-500 transition-colors"
                        >
                          <Phone className="w-5 h-5 text-mint-500" />
                          {location.phone}
                        </a>

                        {/* Parking */}
                        {location.parking && (
                          <div className="flex items-center gap-3 text-neutral-400 mb-4">
                            <Car className="w-5 h-5" />
                            {tLoc('parking')}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-4">
                          <Button
                            href={getBookingUrl(location)}
                            variant="primary"
                            size="sm"
                            className="flex-1"
                          >
                            {tLoc('book')}
                          </Button>
                          <Button
                            href={`https://maps.google.com/?q=Nomad+Barbershop+${encodeURIComponent(locationName)},+${encodeURIComponent(location.city)}`}
                            variant="outline"
                            size="sm"
                            icon={<ExternalLink className="w-4 h-4" />}
                          >
                            {tLoc('directions')}
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-anthracite-500">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-mint-500/20 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-mint-400" />
              </div>
              <h3 className="font-display text-xl uppercase text-white mb-2">
                {t('info.phone')}
              </h3>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="text-neutral-300 hover:text-mint-400 transition-colors"
              >
                {SITE_CONFIG.phone}
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-mint-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-mint-400" />
              </div>
              <h3 className="font-display text-xl uppercase text-white mb-2">
                {t('info.email')}
              </h3>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-neutral-300 hover:text-mint-400 transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-mint-500/20 rounded-full flex items-center justify-center">
                <Instagram className="w-8 h-8 text-mint-400" />
              </div>
              <h3 className="font-display text-xl uppercase text-white mb-2">
                {t('info.social')}
              </h3>
              <a
                href={settings?.instagram || SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-mint-400 transition-colors"
              >
                @{(settings?.instagram || SITE_CONFIG.instagram).replace(/^https?:\/\/(www\.)?instagram\.com\//, '')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
