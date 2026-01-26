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

// Get ALL services in order: Hair → Beard → Packages
const allServices: Array<{
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

export function ServicesPreview() {
  const t = useTranslations('services')

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
          {allServices.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <Card hover variant="elevated" className="h-full">
                <CardContent className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500">
                        {t(`items.${service.name}.name`)}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {service.popular && (
                          <Badge variant="mint" size="sm">
                            {t('popular')}
                          </Badge>
                        )}
                        <Badge variant="default" size="sm" className="text-xs">
                          {t(`tabs.${service.category}`)}
                        </Badge>
                      </div>
                    </div>
                    <span className="font-display text-2xl text-mint-500">
                      {formatPrice(service.price)}
                    </span>
                  </div>

                  <p className="text-neutral-600 text-sm mb-4 flex-grow">
                    {t(`items.${service.name}.description`)}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock className="w-4 h-4" />
                      {formatDuration(service.duration, t('duration'))}
                    </span>
                    <Button
                      href={FRESHA_URLS.default}
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
          ))}
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
