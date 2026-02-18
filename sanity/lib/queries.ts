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
    bookingUrl,
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
  *[_type == "service"] | order(order asc) {
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

// What to Expect
export const whatToExpectQuery = groq`
  *[_type == "whatToExpect"][0] {
    badge,
    badgeEn,
    title,
    titleEn,
    subtitle,
    subtitleEn,
    description,
    descriptionEn,
    images
  }
`

// Experience Showcase
export const experienceShowcaseQuery = groq`
  *[_type == "experienceShowcase"][0] {
    badge,
    badgeEn,
    title,
    titleEn,
    subtitle,
    subtitleEn,
    description,
    descriptionEn,
    features,
    mainImage,
    secondaryImage
  }
`

// About Page
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    storyTitle,
    storyTitleEn,
    storyContent,
    storyContentEn,
    storyContent2,
    storyContent2En,
    storyContent3,
    storyContent3En,
    storyImage,
    philosophyTitle,
    philosophyTitleEn,
    philosophyContent,
    philosophyContentEn,
    philosophyContent2,
    philosophyContent2En,
    philosophyContent3,
    philosophyContent3En,
    philosophyImage
  }
`

// Gift Cards Page
export const giftCardsPageQuery = groq`
  *[_type == "giftCardsPage"][0] {
    heroTitle,
    heroTitleEn,
    heroSubtitle,
    heroSubtitleEn,
    heroDescription,
    heroDescriptionEn,
    heroImage,
    benefitsTitle,
    benefitsTitleEn,
    benefitsDescription,
    benefitsDescriptionEn,
    benefitsImage
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
    reviewAverageScore,
    reviewTotalCount,
    seoTitle,
    seoTitleEn,
    seoDescription,
    seoDescriptionEn
  }
`
