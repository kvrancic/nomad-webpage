import { defineField, defineType } from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Location',
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
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Zagreb',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Working Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'weekdays',
          title: 'Weekdays (Mon-Fri)',
          type: 'string',
          initialValue: '08:00 - 20:00',
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          initialValue: '09:00 - 14:00',
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          description: 'Leave empty if closed',
        }),
      ],
    }),
    defineField({
      name: 'parking',
      title: 'Has Parking',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
        }),
        defineField({
          name: 'lng',
          title: 'Longitude',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'freshaUrl',
      title: 'Fresha Booking URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Location Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      subtitle: 'address',
      media: 'image',
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
