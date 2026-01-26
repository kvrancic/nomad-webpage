'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover } from '@/lib/animations'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variants = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border border-neutral-200',
  glass: 'bg-white/80 backdrop-blur-md border border-white/20',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hover = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          variants[variant],
          paddings[padding],
          className
        )}
        initial="rest"
        whileHover={hover ? 'hover' : undefined}
        variants={hover ? cardHover : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Card subcomponents
export function CardHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({
  className,
  children,
  as: Component = 'h3',
}: {
  className?: string
  children: React.ReactNode
  as?: 'h2' | 'h3' | 'h4'
}) {
  return (
    <Component
      className={cn('font-display text-xl uppercase tracking-tight', className)}
    >
      {children}
    </Component>
  )
}

export function CardDescription({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p className={cn('text-neutral-600 text-sm mt-1', className)}>{children}</p>
  )
}

export function CardContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('', className)}>{children}</div>
}

export function CardFooter({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mt-4 pt-4 border-t border-neutral-100', className)}>{children}</div>
}
