'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Gift, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'
import { FRESHA_URLS } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function CTASection() {
  const tHero = useTranslations('hero')
  const tGift = useTranslations('giftCards')

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-mint-500 to-mint-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center text-white"
        >
          <motion.h2
            variants={fadeInUp}
            className="heading-2 mb-4"
          >
            {tHero('headline')}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            {tHero('subheadline')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              href={FRESHA_URLS.default}
              variant="secondary"
              size="lg"
              icon={<Calendar className="w-5 h-5" />}
            >
              {tHero('cta')}
            </Button>

            <Link href="/gift-cards">
              <Button
                variant="outline"
                size="lg"
                icon={<Gift className="w-5 h-5" />}
                className="border-white/30 text-white hover:bg-white hover:text-mint-600"
              >
                {tGift('purchase')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
