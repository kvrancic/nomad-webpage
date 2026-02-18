'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'hr', label: 'HR', flag: '🇭🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const

interface LanguageSwitcherProps {
  isTransparent?: boolean
}

export function LanguageSwitcher({ isTransparent = false }: LanguageSwitcherProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (newLocale: 'hr' | 'en') => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className={cn(
      'flex items-center gap-1 rounded-full p-1',
      isTransparent ? 'bg-white/15 backdrop-blur-sm' : 'bg-neutral-100'
    )}>
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
            locale === loc.code
              ? isTransparent
                ? 'bg-white/25 text-white shadow-sm'
                : 'bg-white text-anthracite-500 shadow-sm'
              : isTransparent
                ? 'text-white/70 hover:text-white'
                : 'text-neutral-500 hover:text-anthracite-500'
          )}
          aria-label={`Switch to ${loc.label}`}
        >
          <span className="mr-1">{loc.flag}</span>
          {loc.label}
        </button>
      ))}
    </div>
  )
}
