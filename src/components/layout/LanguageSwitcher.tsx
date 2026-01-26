'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'hr', label: 'HR', flag: '🇭🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (newLocale: 'hr' | 'en') => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 bg-neutral-100 rounded-full p-1">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
            locale === loc.code
              ? 'bg-white text-anthracite-500 shadow-sm'
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
