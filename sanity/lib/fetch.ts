import { client, projectId } from './client'
import {
  locationsQuery,
  barbersQuery,
  servicesQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  galleryQuery,
  featuredGalleryQuery,
  faqsQuery,
  homepageFaqsQuery,
  testimonialsQuery,
  featuredTestimonialsQuery,
  siteSettingsQuery,
} from './queries'
import type {
  SanityLocation,
  SanityBarber,
  SanityService,
  SanityBlogPost,
  SanityBlogPostFull,
  SanityGalleryItem,
  SanityFaq,
  SanityTestimonial,
  SanitySiteSettings,
} from './types'

// Check if Sanity is properly configured
const isSanityConfigured = projectId && projectId !== 'placeholder'

// Helper to safely fetch from Sanity
async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured) {
    return null
  }
  try {
    return await client.fetch(query, params, { next: { tags: ['sanity'] } })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}

// Locations
export async function getLocations(): Promise<SanityLocation[]> {
  const result = await safeFetch<SanityLocation[]>(locationsQuery)
  return result || []
}

// Barbers
export async function getBarbers(): Promise<SanityBarber[]> {
  const result = await safeFetch<SanityBarber[]>(barbersQuery)
  return result || []
}

// Services
export async function getServices(): Promise<SanityService[]> {
  const result = await safeFetch<SanityService[]>(servicesQuery)
  return result || []
}

export async function getServicesByCategory(): Promise<{
  hair: SanityService[]
  beard: SanityService[]
  packages: SanityService[]
}> {
  const services = await getServices()
  return {
    hair: services.filter((s) => s.category === 'hair'),
    beard: services.filter((s) => s.category === 'beard'),
    packages: services.filter((s) => s.category === 'packages'),
  }
}

// Blog
export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  const result = await safeFetch<SanityBlogPost[]>(blogPostsQuery)
  return result || []
}

export async function getBlogPost(slug: string): Promise<SanityBlogPostFull | null> {
  return safeFetch<SanityBlogPostFull>(blogPostBySlugQuery, { slug })
}

// Gallery
export async function getGallery(): Promise<SanityGalleryItem[]> {
  const result = await safeFetch<SanityGalleryItem[]>(galleryQuery)
  return result || []
}

export async function getFeaturedGallery(): Promise<SanityGalleryItem[]> {
  const result = await safeFetch<SanityGalleryItem[]>(featuredGalleryQuery)
  return result || []
}

// FAQs
export async function getFaqs(): Promise<SanityFaq[]> {
  const result = await safeFetch<SanityFaq[]>(faqsQuery)
  return result || []
}

export async function getHomepageFaqs(): Promise<SanityFaq[]> {
  const result = await safeFetch<SanityFaq[]>(homepageFaqsQuery)
  return result || []
}

// Testimonials
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  const result = await safeFetch<SanityTestimonial[]>(testimonialsQuery)
  return result || []
}

export async function getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
  const result = await safeFetch<SanityTestimonial[]>(featuredTestimonialsQuery)
  return result || []
}

// Site Settings
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return safeFetch<SanitySiteSettings>(siteSettingsQuery)
}
