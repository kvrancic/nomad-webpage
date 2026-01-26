import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlogPostPage } from '@/components/pages/BlogPostPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  // TODO: Fetch actual post title from CMS
  return {
    title: `${t('title')} | Nomad Barbershop`,
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main className="pt-20">
        <BlogPostPage slug={slug} />
      </main>
      <Footer />
    </>
  )
}
