import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get("token")?.value || ''
    console.log(token)
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))

    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/signup', request.url))

    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
 
    // '/signup',
    // '/videocall',
    // '/yourroom',
    // '/room',

  ]
}


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;

//     // Define public and private paths
//     const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
//     const isPrivatePath = ['/yourroom', '/room', '/createroom', '/videocall'].includes(path);

//     // Retrieve token from cookies
//     const token = request.cookies.get("token")?.value || '';

//     // console.log(`Path: ${path}`);
//     // console.log(`Is Public Path: ${isPublicPath}`);
//     // console.log(`Is Private Path: ${isPrivatePath}`);
//     // console.log(`Token: ${token ? 'Token Present' : 'Token Missing'}`);

//     // Redirect authenticated users away from public paths
//     if (isPublicPath && token) {
//         console.log("Redirecting to '/' because the user is already authenticated.");
//         return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Redirect unauthenticated users trying to access private paths
//     if (isPrivatePath && !token) {
//         console.log("Redirecting to '/signup' because the user is not authenticated.");
//         return NextResponse.redirect(new URL('/signup', request.url));
//     }

//     console.log("No redirection required, allowing access.");
//     return NextResponse.next();  // Proceed to the requested path if conditions are met
// }

// // Updated matcher to handle all paths and filter them in the middleware code
// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Matches all paths except _next/static, _next/image, and favicon.ico
// };
