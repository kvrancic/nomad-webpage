import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = '€'): string {
  return `${price}${currency}`
}

export function formatDuration(minutes: number, label: string = 'min'): string {
  return `${minutes} ${label}`
}
