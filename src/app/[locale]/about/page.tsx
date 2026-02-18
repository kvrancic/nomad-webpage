import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { AboutPage } from '@/components/pages/AboutPage'
import { getAboutPage, getSiteSettings } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [aboutData, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ])

  return (
    <>
      <Header />
      <main className="pt-14">
        <AboutPage data={aboutData} locale={locale} settings={settings} />
      </main>
      <FooterWrapper />
    </>
  )
}
