import { defineField, defineType } from 'sanity'

export const whatToExpect = defineType({
  name: 'whatToExpect',
  title: 'What to Expect Section',
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
      name: 'images',
      title: 'Section Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Short label for the image (e.g. "Ambiance", "Style")',
            }),
          ],
        },
      ],
      description: 'Up to 4 images displayed in the grid on the left side',
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'What to Expect Section',
      }
    },
  },
})
