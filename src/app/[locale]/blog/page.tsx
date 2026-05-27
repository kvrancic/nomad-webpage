import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import { FooterWrapper } from '@/components/layout/FooterWrapper'
import { BlogPage } from '@/components/pages/BlogPage'
import { getBlogPosts } from '../../../../sanity/lib'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  return {
    title: `${t('title')} | Nomad Barbershop`,
    description: t('subtitle'),
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const posts = await getBlogPosts()

  return (
    <>
      <HeaderWrapper />
      <main className="pt-14">
        <BlogPage posts={posts} locale={locale} />
      </main>
      <FooterWrapper />
    </>
  )
}
