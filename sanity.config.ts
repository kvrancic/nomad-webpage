'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'nomad-barbershop',
  title: 'Nomad Barbershop',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Content types
            S.listItem()
              .title('Locations')
              .schemaType('location')
              .child(
                S.documentTypeList('location')
                  .title('Locations')
              ),
            S.listItem()
              .title('Team')
              .schemaType('barber')
              .child(
                S.documentTypeList('barber')
                  .title('Barbers')
              ),
            S.listItem()
              .title('Services')
              .schemaType('service')
              .child(
                S.documentTypeList('service')
                  .title('Services')
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .schemaType('blogPost')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
              ),
            S.listItem()
              .title('Gallery')
              .schemaType('galleryItem')
              .child(
                S.documentTypeList('galleryItem')
                  .title('Gallery Items')
              ),
            S.divider(),
            S.listItem()
              .title('FAQs')
              .schemaType('faq')
              .child(
                S.documentTypeList('faq')
                  .title('FAQs')
              ),
            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(
                S.documentTypeList('testimonial')
                  .title('Testimonials')
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
