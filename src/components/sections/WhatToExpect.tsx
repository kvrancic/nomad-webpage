'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/Badge'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'

export function WhatToExpect() {
  const t = useTranslations('whatToExpect')

  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left - Images Grid */}
          <motion.div variants={fadeInLeft} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <PlaceholderImage
                  category="experience"
                  label="Ambiance"
                  aspectRatio="portrait"
                  className="rounded-lg shadow-lg"
                />
                <PlaceholderImage
                  category="service"
                  label="Precision"
                  aspectRatio="square"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <PlaceholderImage
                  category="gallery"
                  label="Style"
                  aspectRatio="square"
                  className="rounded-lg shadow-lg"
                />
                <PlaceholderImage
                  category="experience"
                  label="Relaxation"
                  aspectRatio="portrait"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-mint-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-anthracite-500/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={fadeInRight}>
            <Badge variant="mint" className="mb-4">
              {t('badge')}
            </Badge>

            <h2 className="heading-2 text-anthracite-500 mb-4">
              {t('title')}
            </h2>

            <p className="text-mint-600 text-xl font-medium mb-4">
              {t('subtitle')}
            </p>

            <p className="text-neutral-600 text-lg max-w-lg">
              {t('description')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
