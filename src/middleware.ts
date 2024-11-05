import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    if (path.startsWith('/api')) {
       return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value || ''

    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const isPrivatePath = ['/yourroom', '/room', '/createroom', '/videocall'].includes(path);
    
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isPrivatePath && !token) {
        return NextResponse.redirect(new URL('/signup', request.url));
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Matches all paths except _next/static, _next/image, and favicon.ico
}