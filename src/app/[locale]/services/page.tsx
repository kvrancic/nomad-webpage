import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServicesPage } from '@/components/pages/ServicesPage'
import { getServices, getSiteSettings } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const tMeta = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
    description: tMeta('description'),
  }
}

export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ])

  return (
    <>
      <Header />
      <main className="pt-20">
        <ServicesPage services={services} locale={locale} settings={settings} />
      </main>
      <Footer />
    </>
  )
}
