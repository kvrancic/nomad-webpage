'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { BARBERS, LOCATIONS, LIME_BOOKING_URLS } from '@/lib/constants'
import { fadeInUp, imageZoom, staggerContainer } from '@/lib/animations'
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Use Sanity data if available, otherwise fall back to constants
  const hasSanityData = barbers && barbers.length > 0
  const displayBarbers = hasSanityData ? barbers : BARBERS
  const globalBookingUrl = LIME_BOOKING_URLS.default

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll, displayBarbers])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector(':scope > div')?.clientWidth || 250
    const gap = 16
    const scrollAmount = (cardWidth + gap) * 2
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="py-10 md:py-14 bg-neutral-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8"
        >
          {/* Title row with arrows */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between gap-4">
            <h2 className="heading-2 text-anthracite-500">
              {t('title')}
            </h2>
            <div className="hidden md:flex gap-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center transition-colors hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-anthracite-500" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center transition-colors hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-anthracite-500" />
              </button>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={fadeInUp} className="body-large text-neutral-600 mt-3">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4 -mr-4 md:mr-0 snap-x snap-mandatory"
        >
          {displayBarbers.map((barber, index) => {
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
              <motion.div
                key={barberId}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`w-[260px] md:w-[280px] shrink-0 snap-start${index === 0 ? ' ml-4 md:ml-0' : ''}`}
              >
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
                            src={urlFor(barber.photo!).width(360).height(480).url()}
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
                      className="absolute inset-0 bg-gradient-to-t from-anthracite-900 via-anthracite-900/50 to-transparent flex flex-col justify-end p-4"
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

                  {/* Basic info always visible */}
                  <div className="p-4">
                    <h3 className="font-display text-lg uppercase tracking-tight text-anthracite-500">
                      {barberName}
                    </h3>
                    <p className="text-neutral-500 text-xs">{barberRole}</p>
                    {locationName && (
                      <p className="text-neutral-400 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {locationName}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-6">
          <Link href="/team">
            <Button variant="outline">
              {t('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
