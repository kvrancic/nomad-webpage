import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { GiftCardsPage } from '@/components/pages/GiftCardsPage'
import { getGiftCardsPage, getSiteSettings } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'giftCards' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function GiftCards({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [giftCardsData, settings] = await Promise.all([
    getGiftCardsPage(),
    getSiteSettings(),
  ])

  return (
    <>
      <Header />
      <main className="pt-14">
        <GiftCardsPage data={giftCardsData} locale={locale} settings={settings} />
      </main>
      <FooterWrapper />
    </>
  )
}
