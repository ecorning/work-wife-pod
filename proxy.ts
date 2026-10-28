import { NextResponse } from "next/server";

// The site is offline for now: every page, API route and static file returns
// a 404 and asks search engines not to index it. Delete this file to bring
// the site back online.
export function proxy() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
