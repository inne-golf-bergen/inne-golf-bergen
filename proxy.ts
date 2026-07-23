import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing (see node_modules/next/dist/docs/01-app/02-guides/internationalization.md):
 * every page lives under app/[lang]/. Norwegian keeps its historic unprefixed
 * URLs — /medlemskap is rewritten to /no/medlemskap internally — while English
 * is served publicly under /en/*. Direct hits on /no/* redirect to the
 * canonical unprefixed URL so each page has exactly one address per language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  if (pathname === "/no" || pathname.startsWith("/no/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/no".length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/no${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (public/ assets).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
