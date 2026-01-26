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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
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

  return (
    <>
      <Header />
      <main>
        {/* 1. Hero - Video background, phone, gift card CTA */}
        <Hero />

        {/* 2. What to Expect - Intro images and text */}
        <WhatToExpect />

        {/* 3. All Services with pricing - Flat grid, no tabs */}
        <ServicesPreview />

        {/* 4. Experience - Whiskey, Beer, Coffee */}
        <ExperienceShowcase />

        {/* 5. Locations */}
        <LocationsGrid />

        {/* 6. Gallery */}
        <GalleryPreview />

        {/* 7. Team */}
        <TeamPreview />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. FAQ Preview */}
        <FAQPreview />

        {/* 10. Blog Preview - For SEO */}
        <BlogPreview />

        {/* 11. Final CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
