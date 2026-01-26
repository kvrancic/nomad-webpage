'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { underline } from '@/lib/animations'

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

export function Navigation() {
  const t = useTranslations('navigation')
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <motion.div
            key={item.key}
            className="relative"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <Link
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive
                  ? 'text-mint-500'
                  : 'text-anthracite-500 hover:text-mint-500'
              )}
            >
              {t(item.key)}
            </Link>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mint-500 origin-center"
              variants={underline}
              style={{ scaleX: isActive ? 1 : 0 }}
            />
          </motion.div>
        )
      })}
    </nav>
  )
}
