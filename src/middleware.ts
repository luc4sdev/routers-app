import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isPathEmpty = path === '/'

    if (isPathEmpty) {
        return NextResponse.redirect(new URL('/clients', request.url))

    }
}