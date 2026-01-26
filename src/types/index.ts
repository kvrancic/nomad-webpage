export interface Location {
  id: string
  name: string
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
}

export interface Barber {
  id: string
  name: string
  role: string
  bio: string
  specialties: string[]
  instagram?: string
  location: string
  image?: string
}

export interface Service {
  id: string
  name: string
  price: number
  duration: number
  popular?: boolean
}

export interface ServiceCategory {
  id: 'hair' | 'beard' | 'packages'
  services: Service[]
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  avatar?: string
}

export interface GalleryItem {
  id: string
  before: string
  after: string
  barber: string
  service: string
  description?: string
  category: 'fades' | 'classic' | 'beard'
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  tags: string[]
}

export interface NavItem {
  key: string
  href: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}
