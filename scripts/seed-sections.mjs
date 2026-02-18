#!/usr/bin/env node

/**
 * Seed script for new homepage sections: What to Expect + Experience Showcase.
 * Safe to re-run — uses createIfNotExists (won't overwrite existing data).
 *
 * Usage: node scripts/seed-sections.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
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

if (!projectId || !token) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

const hr = JSON.parse(readFileSync(resolve(__dirname, '..', 'messages', 'hr.json'), 'utf-8'))
const en = JSON.parse(readFileSync(resolve(__dirname, '..', 'messages', 'en.json'), 'utf-8'))

const docs = [
  {
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
  },
  {
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
    features: ['whiskey', 'beer', 'coffee', 'atmosphere'].map((key) => ({
      _key: key,
      _type: 'object',
      icon: key,
      title: hr.experience.features[key].title,
      titleEn: en.experience.features[key].title,
      description: hr.experience.features[key].description,
      descriptionEn: en.experience.features[key].description,
    })),
  },
]

async function seed() {
  console.log(`\n🌱 Seeding sections (project: ${projectId}, dataset: ${dataset})...\n`)
  const tx = client.transaction()
  for (const doc of docs) tx.createIfNotExists(doc)
  try {
    await tx.commit()
    console.log('✅ Created 2 documents (What to Expect + Experience Showcase)')
    console.log('   Images left empty — upload them in Sanity Studio.\n')
  } catch (error) {
    console.error('❌ Failed:', error.message)
    process.exit(1)
  }
}

seed()
