import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { WhatToExpect } from '@/components/sections/WhatToExpect'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { ExperienceShowcase } from '@/components/sections/ExperienceShowcase'
import { LocationsGrid } from '@/components/sections/LocationsGrid'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { TeamPreview } from '@/components/sections/TeamPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { FAQPreview } from '@/components/sections/FAQPreview'
import { CTASection } from '@/components/sections/CTASection'
import {
  getLocations,
  getBarbers,
  getServices,
  getFeaturedGallery,
  getHomepageFaqs,
  getFeaturedTestimonials,
  getBlogPosts,
  getSiteSettings,
} from '../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const settings = await getSiteSettings()

  const seoTitle = locale === 'en' ? settings?.seoTitleEn : settings?.seoTitle
  const seoDescription = locale === 'en' ? settings?.seoDescriptionEn : settings?.seoDescription

  return {
    title: seoTitle || t('title'),
    description: seoDescription || t('description'),
    openGraph: {
      title: seoTitle || t('title'),
      description: seoDescription || t('description'),
      locale: locale === 'hr' ? 'hr_HR' : 'en_US',
      type: 'website',
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch all data from Sanity in parallel
  const [
    locations,
    barbers,
    services,
    gallery,
    faqs,
    testimonials,
    blogPosts,
    settings,
  ] = await Promise.all([
    getLocations(),
    getBarbers(),
    getServices(),
    getFeaturedGallery(),
    getHomepageFaqs(),
    getFeaturedTestimonials(),
    getBlogPosts(),
    getSiteSettings(),
  ])

  // Get video URL from settings if available
  const heroVideoUrl = settings?.heroVideo?.asset?._ref
    ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${settings.heroVideo.asset._ref.replace('file-', '').replace('-mp4', '.mp4')}`
    : undefined

  return (
    <>
      <Header />
      <main>
        {/* 1. Hero - Video background, phone, gift card CTA */}
        <Hero videoUrl={heroVideoUrl} settings={settings} />

        {/* 2. What to Expect - Intro images and text */}
        <WhatToExpect />

        {/* 3. All Services with pricing - Flat grid, no tabs */}
        <ServicesPreview services={services} locale={locale} settings={settings} />

        {/* 4. Experience - Whiskey, Beer, Coffee */}
        <ExperienceShowcase />

        {/* 5. Locations */}
        <LocationsGrid locations={locations} locale={locale} settings={settings} />

        {/* 6. Gallery */}
        <GalleryPreview gallery={gallery} locale={locale} />

        {/* 7. Team */}
        <TeamPreview barbers={barbers} locale={locale} settings={settings} />

        {/* 8. Testimonials */}
        <Testimonials testimonials={testimonials} locale={locale} />

        {/* 9. FAQ Preview */}
        <FAQPreview faqs={faqs} locale={locale} />

        {/* 10. Blog Preview - For SEO */}
        <BlogPreview posts={blogPosts} locale={locale} />

        {/* 11. Final CTA */}
        <CTASection settings={settings} />
      </main>
      <Footer />
    </>
  )
}
