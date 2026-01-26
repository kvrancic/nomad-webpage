import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'mint' | 'anthracite' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  default: 'bg-neutral-100 text-neutral-700',
  mint: 'bg-mint-100 text-mint-700',
  anthracite: 'bg-anthracite-500 text-white',
  outline: 'border border-mint-500 text-mint-500 bg-transparent',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
