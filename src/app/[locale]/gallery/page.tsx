import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { GalleryPage } from '@/components/pages/GalleryPage'
import { getGallery, getSiteSettings } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function Gallery({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [gallery, settings] = await Promise.all([
    getGallery(),
    getSiteSettings(),
  ])

  return (
    <>
      <HeaderWrapper />
      <main className="pt-14">
        <GalleryPage gallery={gallery} locale={locale} settings={settings} />
      </main>
      <FooterWrapper />
    </>
  )
}
