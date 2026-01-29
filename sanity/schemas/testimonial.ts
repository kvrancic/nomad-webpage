import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          { title: '5 Stars', value: 5 },
          { title: '4 Stars', value: 4 },
          { title: '3 Stars', value: 3 },
          { title: '2 Stars', value: 2 },
          { title: '1 Star', value: 1 },
        ],
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'review',
      title: 'Review (Croatian)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewEn',
      title: 'Review (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({
      name: 'avatar',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
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
      title: 'name',
      rating: 'rating',
      featured: 'featured',
      media: 'avatar',
    },
    prepare({ title, rating, featured }) {
      return {
        title,
        subtitle: `${'★'.repeat(rating)}${featured ? ' - Featured' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
})
