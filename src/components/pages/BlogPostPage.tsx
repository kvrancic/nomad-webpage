'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'
import { fadeInUp } from '@/lib/animations'
import { urlFor } from '../../../sanity/lib'
import type { SanityBlogPostFull } from '../../../sanity/lib'

interface BlogPostPageProps {
  post: SanityBlogPostFull
  locale?: string
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(800).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-neutral-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-mint-600 hover:text-mint-700 underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl text-anthracite-500 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl md:text-2xl text-anthracite-500 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-lg md:text-xl text-anthracite-500 mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-mint-500 pl-4 my-6 italic text-neutral-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-neutral-700 leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700">{children}</ol>
    ),
  },
}

export function BlogPostPage({ post, locale = 'hr' }: BlogPostPageProps) {
  const t = useTranslations('blog')

  const title = locale === 'en' && post.titleEn ? post.titleEn : post.title
  const content = locale === 'en' && post.contentEn ? post.contentEn : post.content

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToBlog')}
          </Button>
        </Link>

        <motion.article
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <Image
                src={urlFor(post.featuredImage).width(800).height(450).url()}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            {post.author && (
              <span className="flex items-center gap-2">
                {post.author.photo && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(post.author.photo).width(24).height(24).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <User className="w-4 h-4" />
                {post.author.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-anthracite-500 mb-6">
            {title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-neutral-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-mint-50 text-mint-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          {content && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={content} components={portableTextComponents} />
            </div>
          )}

          {/* Author Bio */}
          {post.author && (
            <div className="mt-12 p-6 bg-neutral-50 rounded-xl">
              <div className="flex items-start gap-4">
                {post.author.photo && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(post.author.photo).width(64).height(64).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{t('writtenBy')}</p>
                  <h4 className="font-display text-lg text-anthracite-500 mb-2">
                    {post.author.name}
                  </h4>
                  {post.author.bio && (
                    <p className="text-neutral-600 text-sm">
                      {locale === 'en' && post.author.bioEn ? post.author.bioEn : post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </section>
  )
}
