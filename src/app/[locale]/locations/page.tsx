import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { ContactPage } from '@/components/pages/ContactPage'
import { getLocations, getSiteSettings } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'locations' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function Locations({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [locations, settings] = await Promise.all([
    getLocations(),
    getSiteSettings(),
  ])

  return (
    <>
      <Header />
      <main className="pt-14">
        <ContactPage locations={locations} locale={locale} settings={settings} />
      </main>
      <FooterWrapper />
    </>
  )
}
