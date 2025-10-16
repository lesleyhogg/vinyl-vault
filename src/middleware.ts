import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // if not logged in and trying to access protected route, redirect to login
  if (!user && request.nextUrl.pathname.startsWith('/collection')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // if logged in and trying to access login, redirect to collection
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/collection', request.url))
  }

  return response
}

export const config = {
  matcher: ['/collection/:path*', '/login']
}
