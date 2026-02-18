import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TeamPage } from '@/components/pages/TeamPage'
import { getBarbers, getSiteSettings } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'team' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function Team({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [barbers, settings] = await Promise.all([
    getBarbers(),
    getSiteSettings(),
  ])

  return (
    <>
      <Header />
      <main className="pt-20">
        <TeamPage barbers={barbers} locale={locale} settings={settings} />
      </main>
      <Footer />
    </>
  )
}
