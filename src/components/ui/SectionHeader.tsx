'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Badge } from './Badge'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <motion.div variants={fadeInUp} className="mb-4">
          <Badge variant="mint">{badge}</Badge>
        </motion.div>
      )}
      <motion.h2
        variants={fadeInUp}
        className="heading-2 text-anthracite-500 mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'body-large text-neutral-600',
            align === 'center' && 'max-w-2xl mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
