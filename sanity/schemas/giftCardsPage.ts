import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'howItWorksTitle',
      title: 'How It Works - Title (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'howItWorksTitleEn',
      title: 'How It Works - Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'howItWorksSubtitle',
      title: 'How It Works - Subtitle (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'howItWorksSubtitleEn',
      title: 'How It Works - Subtitle (English)',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'How It Works - Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Credit Card', value: 'creditCard' },
                  { title: 'Send', value: 'send' },
                  { title: 'Gift', value: 'gift' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Title (Croatian)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (English)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description (Croatian)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (English)',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'icon',
            },
          },
        }),
      ],
      description: 'Steps displayed in the "How It Works" section (typically 3 steps)',
      validation: (Rule) => Rule.max(5),
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
