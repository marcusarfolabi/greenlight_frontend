import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const { pathname } = url;

  const isProduction = process.env.NODE_ENV === "production";
  
if (pathname === "/" && hostname.startsWith("auth.")) {
    const isAuthSubdomain = hostname.startsWith("auth.");

  if (!isAuthSubdomain) { 
    const targetHost = isProduction
      ? "auth.greenlight-quiz.vercel.app"
      : "auth.localhost:3000";

    const newPathname = pathname.replace(/^\/auth/, "") || "/";

    const redirectUrl = new URL(
      newPathname,
      `http${isProduction ? "s" : ""}://${targetHost}`,
    );

    redirectUrl.search = url.search;

    return NextResponse.redirect(redirectUrl);
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};