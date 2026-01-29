import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Nomad Barbershop',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'freshaUrl',
      title: 'Default Fresha Booking URL',
      type: 'url',
    }),
    defineField({
      name: 'giftCardsUrl',
      title: 'Gift Cards URL',
      type: 'url',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Fallback Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Shown if no video is set or while video loads',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Default social sharing image',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'seoTitleEn',
      title: 'SEO Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Croatian)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seoDescriptionEn',
      title: 'SEO Description (English)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
