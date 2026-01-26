import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AboutPage } from '@/components/pages/AboutPage'

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

  return (
    <>
      <Header />
      <main className="pt-20">
        <AboutPage />
      </main>
      <Footer />
    </>
  )
}
