'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Tabs } from '@/components/ui/Tabs'
import { Card, CardContent } from '@/components/ui/Card'
import { SERVICES, FRESHA_URLS } from '@/lib/constants'
import { formatPrice, formatDuration } from '@/lib/utils'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface Service {
  id: string
  name: string
  price: number
  duration: number
  popular?: boolean
}

function ServiceCard({ service }: { service: Service }) {
  const t = useTranslations('services')

  return (
    <Card hover variant="elevated" className="h-full">
      <CardContent className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-xl uppercase tracking-tight text-anthracite-500">
              {t(`items.${service.name}.name`)}
            </h3>
            {service.popular && (
              <Badge variant="mint" size="sm" className="mt-2">
                {t('popular')}
              </Badge>
            )}
          </div>
          <span className="font-display text-3xl text-mint-500">
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
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {t('bookService')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service) => (
        <motion.div key={service.id} variants={fadeInUp}>
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export function ServicesPage() {
  const t = useTranslations('services')

  const tabs = [
    {
      id: 'hair',
      label: t('tabs.hair'),
      content: <ServiceGrid services={SERVICES.hair} />,
    },
    {
      id: 'beard',
      label: t('tabs.beard'),
      content: <ServiceGrid services={SERVICES.beard} />,
    },
    {
      id: 'packages',
      label: t('tabs.packages'),
      content: <ServiceGrid services={SERVICES.packages} />,
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <Tabs tabs={tabs} defaultTab="hair" variant="pill" />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 mb-4">
            Ne možeš odlučiti? Kontaktiraj nas za preporuku.
          </p>
          <Button href={FRESHA_URLS.default} variant="primary" size="lg">
            {t('bookService')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
