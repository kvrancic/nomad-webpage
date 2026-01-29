import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlogPostPage } from '@/components/pages/BlogPostPage'
import { getBlogPost, getBlogPosts } from '../../../../../sanity/lib'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: `${t('title')} | Nomad Barbershop`,
    }
  }

  const title = locale === 'en' && post.titleEn ? post.titleEn : post.title
  const description = locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt

  return {
    title: `${title} | Nomad Barbershop`,
    description,
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <BlogPostPage post={post} locale={locale} />
      </main>
      <Footer />
    </>
  )
}
