import { defineField, defineType } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fades', value: 'fades' },
          { title: 'Classic', value: 'classic' },
          { title: 'Beard', value: 'beard' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'barber',
      title: 'Barber',
      type: 'reference',
      to: [{ type: 'barber' }],
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
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
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
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
      title: 'title',
      category: 'category',
      barber: 'barber.name',
      media: 'afterImage',
    },
    prepare({ title, category, barber, media }) {
      return {
        title: title || category,
        subtitle: barber || category,
        media,
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
