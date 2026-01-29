'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowDown, Gift } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { HeroPlaceholder } from '@/components/shared/PlaceholderImage'
import { Link } from '@/i18n/routing'
import { FRESHA_URLS } from '@/lib/constants'
import {
  staggerContainer,
  fadeInUp,
  textRevealContainer,
  textRevealCharacter,
} from '@/lib/animations'
import type { SanitySiteSettings } from '../../../sanity/lib'

interface HeroProps {
  videoUrl?: string
  settings?: SanitySiteSettings | null
}

export function Hero({ videoUrl, settings }: HeroProps) {
  const t = useTranslations('hero')

  const headlineChars = t('headline').split('')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - Video or Placeholder */}
      {videoUrl ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      ) : (
        <HeroPlaceholder />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-anthracite-900/80 via-anthracite-900/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Headline with character animation */}
          <motion.h1
            className="heading-1 mb-6"
            variants={textRevealContainer}
            initial="hidden"
            animate="visible"
          >
            {headlineChars.map((char, index) => (
              <motion.span
                key={index}
                variants={textRevealCharacter}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/80 mb-10 font-light"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs - Now with 3 buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href={settings?.freshaUrl || FRESHA_URLS.default} variant="primary" size="lg">
              {t('cta')}
            </Button>
            <Button
              href={settings?.giftCardsUrl || FRESHA_URLS.giftCards}
              variant="outline"
              size="lg"
              className="border-mint-500 text-mint-400 hover:bg-mint-500 hover:text-white"
              icon={<Gift className="w-5 h-5" />}
            >
              {t('ctaGiftCard')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-anthracite-500"
            >
              <Link href="/services">{t('ctaSecondary')}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
