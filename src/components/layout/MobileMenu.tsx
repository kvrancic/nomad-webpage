'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { slideInRight, staggerContainer, fadeInRight } from '@/lib/animations'
import { FRESHA_URLS } from '@/lib/constants'

const navItems = [
  { key: 'services', href: '/services' },
  { key: 'team', href: '/team' },
  { key: 'experience', href: '/experience' },
  { key: 'gallery', href: '/gallery' },
  { key: 'about', href: '/about' },
  { key: 'locations', href: '/locations' },
  { key: 'blog', href: '/blog' },
  { key: 'faq', href: '/faq' },
  { key: 'giftCards', href: '/gift-cards' },
] as const

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const t = useTranslations('navigation')
  const pathname = usePathname()

  return (
    <motion.div
      className="fixed inset-0 z-40 lg:hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-anthracite-900/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
        variants={slideInRight}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Navigation Links */}
          <motion.nav
            className="flex-1"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <motion.li key={item.key} variants={fadeInRight}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block py-3 text-lg font-medium transition-colors',
                        isActive
                          ? 'text-mint-500'
                          : 'text-anthracite-500 hover:text-mint-500'
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>

          {/* Bottom Section */}
          <motion.div
            className="space-y-4 pt-6 border-t border-neutral-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <LanguageSwitcher />

            <Button
              href={FRESHA_URLS.default}
              variant="primary"
              className="w-full"
              onClick={onClose}
            >
              {t('bookNow')}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
