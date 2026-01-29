import { defineField, defineType } from 'sanity'

export const barber = defineType({
  name: 'barber',
  title: 'Barber',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role (Croatian)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleEn',
      title: 'Role (English)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio (Croatian)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bioEn',
      title: 'Bio (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'location',
      title: 'Primary Location',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
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
      subtitle: 'role',
      media: 'photo',
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
