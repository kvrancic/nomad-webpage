'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { FRESHA_URLS, SITE_CONFIG } from '@/lib/constants'

interface HeaderProps {
  bookingUrl?: string
}

export function Header({ bookingUrl = FRESHA_URLS.default }: HeaderProps) {
  const t = useTranslations('navigation')
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // White transparent navbar only on homepage before scroll
  const isTransparent = isHomepage && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent py-5'
            : 'bg-white/95 backdrop-blur-md shadow-sm py-3'
        )}
        initial={isHomepage ? { y: -100 } : false}
        animate={{ y: 0 }}
        transition={isHomepage ? { duration: 0.5 } : { duration: 0 }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-display text-2xl md:text-3xl uppercase tracking-tight transition-colors',
              isTransparent
                ? 'text-white hover:text-mint-400 drop-shadow-md'
                : 'text-anthracite-500 hover:text-mint-500'
            )}
          >
            Nomad
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Navigation isTransparent={isTransparent} />
          </div>

          {/* Right side - Language Switcher + Phone + Book Button */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher isTransparent={isTransparent} />
            </div>

            {/* Phone - visible on larger screens */}
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className={cn(
                'hidden lg:flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors',
                isTransparent
                  ? 'text-white/80 hover:text-white drop-shadow-md'
                  : 'text-anthracite-500 hover:text-mint-500'
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{SITE_CONFIG.phone}</span>
            </a>

            <Button
              href={bookingUrl}
              variant="primary"
              size="sm"
              className="hidden sm:flex"
            >
              {t('bookNow')}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors',
                isTransparent
                  ? 'text-white hover:text-mint-400 drop-shadow-md'
                  : 'text-anthracite-500 hover:text-mint-500'
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            bookingUrl={bookingUrl}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
