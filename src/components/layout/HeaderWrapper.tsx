import { getSiteSettings } from '../../../sanity/lib'
import { FRESHA_URLS } from '@/lib/constants'
import { Header } from './Header'

export async function HeaderWrapper() {
  const settings = await getSiteSettings()
  const bookingUrl = settings?.freshaUrl || FRESHA_URLS.default

  return <Header bookingUrl={bookingUrl} />
}
