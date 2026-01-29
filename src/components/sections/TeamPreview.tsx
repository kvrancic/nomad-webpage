'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { BARBERS, LOCATIONS, FRESHA_URLS } from '@/lib/constants'
import { staggerContainer, fadeInUp, imageZoom } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityBarber, SanitySiteSettings } from '../../../sanity/lib'

interface TeamPreviewProps {
  barbers?: SanityBarber[]
  locale?: string
  settings?: SanitySiteSettings | null
}

// Helper to get location name by id (for constants fallback)
const getLocationName = (locationId: string) => {
  const location = LOCATIONS.find(loc => loc.id === locationId)
  return location?.name || locationId
}

export function TeamPreview({ barbers, locale = 'hr', settings }: TeamPreviewProps) {
  const t = useTranslations('team')

  // Use Sanity data if available, otherwise fall back to constants
  const hasSanityData = barbers && barbers.length > 0
  const displayBarbers = hasSanityData ? barbers.slice(0, 3) : BARBERS.slice(0, 3)
  const bookingUrl = settings?.freshaUrl || FRESHA_URLS.default

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
          {displayBarbers.map((barber) => {
            const barberId = '_id' in barber ? barber._id : barber.id
            const barberName = barber.name
            const barberRole = '_id' in barber
              ? (locale === 'en' && barber.roleEn ? barber.roleEn : barber.role)
              : barber.role
            const barberBio = '_id' in barber
              ? (locale === 'en' && barber.bioEn ? barber.bioEn : barber.bio)
              : barber.bio
            const barberSpecialties = barber.specialties || []
            const hasSanityPhoto = '_id' in barber && barber.photo
            const locationName = '_id' in barber && barber.location
              ? barber.location.name
              : 'location' in barber
                ? getLocationName(barber.location as string)
                : ''

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

                    {/* Overlay with info on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-anthracite-900 via-anthracite-900/50 to-transparent flex flex-col justify-end p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {barberBio && (
                        <p className="text-white/80 text-sm mb-3">{barberBio}</p>
                      )}
                      {barberSpecialties.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {barberSpecialties.map((specialty) => (
                            <Badge key={specialty} variant="mint" size="sm">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      )}
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

                  {/* Basic info always visible */}
                  <div className="p-6">
                    <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500">
                      {barberName}
                    </h3>
                    <p className="text-neutral-500 text-sm">{barberRole}</p>
                    {locationName && (
                      <p className="text-neutral-400 text-xs mt-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {locationName}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
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
