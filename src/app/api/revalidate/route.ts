import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidateTag('sanity', { expire: 0 })
  revalidatePath('/', 'layout')

  return Response.json({ revalidated: true, now: Date.now() })
}
