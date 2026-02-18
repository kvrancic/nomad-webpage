import { getLocations, getSiteSettings } from '../../../sanity/lib'
import { Footer } from './Footer'

export async function FooterWrapper() {
  const [locations, settings] = await Promise.all([
    getLocations(),
    getSiteSettings(),
  ])

  return <Footer locations={locations} settings={settings} />
}
