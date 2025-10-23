import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 })
  }

  const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&format=vinyl`
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'VinylVault/1.0',
      'Authorization': `Discogs key=${process.env.DISCOGS_CONSUMER_KEY}, secret=${process.env.DISCOGS_CONSUMER_SECRET}`
    }
  })

  const data = await response.json()
  return NextResponse.json(data)
}
