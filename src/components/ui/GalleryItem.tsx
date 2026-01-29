'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { cn } from '@/lib/utils'

interface GalleryItemProps {
  beforeLabel: string
  afterLabel: string
  barber?: string
  service?: string
  category?: string
  aspectRatio?: 'square' | 'portrait'
  className?: string
  beforeImage?: string
  afterImage?: string
}

export function GalleryItem({
  beforeLabel,
  afterLabel,
  barber,
  service,
  category,
  aspectRatio = 'square',
  className,
  beforeImage,
  afterImage,
}: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasRealImages = beforeImage && afterImage

  return (
    <>
      {/* Gallery Item */}
      <div
        className={cn('relative cursor-pointer overflow-hidden rounded-lg', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* After image (default) */}
        <div className={cn('transition-opacity duration-300', isHovered ? 'opacity-0' : 'opacity-100')}>
          {hasRealImages ? (
            <div className={cn('relative overflow-hidden', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square')}>
              <Image
                src={afterImage}
                alt={afterLabel}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <PlaceholderImage
              category="gallery"
              label={afterLabel}
              aspectRatio={aspectRatio}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Before image (on hover) */}
        <div className={cn('absolute inset-0 transition-opacity duration-300', isHovered ? 'opacity-100' : 'opacity-0')}>
          {hasRealImages ? (
            <div className={cn('relative overflow-hidden', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square')}>
              <Image
                src={beforeImage}
                alt={beforeLabel}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <PlaceholderImage
              category="gallery"
              label={beforeLabel}
              aspectRatio={aspectRatio}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Info overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-900/80 via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="text-white">
            {service && <p className="font-medium text-sm">{service}</p>}
            {barber && <p className="text-xs text-white/70">by {barber}</p>}
          </div>
        </div>

        {/* Hover indicator */}
        <div className={cn(
          'absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium transition-opacity duration-300',
          isHovered ? 'bg-anthracite-500 text-white opacity-100' : 'bg-mint-500 text-white opacity-100'
        )}>
          {isHovered ? beforeLabel : afterLabel}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-anthracite-900/90"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-anthracite-500" />
              </button>

              {/* Before/After comparison */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Before */}
                <div className="relative">
                  {hasRealImages ? (
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={beforeImage}
                        alt={beforeLabel}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PlaceholderImage
                      category="gallery"
                      label={beforeLabel}
                      aspectRatio="square"
                      className="w-full"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-anthracite-500 text-white rounded text-sm font-medium">
                    {beforeLabel}
                  </div>
                </div>

                {/* After */}
                <div className="relative">
                  {hasRealImages ? (
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={afterImage}
                        alt={afterLabel}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PlaceholderImage
                      category="gallery"
                      label={afterLabel}
                      aspectRatio="square"
                      className="w-full"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-mint-500 text-white rounded text-sm font-medium">
                    {afterLabel}
                  </div>
                </div>
              </div>

              {/* Info footer */}
              {(service || barber) && (
                <div className="p-4 bg-neutral-50 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      {service && <p className="font-medium text-anthracite-500">{service}</p>}
                      {barber && <p className="text-sm text-neutral-600">by {barber}</p>}
                    </div>
                    {category && (
                      <span className="px-3 py-1 bg-mint-100 text-mint-700 rounded-full text-xs font-medium capitalize">
                        {category}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
