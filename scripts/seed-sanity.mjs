#!/usr/bin/env node

/**
 * Seed script to pre-populate Sanity CMS with all existing placeholder content.
 *
 * This populates: Site Settings, Locations, Barbers, Services, FAQs, Testimonials
 * All text comes from the existing translation files and constants.
 *
 * Usage:
 *   1. Create a Sanity API token at https://sanity.io/manage → project → API → Tokens
 *      (needs "Editor" permissions)
 *   2. Add SANITY_API_TOKEN=<your-token> to .env.local
 *   3. Run: npm run seed
 *
 * Safe to re-run — uses createOrReplace with deterministic IDs.
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load env vars from .env.local
const envPath = resolve(__dirname, '..', '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIndex = trimmed.indexOf('=')
  if (eqIndex === -1) continue
  env[trimmed.slice(0, eqIndex)] = trimmed.slice(eqIndex + 1)
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  process.exit(1)
}
if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN in .env.local')
  console.error('   Create one at https://sanity.io/manage → your project → API → Tokens (Editor role)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Load translation files
const hr = JSON.parse(readFileSync(resolve(__dirname, '..', 'messages', 'hr.json'), 'utf-8'))
const en = JSON.parse(readFileSync(resolve(__dirname, '..', 'messages', 'en.json'), 'utf-8'))

// ─── Site Settings ──────────────────────────────────────────────────────────
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Nomad Barbershop',
  phone: '+385 91 7280 306',
  email: 'barbershop@olivers.hr',
  instagram: 'https://instagram.com/nomadbarbershop',
  facebook: 'https://facebook.com/nomadbarbershop',
  freshaUrl: 'https://www.fresha.com/book-now/nomad-barbershop-zagreb',
  giftCardsUrl: 'https://www.fresha.com/gift-cards/nomad-barbershop-zagreb',
  seoTitle: hr.metadata.title,
  seoTitleEn: en.metadata.title,
  seoDescription: hr.metadata.description,
  seoDescriptionEn: en.metadata.description,
}

// ─── Locations ──────────────────────────────────────────────────────────────
const locations = [
  {
    _id: 'location-radnicka',
    _type: 'location',
    name: 'Zagreb Tower',
    slug: { _type: 'slug', current: 'radnicka' },
    address: 'Radnička cesta 80',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: { weekdays: '08:00 - 20:00', saturday: '09:00 - 14:00', sunday: null },
    parking: true,
    coordinates: { lat: 45.8006, lng: 15.9819 },
    freshaUrl: 'https://www.fresha.com/book-now/nomad-barbershop-radnicka-cesta-80-zagreb',
    order: 0,
  },
  {
    _id: 'location-spansko',
    _type: 'location',
    name: 'Špansko',
    slug: { _type: 'slug', current: 'spansko' },
    address: 'Trg 101. brigade',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: { weekdays: '08:00 - 20:00', saturday: '09:00 - 14:00', sunday: null },
    parking: true,
    coordinates: { lat: 45.7982, lng: 15.9057 },
    freshaUrl: 'https://www.fresha.com/book-now/nomad-barbershop-spansko-zagreb',
    order: 1,
  },
  {
    _id: 'location-laniste',
    _type: 'location',
    name: 'Lanište',
    slug: { _type: 'slug', current: 'laniste' },
    address: 'Lanište 15/A',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: { weekdays: '08:00 - 20:00', saturday: '09:00 - 14:00', sunday: null },
    parking: true,
    coordinates: { lat: 45.7731, lng: 15.8919 },
    freshaUrl: 'https://www.fresha.com/book-now/nomad-barbershop-laniste-zagreb',
    order: 2,
  },
  {
    _id: 'location-kutnjacki',
    _type: 'location',
    name: 'Kutnjački put',
    slug: { _type: 'slug', current: 'kutnjacki' },
    address: 'Kutnjački put 8',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: { weekdays: '08:00 - 20:00', saturday: '09:00 - 14:00', sunday: null },
    parking: true,
    coordinates: { lat: 45.7892, lng: 16.0234 },
    freshaUrl: 'https://www.fresha.com/book-now/nomad-barbershop-kutnjacki-put-zagreb',
    order: 3,
  },
]

// ─── Barbers ────────────────────────────────────────────────────────────────
const barbers = [
  {
    _id: 'barber-sara',
    _type: 'barber',
    name: 'Sara',
    slug: { _type: 'slug', current: 'sara' },
    role: 'Senior Barber',
    roleEn: 'Senior Barber',
    bio: 'Specijalizirana za moderne fade frizure i precizne linije.',
    bioEn: 'Specialized in modern fade hairstyles and precise lines.',
    specialties: ['Fade', 'Skin Fade', 'Dizajn'],
    location: { _type: 'reference', _ref: 'location-radnicka' },
    order: 0,
  },
  {
    _id: 'barber-stjepan',
    _type: 'barber',
    name: 'Stjepan',
    slug: { _type: 'slug', current: 'stjepan' },
    role: 'Master Barber',
    roleEn: 'Master Barber',
    bio: 'Iskusni majstor klasičnih tehnika i brade.',
    bioEn: 'Experienced master of classic techniques and beards.',
    specialties: ['Klasika', 'Brada', 'Hot Towel'],
    location: { _type: 'reference', _ref: 'location-spansko' },
    order: 1,
  },
  {
    _id: 'barber-lovro',
    _type: 'barber',
    name: 'Lovro',
    slug: { _type: 'slug', current: 'lovro' },
    role: 'Barber',
    roleEn: 'Barber',
    bio: 'Kreativac specijaliziran za moderne trendove.',
    bioEn: 'Creative specialist in modern trends.',
    specialties: ['Textured Crop', 'Mullet', 'Fade'],
    location: { _type: 'reference', _ref: 'location-laniste' },
    order: 2,
  },
  {
    _id: 'barber-ivan',
    _type: 'barber',
    name: 'Ivan',
    slug: { _type: 'slug', current: 'ivan' },
    role: 'Barber',
    roleEn: 'Barber',
    bio: 'Precizan u detaljima, majstor za line-up.',
    bioEn: 'Precise in details, master of the line-up.',
    specialties: ['Line-up', 'Taper', 'Beard Design'],
    location: { _type: 'reference', _ref: 'location-kutnjacki' },
    order: 3,
  },
  {
    _id: 'barber-magdalena',
    _type: 'barber',
    name: 'Magdalena',
    slug: { _type: 'slug', current: 'magdalena' },
    role: 'Barber',
    roleEn: 'Barber',
    bio: 'Stručnjakinja za dužu kosu i stiliziranje.',
    bioEn: 'Specialist in longer hair and styling.',
    specialties: ['Long Hair', 'Styling', 'Pomade Finish'],
    location: { _type: 'reference', _ref: 'location-radnicka' },
    order: 4,
  },
]

// ─── Services ───────────────────────────────────────────────────────────────
const services = [
  {
    _id: 'service-basic-cut',
    _type: 'service',
    name: hr.services.items.basicCut.name,
    nameEn: en.services.items.basicCut.name,
    slug: { _type: 'slug', current: 'basic-cut' },
    description: hr.services.items.basicCut.description,
    descriptionEn: en.services.items.basicCut.description,
    price: 19,
    duration: 30,
    category: 'hair',
    popular: false,
    order: 0,
  },
  {
    _id: 'service-long-hair',
    _type: 'service',
    name: hr.services.items.longHairCut.name,
    nameEn: en.services.items.longHairCut.name,
    slug: { _type: 'slug', current: 'long-hair' },
    description: hr.services.items.longHairCut.description,
    descriptionEn: en.services.items.longHairCut.description,
    price: 33,
    duration: 45,
    category: 'hair',
    popular: false,
    order: 1,
  },
  {
    _id: 'service-nomad-cut',
    _type: 'service',
    name: hr.services.items.nomadCut.name,
    nameEn: en.services.items.nomadCut.name,
    slug: { _type: 'slug', current: 'nomad-cut' },
    description: hr.services.items.nomadCut.description,
    descriptionEn: en.services.items.nomadCut.description,
    price: 20,
    duration: 35,
    category: 'hair',
    popular: true,
    order: 2,
  },
  {
    _id: 'service-beard-trim',
    _type: 'service',
    name: hr.services.items.beardTrim.name,
    nameEn: en.services.items.beardTrim.name,
    slug: { _type: 'slug', current: 'beard-trim' },
    description: hr.services.items.beardTrim.description,
    descriptionEn: en.services.items.beardTrim.description,
    price: 16,
    duration: 20,
    category: 'beard',
    popular: false,
    order: 0,
  },
  {
    _id: 'service-beard-royal',
    _type: 'service',
    name: hr.services.items.beardRoyal.name,
    nameEn: en.services.items.beardRoyal.name,
    slug: { _type: 'slug', current: 'beard-royal' },
    description: hr.services.items.beardRoyal.description,
    descriptionEn: en.services.items.beardRoyal.description,
    price: 25,
    duration: 30,
    category: 'beard',
    popular: false,
    order: 1,
  },
  {
    _id: 'service-combo',
    _type: 'service',
    name: hr.services.items.combo.name,
    nameEn: en.services.items.combo.name,
    slug: { _type: 'slug', current: 'combo' },
    description: hr.services.items.combo.description,
    descriptionEn: en.services.items.combo.description,
    price: 33,
    duration: 50,
    category: 'packages',
    popular: true,
    order: 0,
  },
  {
    _id: 'service-nomad-ritual',
    _type: 'service',
    name: hr.services.items.nomadRitual.name,
    nameEn: en.services.items.nomadRitual.name,
    slug: { _type: 'slug', current: 'nomad-ritual' },
    description: hr.services.items.nomadRitual.description,
    descriptionEn: en.services.items.nomadRitual.description,
    price: 55,
    duration: 75,
    category: 'packages',
    popular: false,
    order: 1,
  },
]

// ─── FAQs ───────────────────────────────────────────────────────────────────
const faqKeys = ['reservation', 'drinks', 'parking', 'giftcards', 'cancel', 'products', 'kids', 'first-visit']
const homepageFaqKeys = ['reservation', 'drinks', 'parking', 'giftcards']

const faqs = faqKeys.map((key, index) => ({
  _id: `faq-${key}`,
  _type: 'faq',
  question: hr.faq.items[key].title,
  questionEn: en.faq.items[key].title,
  answer: hr.faq.items[key].content,
  answerEn: en.faq.items[key].content,
  showOnHomepage: homepageFaqKeys.includes(key),
  order: index,
}))

// ─── Testimonials ───────────────────────────────────────────────────────────
const testimonialNames = ['Marko P.', 'Luka S.', 'Ante K.', 'Dino M.']
const testimonialLocations = [
  'location-radnicka',
  'location-spansko',
  'location-laniste',
  'location-kutnjacki',
]

const testimonials = ['1', '2', '3', '4'].map((key, index) => ({
  _id: `testimonial-${key}`,
  _type: 'testimonial',
  name: testimonialNames[index],
  rating: 5,
  review: hr.testimonials.reviews[key],
  reviewEn: en.testimonials.reviews[key],
  date: new Date(Date.now() - (index + 1) * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  featured: true,
  location: { _type: 'reference', _ref: testimonialLocations[index] },
  order: index,
}))

// ─── What to Expect ──────────────────────────────────────────────────────────
const whatToExpectDoc = {
  _id: 'whatToExpect',
  _type: 'whatToExpect',
  badge: hr.whatToExpect.badge,
  badgeEn: en.whatToExpect.badge,
  title: hr.whatToExpect.title,
  titleEn: en.whatToExpect.title,
  subtitle: hr.whatToExpect.subtitle,
  subtitleEn: en.whatToExpect.subtitle,
  description: hr.whatToExpect.description,
  descriptionEn: en.whatToExpect.description,
  // images are left empty — customer can upload in Studio
}

// ─── Experience Showcase ─────────────────────────────────────────────────────
const experienceShowcaseDoc = {
  _id: 'experienceShowcase',
  _type: 'experienceShowcase',
  badge: hr.experience.badge,
  badgeEn: en.experience.badge,
  title: hr.experience.title,
  titleEn: en.experience.title,
  subtitle: hr.experience.subtitle,
  subtitleEn: en.experience.subtitle,
  description: hr.experience.description,
  descriptionEn: en.experience.description,
  features: [
    {
      _key: 'whiskey',
      _type: 'object',
      icon: 'whiskey',
      title: hr.experience.features.whiskey.title,
      titleEn: en.experience.features.whiskey.title,
      description: hr.experience.features.whiskey.description,
      descriptionEn: en.experience.features.whiskey.description,
    },
    {
      _key: 'beer',
      _type: 'object',
      icon: 'beer',
      title: hr.experience.features.beer.title,
      titleEn: en.experience.features.beer.title,
      description: hr.experience.features.beer.description,
      descriptionEn: en.experience.features.beer.description,
    },
    {
      _key: 'coffee',
      _type: 'object',
      icon: 'coffee',
      title: hr.experience.features.coffee.title,
      titleEn: en.experience.features.coffee.title,
      description: hr.experience.features.coffee.description,
      descriptionEn: en.experience.features.coffee.description,
    },
    {
      _key: 'atmosphere',
      _type: 'object',
      icon: 'atmosphere',
      title: hr.experience.features.atmosphere.title,
      titleEn: en.experience.features.atmosphere.title,
      description: hr.experience.features.atmosphere.description,
      descriptionEn: en.experience.features.atmosphere.description,
    },
  ],
  // mainImage and secondaryImage are left empty — customer can upload in Studio
}

// ─── Seed ───────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌱 Seeding Sanity (project: ${projectId}, dataset: ${dataset})...\n`)

  const allDocuments = [
    siteSettings,
    whatToExpectDoc,
    experienceShowcaseDoc,
    ...locations,
    ...barbers,
    ...services,
    ...faqs,
    ...testimonials,
  ]

  const transaction = client.transaction()

  for (const doc of allDocuments) {
    transaction.createOrReplace(doc)
  }

  try {
    const result = await transaction.commit()
    console.log(`✅ Successfully seeded ${allDocuments.length} documents!\n`)
    console.log('   Documents created/updated:')
    console.log(`   • 1 Site Settings`)
    console.log(`   • 1 What to Expect section`)
    console.log(`   • 1 Experience Showcase section`)
    console.log(`   • ${locations.length} Locations`)
    console.log(`   • ${barbers.length} Barbers`)
    console.log(`   • ${services.length} Services`)
    console.log(`   • ${faqs.length} FAQs`)
    console.log(`   • ${testimonials.length} Testimonials`)
    console.log(`\n   Transaction ID: ${result.transactionId}`)
    console.log('\n🎉 Done! Open Sanity Studio at /studio to see the content.')
    console.log('   The customer can now edit all content — existing text serves as fallback.\n')
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seed()
