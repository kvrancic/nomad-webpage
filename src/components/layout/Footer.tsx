'use client'

import { useTranslations } from 'next-intl'
import { Instagram, Facebook, Mail, Phone } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { SITE_CONFIG, LOCATIONS } from '@/lib/constants'

const navLinks = [
  { key: 'services', href: '/services' as const },
  { key: 'team', href: '/team' as const },
  { key: 'experience', href: '/experience' as const },
  { key: 'gallery', href: '/gallery' as const },
  { key: 'about', href: '/about' as const },
  { key: 'locations', href: '/locations' as const },
  { key: 'blog', href: '/blog' as const },
  { key: 'faq', href: '/faq' as const },
  { key: 'giftCards', href: '/gift-cards' as const },
]

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-anthracite-500 text-white">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-3xl uppercase tracking-tight mb-4 block"
            >
              Nomad
            </Link>
            <p className="text-neutral-300 text-sm mb-6">{t('tagline')}</p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">
              {t('navigation')}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 text-sm hover:text-mint-400 transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">
              {t('locations')}
            </h3>
            <ul className="space-y-3">
              {LOCATIONS.map((location) => (
                <li key={location.id}>
                  <span className="text-white text-sm font-medium block">
                    {location.name}
                  </span>
                  <span className="text-neutral-400 text-sm">
                    {location.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">
              {t('social')}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 text-neutral-300 text-sm hover:text-mint-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-neutral-300 text-sm hover:text-mint-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-anthracite-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Nomad Barbershop. {t('rights')}.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-neutral-400 text-sm hover:text-mint-400 transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/"
              className="text-neutral-400 text-sm hover:text-mint-400 transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
