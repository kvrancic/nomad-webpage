export const SITE_CONFIG = {
  name: 'Nomad Barbershop',
  url: 'https://nomadbarbershop.hr',
  email: 'barbershop@olivers.hr',
  phone: '+385 91 7280 306',
  instagram: 'https://instagram.com/nomadbarbershop',
  facebook: 'https://facebook.com/nomadbarbershop',
}

export const FRESHA_URLS = {
  default: 'https://www.fresha.com/book-now/nomad-barbershop-zagreb',
  giftCards: 'https://www.fresha.com/gift-cards/nomad-barbershop-zagreb',
  locations: {
    radnicka: 'https://www.fresha.com/book-now/nomad-barbershop-radnicka-cesta-80-zagreb',
    spansko: 'https://www.fresha.com/book-now/nomad-barbershop-spansko-zagreb',
    laniste: 'https://www.fresha.com/book-now/nomad-barbershop-laniste-zagreb',
    kutnjacki: 'https://www.fresha.com/book-now/nomad-barbershop-kutnjacki-put-zagreb',
  },
}

export const LOCATIONS = [
  {
    id: 'radnicka',
    name: 'Zagreb Tower',
    address: 'Radnička cesta 80',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: {
      weekdays: '08:00 - 20:00',
      saturday: '09:00 - 14:00',
      sunday: null,
    },
    parking: true,
    coordinates: { lat: 45.8006, lng: 15.9819 },
  },
  {
    id: 'spansko',
    name: 'Špansko',
    address: 'Trg 101. brigade',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: {
      weekdays: '08:00 - 20:00',
      saturday: '09:00 - 14:00',
      sunday: null,
    },
    parking: true,
    coordinates: { lat: 45.7982, lng: 15.9057 },
  },
  {
    id: 'laniste',
    name: 'Lanište',
    address: 'Lanište 15/A',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: {
      weekdays: '08:00 - 20:00',
      saturday: '09:00 - 14:00',
      sunday: null,
    },
    parking: true,
    coordinates: { lat: 45.7731, lng: 15.8919 },
  },
  {
    id: 'kutnjacki',
    name: 'Kutnjački put',
    address: 'Kutnjački put 8',
    city: 'Zagreb',
    phone: '+385 91 7280 306',
    hours: {
      weekdays: '08:00 - 20:00',
      saturday: '09:00 - 14:00',
      sunday: null,
    },
    parking: true,
    coordinates: { lat: 45.7892, lng: 16.0234 },
  },
]

export const BARBERS = [
  {
    id: 'sara',
    name: 'Sara',
    role: 'Senior Barber',
    bio: 'Specijalizirana za moderne fade frizure i precizne linije.',
    specialties: ['Fade', 'Skin Fade', 'Dizajn'],
    location: 'radnicka',
  },
  {
    id: 'stjepan',
    name: 'Stjepan',
    role: 'Master Barber',
    bio: 'Iskusni majstor klasičnih tehnika i brade.',
    specialties: ['Klasika', 'Brada', 'Hot Towel'],
    location: 'spansko',
  },
  {
    id: 'lovro',
    name: 'Lovro',
    role: 'Barber',
    bio: 'Kreativac specijaliziran za moderne trendove.',
    specialties: ['Textured Crop', 'Mullet', 'Fade'],
    location: 'laniste',
  },
  {
    id: 'ivan',
    name: 'Ivan',
    role: 'Barber',
    bio: 'Precizan u detaljima, majstor za line-up.',
    specialties: ['Line-up', 'Taper', 'Beard Design'],
    location: 'kutnjacki',
  },
  {
    id: 'magdalena',
    name: 'Magdalena',
    role: 'Barber',
    bio: 'Stručnjakinja za dužu kosu i stiliziranje.',
    specialties: ['Long Hair', 'Styling', 'Pomade Finish'],
    location: 'radnicka',
  },
]

export const SERVICES = {
  hair: [
    { id: 'basic-cut', name: 'basicCut', price: 19, duration: 30 },
    { id: 'long-hair', name: 'longHairCut', price: 33, duration: 45 },
    { id: 'nomad-cut', name: 'nomadCut', price: 20, duration: 35, popular: true },
  ],
  beard: [
    { id: 'beard-trim', name: 'beardTrim', price: 16, duration: 20 },
    { id: 'beard-royal', name: 'beardRoyal', price: 25, duration: 30 },
  ],
  packages: [
    { id: 'combo', name: 'combo', price: 33, duration: 50, popular: true },
    { id: 'nomad-ritual', name: 'nomadRitual', price: 55, duration: 75 },
  ],
}

export const FAQ_ITEMS = [
  {
    id: 'reservation',
    questionKey: 'reservation',
    answerKey: 'reservationAnswer',
  },
  {
    id: 'drinks',
    questionKey: 'drinks',
    answerKey: 'drinksAnswer',
  },
  {
    id: 'parking',
    questionKey: 'parking',
    answerKey: 'parkingAnswer',
  },
  {
    id: 'giftcards',
    questionKey: 'giftcards',
    answerKey: 'giftcardsAnswer',
  },
]
