import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
  alt?: string
  caption?: string
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityLocation {
  _id: string
  name: string
  slug: string
  address: string
  city: string
  phone: string
  hours: {
    weekdays: string
    saturday: string
    sunday: string | null
  }
  parking: boolean
  coordinates: {
    lat: number
    lng: number
  }
  freshaUrl?: string
  image?: SanityImage
}

export interface SanityBarber {
  _id: string
  name: string
  slug: string
  role: string
  roleEn?: string
  bio?: string
  bioEn?: string
  photo?: SanityImage
  specialties?: string[]
  instagram?: string
  location?: {
    _id: string
    name: string
    slug: string
  }
}

export interface SanityService {
  _id: string
  name: string
  nameEn?: string
  slug: string
  description?: string
  descriptionEn?: string
  price: number
  duration: number
  category: 'hair' | 'beard' | 'packages'
  popular?: boolean
  image?: SanityImage
}

export interface SanityBlogPost {
  _id: string
  title: string
  titleEn?: string
  slug: string
  excerpt?: string
  excerptEn?: string
  featuredImage?: SanityImage
  publishedAt: string
  tags?: string[]
  author?: {
    _id: string
    name: string
    photo?: SanityImage
  }
}

export interface SanityBlogPostFull extends SanityBlogPost {
  content?: PortableTextBlock[]
  contentEn?: PortableTextBlock[]
  author?: {
    _id: string
    name: string
    photo?: SanityImage
    bio?: string
    bioEn?: string
  }
}

export interface SanityGalleryItem {
  _id: string
  title?: string
  beforeImage: SanityImage
  afterImage: SanityImage
  category: 'fades' | 'classic' | 'beard'
  description?: string
  descriptionEn?: string
  featured?: boolean
  barber?: {
    _id: string
    name: string
  }
  service?: {
    _id: string
    name: string
    nameEn?: string
  }
}

export interface SanityFaq {
  _id: string
  question: string
  questionEn?: string
  answer: string
  answerEn?: string
  showOnHomepage?: boolean
}

export interface SanityTestimonial {
  _id: string
  name: string
  rating: number
  review: string
  reviewEn?: string
  avatar?: SanityImage
  date?: string
  featured?: boolean
  location?: {
    _id: string
    name: string
  }
}

export interface SanitySiteSettings {
  siteName?: string
  phone?: string
  email?: string
  instagram?: string
  facebook?: string
  freshaUrl?: string
  giftCardsUrl?: string
  heroVideo?: SanityFile
  heroImage?: SanityImage
  ogImage?: SanityImage
  seoTitle?: string
  seoTitleEn?: string
  seoDescription?: string
  seoDescriptionEn?: string
}
