'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { tapScale, hoverScale } from '@/lib/animations'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  href?: string
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-mint-500 text-white hover:bg-mint-600 focus:ring-mint-500 shadow-lg shadow-mint-500/25',
  secondary:
    'bg-anthracite-500 text-white hover:bg-anthracite-600 focus:ring-anthracite-500',
  outline:
    'border-2 border-mint-500 text-mint-500 bg-transparent hover:bg-mint-500 hover:text-white focus:ring-mint-500',
  ghost:
    'text-anthracite-500 hover:bg-anthracite-50 focus:ring-anthracite-300',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      href,
      loading = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 font-medium',
      'transition-colors duration-300 ease-out rounded-sm',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    )

    if (href) {
      return (
        <motion.a
          href={href}
          className={baseClasses}
          whileHover={!disabled ? hoverScale : undefined}
          whileTap={!disabled ? tapScale : undefined}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {content}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? hoverScale : undefined}
        whileTap={!disabled && !loading ? tapScale : undefined}
        {...props}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
