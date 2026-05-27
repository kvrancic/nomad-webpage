import { LIME_BOOKING_URLS } from '@/lib/constants'
import { Header } from './Header'

export async function HeaderWrapper() {
  return <Header bookingUrl={LIME_BOOKING_URLS.default} />
}
