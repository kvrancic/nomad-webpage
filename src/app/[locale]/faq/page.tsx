import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { FAQPage } from '@/components/pages/FAQPage'
import { getFaqs } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function FAQ({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const faqs = await getFaqs()

  return (
    <>
      <HeaderWrapper />
      <main className="pt-14">
        <FAQPage faqs={faqs} locale={locale} />
      </main>
      <FooterWrapper />
    </>
  )
}
