'use client'

import { useTranslations } from 'next-intl'
import { Instagram, Facebook, Mail, Phone } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { SITE_CONFIG, LOCATIONS } from '@/lib/constants'
import type { SanityLocation, SanitySiteSettings } from '../../../sanity/lib'

const navLinks = [
  { key: 'services', href: '/services' as const },
  { key: 'locations', href: '/locations' as const },
  { key: 'gallery', href: '/gallery' as const },
  { key: 'about', href: '/about' as const },
  { key: 'team', href: '/team' as const },
  { key: 'blog', href: '/blog' as const },
  { key: 'faq', href: '/faq' as const },
  { key: 'giftCards', href: '/gift-cards' as const },
]

interface FooterProps {
  locations?: SanityLocation[]
  settings?: SanitySiteSettings | null
}

export function Footer({ locations, settings }: FooterProps) {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')

  const currentYear = new Date().getFullYear()

  // Use Sanity data if available, otherwise fall back to constants
  const displayLocations = locations && locations.length > 0 ? locations : LOCATIONS
  const email = settings?.email || SITE_CONFIG.email
  const phone = settings?.phone || SITE_CONFIG.phone
  const instagramUrl = settings?.instagram || SITE_CONFIG.instagram
  const facebookUrl = settings?.facebook || SITE_CONFIG.facebook

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
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${email}`}
                className="text-neutral-400 hover:text-mint-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={`tel:${phone}`}
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
              {displayLocations.map((location) => {
                const locationId = '_id' in location ? location._id : location.id
                return (
                  <li key={locationId}>
                    <span className="text-white text-sm font-medium block">
                      {location.name}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      {location.address}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">
              {t('social')}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-neutral-300 text-sm hover:text-mint-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-neutral-300 text-sm hover:text-mint-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {email}
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
