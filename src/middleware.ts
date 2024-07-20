import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token && 
   ( url.pathname.startsWith("/signin") ||
   url.pathname.startsWith("/signUp")||
   url.pathname.startsWith("/veridy")||
   url.pathname.startsWith("/")
)
) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  if(!token && url.pathname.startsWith('/Dashboard')){
    return NextResponse.redirect(new URL("/singin", request.url));

  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/about/:path*',
  matcher: ["/signin", "/signUp", "/", "/dashboard/:path*"],
};
