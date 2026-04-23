import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  const isProduction = process.env.NODE_ENV === "production";

  const rootDomain = isProduction
    ? "greenlight-quiz.vercel.app"
    : "localhost:3000";

  const searchPart = isProduction ? `.${rootDomain}` : `.localhost:3000`;
  const subdomain = hostname.replace(searchPart, "");

  if (!subdomain || hostname === rootDomain || hostname === "localhost:3000") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(`/_tenants/${subdomain}${url.pathname}${url.search}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
