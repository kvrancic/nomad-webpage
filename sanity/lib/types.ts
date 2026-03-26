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
  googleMapsUrl?: string
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
  bookingUrl?: string
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
  reviewAverageScore?: number
  reviewTotalCount?: number
  seoTitle?: string
  seoTitleEn?: string
  seoDescription?: string
  seoDescriptionEn?: string
}

export interface SanityAboutPage {
  storyTitle: string
  storyTitleEn?: string
  storyContent: string
  storyContentEn?: string
  storyContent2?: string
  storyContent2En?: string
  storyContent3?: string
  storyContent3En?: string
  storyImage?: SanityImage
  philosophyTitle: string
  philosophyTitleEn?: string
  philosophyContent: string
  philosophyContentEn?: string
  philosophyContent2?: string
  philosophyContent2En?: string
  philosophyContent3?: string
  philosophyContent3En?: string
  philosophyImage?: SanityImage
}

export interface SanityGiftCardStep {
  _key: string
  icon?: 'creditCard' | 'send' | 'gift'
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
}

export interface SanityGiftCardsPage {
  heroTitle: string
  heroTitleEn?: string
  heroSubtitle?: string
  heroSubtitleEn?: string
  heroDescription?: string
  heroDescriptionEn?: string
  heroImage?: SanityImage
  howItWorksTitle?: string
  howItWorksTitleEn?: string
  howItWorksSubtitle?: string
  howItWorksSubtitleEn?: string
  steps?: SanityGiftCardStep[]
}

export interface SanityWhatToExpect {
  badge?: string
  badgeEn?: string
  title: string
  titleEn?: string
  subtitle?: string
  subtitleEn?: string
  description?: string
  descriptionEn?: string
  images?: Array<SanityImage & { label?: string }>
}

export interface SanityExperienceFeature {
  _key: string
  icon?: 'whiskey' | 'beer' | 'coffee' | 'atmosphere'
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
}

export interface SanityExperienceShowcase {
  badge?: string
  badgeEn?: string
  title: string
  titleEn?: string
  subtitle?: string
  subtitleEn?: string
  description?: string
  descriptionEn?: string
  features?: SanityExperienceFeature[]
  mainImage?: SanityImage
  secondaryImage?: SanityImage
}
