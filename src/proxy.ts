import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  const isRootDomain =
    hostname === ROOT_DOMAIN || hostname === "localhost:3000";

  if (isRootDomain) {
    return NextResponse.next();
  }

  const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "").split(":")[0];

  if (subdomain && subdomain !== hostname.split(":")[0]) {
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
