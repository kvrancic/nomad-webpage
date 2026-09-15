import { LIME_BOOKING_URLS } from '@/lib/constants'
import { getSiteSettings } from '../../../sanity/lib'
import { Header } from './Header'

export async function HeaderWrapper() {
  const settings = await getSiteSettings()
  return <Header bookingUrl={LIME_BOOKING_URLS.default} phone={settings?.phone} />
}
