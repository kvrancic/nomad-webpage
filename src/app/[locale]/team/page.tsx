import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
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
      <HeaderWrapper />
      <main className="pt-14">
        <TeamPage barbers={barbers} locale={locale} settings={settings} />
      </main>
      <FooterWrapper />
    </>
  )
}
