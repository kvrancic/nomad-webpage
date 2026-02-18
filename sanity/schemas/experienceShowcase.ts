import { defineField, defineType, defineArrayMember } from 'sanity'

export const experienceShowcase = defineType({
  name: 'experienceShowcase',
  title: 'Experience Section (Whiskey, Pivo & Kava)',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'badgeEn',
      title: 'Badge Text (English)',
      type: 'string',
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
      name: 'subtitle',
      title: 'Subtitle (Croatian)',
      type: 'string',
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Subtitle (English)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description (Croatian)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features',
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
                  { title: 'Whiskey (Wine glass)', value: 'whiskey' },
                  { title: 'Beer', value: 'beer' },
                  { title: 'Coffee', value: 'coffee' },
                  { title: 'Atmosphere (Music)', value: 'atmosphere' },
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
              type: 'string',
            }),
            defineField({
              name: 'descriptionEn',
              title: 'Description (English)',
              type: 'string',
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
      description: 'Feature cards displayed in the 2x2 grid (e.g. Whiskey, Beer, Coffee, Atmosphere)',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large image on the right side',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Smaller floating image in the bottom-left corner',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Experience Section',
      }
    },
  },
})
