'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Link } from '@/i18n/routing'
import { SERVICES, FRESHA_URLS } from '@/lib/constants'
import { formatPrice, formatDuration } from '@/lib/utils'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import type { SanityService, SanitySiteSettings } from '../../../sanity/lib'

interface ServicesPreviewProps {
  services?: SanityService[]
  locale?: string
  settings?: SanitySiteSettings | null
}

// Get ALL services in order: Hair → Beard → Packages (for constants fallback)
const allConstantServices: Array<{
  id: string
  name: string
  price: number
  duration: number
  popular?: boolean
  category: 'hair' | 'beard' | 'packages'
}> = [
  ...SERVICES.hair.map(s => ({ ...s, category: 'hair' as const })),
  ...SERVICES.beard.map(s => ({ ...s, category: 'beard' as const })),
  ...SERVICES.packages.map(s => ({ ...s, category: 'packages' as const })),
]

export function ServicesPreview({ services, locale = 'hr', settings }: ServicesPreviewProps) {
  const t = useTranslations('services')

  // Use Sanity data if available, otherwise fall back to constants
  const hasSanityData = services && services.length > 0
  const displayServices = hasSanityData ? services : allConstantServices
  const bookingUrl = settings?.freshaUrl || FRESHA_URLS.default

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* All services in a flat grid - no tabs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {displayServices.map((service) => {
            const serviceId = '_id' in service ? service._id : service.id
            const serviceName = '_id' in service
              ? (locale === 'en' && service.nameEn ? service.nameEn : service.name)
              : t(`items.${service.name}.name`)
            const serviceDescription = '_id' in service
              ? (locale === 'en' && service.descriptionEn ? service.descriptionEn : service.description)
              : t(`items.${service.name}.description`)
            const serviceCategory = service.category
            const isPopular = service.popular

            return (
              <motion.div key={serviceId} variants={fadeInUp}>
                <Card hover variant="elevated" className="h-full">
                  <CardContent className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500">
                          {serviceName}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {isPopular && (
                            <Badge variant="mint" size="sm">
                              {t('popular')}
                            </Badge>
                          )}
                          <Badge variant="default" size="sm" className="text-xs">
                            {t(`tabs.${serviceCategory}`)}
                          </Badge>
                        </div>
                      </div>
                      <span className="font-display text-2xl text-mint-500">
                        {formatPrice(service.price)}
                      </span>
                    </div>

                    {serviceDescription && (
                      <p className="text-neutral-600 text-sm mb-4 flex-grow">
                        {serviceDescription}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <span className="flex items-center gap-1 text-sm text-neutral-500">
                        <Clock className="w-4 h-4" />
                        {formatDuration(service.duration, t('duration'))}
                      </span>
                      <Button
                        href={bookingUrl}
                        variant="ghost"
                        size="sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        {t('bookService')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center">
          <Link href="/services">
            <Button variant="outline">{t('viewAll')}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
