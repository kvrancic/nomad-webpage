import { groq } from 'next-sanity'

// Locations
export const locationsQuery = groq`
  *[_type == "location"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    address,
    city,
    phone,
    hours,
    parking,
    coordinates,
    freshaUrl,
    image
  }
`

// Barbers
export const barbersQuery = groq`
  *[_type == "barber"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    roleEn,
    bio,
    bioEn,
    photo,
    specialties,
    instagram,
    location->{
      _id,
      name,
      "slug": slug.current
    }
  }
`

// Services
export const servicesQuery = groq`
  *[_type == "service"] | order(category asc, order asc) {
    _id,
    name,
    nameEn,
    "slug": slug.current,
    description,
    descriptionEn,
    price,
    duration,
    category,
    popular,
    image
  }
`

// Blog Posts
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    excerpt,
    excerptEn,
    featuredImage,
    publishedAt,
    tags,
    author->{
      _id,
      name,
      photo
    }
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    excerpt,
    excerptEn,
    content,
    contentEn,
    featuredImage,
    publishedAt,
    tags,
    author->{
      _id,
      name,
      photo,
      bio,
      bioEn
    }
  }
`

// Gallery
export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(order asc) {
    _id,
    title,
    beforeImage,
    afterImage,
    category,
    description,
    descriptionEn,
    featured,
    barber->{
      _id,
      name
    },
    service->{
      _id,
      name,
      nameEn
    }
  }
`

export const featuredGalleryQuery = groq`
  *[_type == "galleryItem" && featured == true] | order(order asc) {
    _id,
    title,
    beforeImage,
    afterImage,
    category,
    description,
    descriptionEn,
    barber->{
      _id,
      name
    }
  }
`

// FAQs
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    questionEn,
    answer,
    answerEn,
    showOnHomepage
  }
`

export const homepageFaqsQuery = groq`
  *[_type == "faq" && showOnHomepage == true] | order(order asc) {
    _id,
    question,
    questionEn,
    answer,
    answerEn
  }
`

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    rating,
    review,
    reviewEn,
    avatar,
    date,
    featured,
    location->{
      _id,
      name
    }
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    name,
    rating,
    review,
    reviewEn,
    avatar,
    date,
    location->{
      _id,
      name
    }
  }
`

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    phone,
    email,
    instagram,
    facebook,
    freshaUrl,
    giftCardsUrl,
    heroVideo,
    heroImage,
    ogImage,
    seoTitle,
    seoTitleEn,
    seoDescription,
    seoDescriptionEn
  }
`
