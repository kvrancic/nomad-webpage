/**
 * Migration Script: Constants to Sanity
 *
 * This script migrates existing data from src/lib/constants.ts to Sanity.
 *
 * Prerequisites:
 * 1. Set up your Sanity project at sanity.io
 * 2. Create a .env.local file with:
 *    - NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *    - NEXT_PUBLIC_SANITY_DATASET=production
 *    - SANITY_API_TOKEN=your_write_token (create at sanity.io/manage > API > Tokens)
 *
 * Usage:
 *   npx ts-node --esm scripts/migrate-to-sanity.ts
 *
 * Or add to package.json scripts:
 *   "migrate": "ts-node --esm scripts/migrate-to-sanity.ts"
 */

import { createClient } from '@sanity/client'
import { LOCATIONS, BARBERS, SERVICES, FAQ_ITEMS, SITE_CONFIG, FRESHA_URLS } from '../src/lib/constants'

// Initialize Sanity client with write access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
  useCdn: false,
})

async function migrateLocations() {
  console.log('Migrating locations...')

  for (let i = 0; i < LOCATIONS.length; i++) {
    const location = LOCATIONS[i]
    const doc = {
      _type: 'location',
      _id: `location-${location.id}`,
      name: location.name,
      slug: { _type: 'slug', current: location.id },
      address: location.address,
      city: location.city,
      phone: location.phone,
      hours: {
        weekdays: location.hours.weekdays,
        saturday: location.hours.saturday,
        sunday: location.hours.sunday || undefined,
      },
      parking: location.parking,
      coordinates: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      },
      freshaUrl: FRESHA_URLS.locations[location.id as keyof typeof FRESHA_URLS.locations],
      order: i,
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${location.name}`)
  }
}

async function migrateBarbers() {
  console.log('Migrating barbers...')

  for (let i = 0; i < BARBERS.length; i++) {
    const barber = BARBERS[i]
    const doc = {
      _type: 'barber',
      _id: `barber-${barber.id}`,
      name: barber.name,
      slug: { _type: 'slug', current: barber.id },
      role: barber.role,
      bio: barber.bio,
      specialties: barber.specialties,
      location: barber.location ? { _type: 'reference', _ref: `location-${barber.location}` } : undefined,
      order: i,
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${barber.name}`)
  }
}

async function migrateServices() {
  console.log('Migrating services...')

  const allServices = [
    ...SERVICES.hair.map((s, i) => ({ ...s, category: 'hair' as const, order: i })),
    ...SERVICES.beard.map((s, i) => ({ ...s, category: 'beard' as const, order: i + 10 })),
    ...SERVICES.packages.map((s, i) => ({ ...s, category: 'packages' as const, order: i + 20 })),
  ]

  for (const service of allServices) {
    const doc = {
      _type: 'service',
      _id: `service-${service.id}`,
      name: service.name, // This is actually the translation key, owner will update
      slug: { _type: 'slug', current: service.id },
      price: service.price,
      duration: service.duration,
      category: service.category,
      popular: 'popular' in service ? service.popular : false,
      order: service.order,
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${service.name}`)
  }
}

async function migrateFAQs() {
  console.log('Migrating FAQs...')

  // Note: FAQ content is stored in translation files
  // We're creating placeholder documents that the owner will update
  const faqContent: Record<string, { hr: { q: string; a: string }; en: { q: string; a: string } }> = {
    reservation: {
      hr: {
        q: 'Trebam li rezervaciju?',
        a: 'Da, preporučujemo rezervaciju putem Fresha kako biste osigurali svoj termin. Walk-in klijenti su dobrodošli ovisno o dostupnosti.',
      },
      en: {
        q: 'Do I need a reservation?',
        a: 'Yes, we recommend booking via Fresha to secure your slot. Walk-in clients are welcome based on availability.',
      },
    },
    drinks: {
      hr: {
        q: 'Nudite li piće?',
        a: 'Da! Nudimo besplatnu kavu, pivo ili viski tijekom vašeg posjeta. Opustite se i uživajte u iskustvu.',
      },
      en: {
        q: 'Do you offer drinks?',
        a: 'Yes! We offer complimentary coffee, beer, or whiskey during your visit. Relax and enjoy the experience.',
      },
    },
    parking: {
      hr: {
        q: 'Ima li parkiranja?',
        a: 'Da, sve naše lokacije imaju dostupno parkiranje u blizini. Kontaktirajte nas za specifične upute.',
      },
      en: {
        q: 'Is there parking available?',
        a: 'Yes, all our locations have parking available nearby. Contact us for specific directions.',
      },
    },
    giftcards: {
      hr: {
        q: 'Nudite li poklon bonove?',
        a: 'Da! Poklon bonovi su dostupni u bilo kojem iznosu i savršen su poklon za prijatelje i obitelj.',
      },
      en: {
        q: 'Do you offer gift cards?',
        a: 'Yes! Gift cards are available in any amount and make a perfect gift for friends and family.',
      },
    },
  }

  let order = 0
  for (const [id, content] of Object.entries(faqContent)) {
    const doc = {
      _type: 'faq',
      _id: `faq-${id}`,
      question: content.hr.q,
      questionEn: content.en.q,
      answer: content.hr.a,
      answerEn: content.en.a,
      showOnHomepage: true,
      order: order++,
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${id}`)
  }
}

async function migrateSiteSettings() {
  console.log('Migrating site settings...')

  const doc = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    siteName: SITE_CONFIG.name,
    phone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    instagram: SITE_CONFIG.instagram,
    facebook: SITE_CONFIG.facebook,
    freshaUrl: FRESHA_URLS.default,
    giftCardsUrl: FRESHA_URLS.giftCards,
  }

  await client.createOrReplace(doc)
  console.log('  ✓ Site settings')
}

async function main() {
  console.log('Starting migration to Sanity...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required')
    console.log('Create a token at: https://sanity.io/manage > Your Project > API > Tokens')
    process.exit(1)
  }

  try {
    await migrateLocations()
    await migrateBarbers()
    await migrateServices()
    await migrateFAQs()
    await migrateSiteSettings()

    console.log('\n✅ Migration complete!')
    console.log('\nNext steps:')
    console.log('1. Go to /studio to access Sanity Studio')
    console.log('2. Upload images for locations, barbers, and services')
    console.log('3. Update service names with actual Croatian/English names')
    console.log('4. Add testimonials and gallery items')
    console.log('5. Write blog posts')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

main()
