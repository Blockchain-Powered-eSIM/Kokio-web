// app/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

const APP_SCHEME = "app.kokio.mobile";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.toString();
  return NextResponse.redirect(`${APP_SCHEME}://callback?${params}`, 302);
}
