import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // 1. Define our core constants
  const isProduction = process.env.NODE_ENV === "production";
  const rootDomain = isProduction
    ? "greenlight-quiz.vercel.app"
    : "localhost:3000";
  const authDomain = `auth.${rootDomain}`;

  // 2. Handle Authentication Centralization
  // If user hits greenlight-quiz.vercel.app/signup, we push them to auth.greenlight-quiz.vercel.app/signup
  if (
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup")) &&
    hostname === rootDomain
  ) {
    return NextResponse.redirect(
      new URL(url.pathname, `https://${authDomain}`),
    );
  }

  // 3. The Tenant Resolver (The Magic)
  // Extract subdomain (e.g., 'safaricom' from 'safaricom.greenlight-quiz.vercel.app')
  const subdomain = hostname.replace(`.${rootDomain}`, "");

  // Skip logic if we are on the root or the central auth subdomain
  if (hostname === rootDomain || hostname === authDomain) {
    return NextResponse.next();
  }

  // 4. Internal Rewrite to Tenant Folder
  // This rewrites the request to /app/_tenants/[tenant]/... invisibly
  return NextResponse.rewrite(
    new URL(`/_tenants/${subdomain}${url.pathname}${url.search}`, request.url),
  );
}

// 5. Matcher: Optimized for 2026 performance
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all static files (e.g. /favicon.ico, /logo.png)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
