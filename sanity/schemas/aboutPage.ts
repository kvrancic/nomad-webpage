import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'storyTitle',
      title: 'Story Title (Croatian)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyTitleEn',
      title: 'Story Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'storyContent',
      title: 'Story Paragraph 1 (Croatian)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyContentEn',
      title: 'Story Paragraph 1 (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyContent2',
      title: 'Story Paragraph 2 (Croatian)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyContent2En',
      title: 'Story Paragraph 2 (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyContent3',
      title: 'Story Paragraph 3 (Croatian)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyContent3En',
      title: 'Story Paragraph 3 (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Title (Croatian)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'philosophyTitleEn',
      title: 'Philosophy Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'philosophyContent',
      title: 'Philosophy Paragraph 1 (Croatian)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'philosophyContentEn',
      title: 'Philosophy Paragraph 1 (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophyContent2',
      title: 'Philosophy Paragraph 2 (Croatian)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophyContent2En',
      title: 'Philosophy Paragraph 2 (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophyContent3',
      title: 'Philosophy Paragraph 3 (Croatian)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophyContent3En',
      title: 'Philosophy Paragraph 3 (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'philosophyImage',
      title: 'Philosophy Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
