import { NextRequest, NextResponse } from 'next/server'
import { getServerSideUser } from './lib/payload-utils'

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req
  const { user } = await getServerSideUser(cookies)

  const isAuthPage = ['/sign-in', '/sign-up'].includes(nextUrl.pathname)
  const isProtectedRoute = ['/favorites'].includes(nextUrl.pathname)

  try {
    if (user && isAuthPage) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
    }

    if (!user && isProtectedRoute) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in?callbackUrl=${nextUrl.pathname}`
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    
    if (isAuthPage) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
    }
    
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/favorites'],
}