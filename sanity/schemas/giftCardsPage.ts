import { defineField, defineType } from 'sanity'

export const giftCardsPage = defineType({
  name: 'giftCardsPage',
  title: 'Gift Cards Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (Croatian)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitleEn',
      title: 'Hero Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitleEn',
      title: 'Hero Subtitle (English)',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description (Croatian)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroDescriptionEn',
      title: 'Hero Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'benefitsTitle',
      title: 'Benefits Section Title (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'benefitsTitleEn',
      title: 'Benefits Section Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'benefitsDescription',
      title: 'Benefits Section Description (Croatian)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefitsDescriptionEn',
      title: 'Benefits Section Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefitsImage',
      title: 'Benefits Section Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gift Cards Page',
      }
    },
  },
})
