'use client'

import { cn } from '@/lib/utils'
import { Scissors, User, Image, MapPin, Sparkles } from 'lucide-react'

type PlaceholderCategory = 'barber' | 'service' | 'gallery' | 'location' | 'hero' | 'experience'

interface PlaceholderImageProps {
  category?: PlaceholderCategory
  label?: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
}

const categoryConfig: Record<PlaceholderCategory, { bg: string; icon: React.ReactNode }> = {
  barber: {
    bg: 'bg-gradient-to-br from-anthracite-100 to-anthracite-200',
    icon: <User className="w-8 h-8 md:w-12 md:h-12" />,
  },
  service: {
    bg: 'bg-gradient-to-br from-mint-50 to-mint-100',
    icon: <Scissors className="w-8 h-8 md:w-12 md:h-12" />,
  },
  gallery: {
    bg: 'bg-gradient-to-br from-neutral-100 to-neutral-200',
    icon: <Image className="w-8 h-8 md:w-12 md:h-12" />,
  },
  location: {
    bg: 'bg-gradient-to-br from-anthracite-50 to-anthracite-100',
    icon: <MapPin className="w-8 h-8 md:w-12 md:h-12" />,
  },
  hero: {
    bg: 'bg-gradient-to-br from-anthracite-500 to-anthracite-700',
    icon: <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white/50" />,
  },
  experience: {
    bg: 'bg-gradient-to-br from-mint-600 to-anthracite-600',
    icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-white/50" />,
  },
}

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

export function PlaceholderImage({
  category = 'gallery',
  label,
  className,
  aspectRatio = 'square',
}: PlaceholderImageProps) {
  const config = categoryConfig[category]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg overflow-hidden',
        config.bg,
        aspectRatios[aspectRatio],
        className
      )}
    >
      <span className={cn(
        'text-neutral-400',
        category === 'hero' || category === 'experience' ? 'text-white/30' : ''
      )}>
        {config.icon}
      </span>
      {label && (
        <span className={cn(
          'mt-2 text-xs md:text-sm font-medium',
          category === 'hero' || category === 'experience'
            ? 'text-white/40'
            : 'text-neutral-400'
        )}>
          {label}
        </span>
      )}
    </div>
  )
}

// Hero placeholder with animated gradient
export function HeroPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute inset-0 bg-gradient-to-br from-anthracite-600 via-anthracite-700 to-anthracite-800',
        className
      )}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mint-500/10 via-transparent to-transparent animate-pulse" />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
    </div>
  )
}
