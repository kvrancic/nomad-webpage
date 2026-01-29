import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question (Croatian)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questionEn',
      title: 'Question (English)',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer (Croatian)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answerEn',
      title: 'Answer (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      showOnHomepage: 'showOnHomepage',
    },
    prepare({ title, showOnHomepage }) {
      return {
        title,
        subtitle: showOnHomepage ? 'Shown on homepage' : 'FAQ page only',
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
