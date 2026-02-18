#!/usr/bin/env node

/**
 * Seed script for About and Gift Cards page content.
 * Safe to re-run — uses createIfNotExists (won't overwrite existing data).
 *
 * Usage: node scripts/seed-about-giftcards.mjs
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
    _id: 'aboutPage',
    _type: 'aboutPage',
    storyTitle: hr.about.story.title,
    storyTitleEn: en.about.story.title,
    storyContent: hr.about.story.content,
    storyContentEn: en.about.story.content,
    storyContent2: hr.about.story.content2,
    storyContent2En: en.about.story.content2,
    storyContent3: hr.about.story.content3,
    storyContent3En: en.about.story.content3,
    philosophyTitle: hr.about.philosophy.title,
    philosophyTitleEn: en.about.philosophy.title,
    philosophyContent: hr.about.philosophy.content,
    philosophyContentEn: en.about.philosophy.content,
    philosophyContent2: hr.about.philosophy.content2,
    philosophyContent2En: en.about.philosophy.content2,
    philosophyContent3: hr.about.philosophy.content3,
    philosophyContent3En: en.about.philosophy.content3,
  },
  {
    _id: 'giftCardsPage',
    _type: 'giftCardsPage',
    heroTitle: hr.giftCards.title,
    heroTitleEn: en.giftCards.title,
    heroSubtitle: hr.giftCards.subtitle,
    heroSubtitleEn: en.giftCards.subtitle,
    heroDescription: hr.giftCards.description,
    heroDescriptionEn: en.giftCards.description,
    benefitsTitle: hr.giftCards.whyTitle,
    benefitsTitleEn: en.giftCards.whyTitle,
    benefitsDescription: hr.giftCards.whyDescription,
    benefitsDescriptionEn: en.giftCards.whyDescription,
  },
]

async function seed() {
  console.log(`\n🌱 Seeding About + Gift Cards pages (project: ${projectId}, dataset: ${dataset})...\n`)
  const tx = client.transaction()
  for (const doc of docs) tx.createIfNotExists(doc)
  try {
    await tx.commit()
    console.log('✅ Created 2 documents (About Page + Gift Cards Page)')
    console.log('   - About: story + philosophy text (HR/EN). Images left empty — upload in Sanity Studio.')
    console.log('   - Gift Cards: hero + benefits text (HR/EN). Images left empty — upload in Sanity Studio.\n')
  } catch (error) {
    console.error('❌ Failed:', error.message)
    process.exit(1)
  }
}

seed()
