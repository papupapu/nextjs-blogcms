import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from '@/auth';
import adminPaths from '@/utils/paths/admin';

 export async function middleware(request: NextRequest) {
  const session = await auth();

  const isAuthPage = [adminPaths.login(), adminPaths.register()].includes(request.nextUrl.pathname);

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL(adminPaths.login(), request.url))
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(adminPaths.home(), request.url))
  }
}

export const config = {
  matcher: '/admin/:path*',
};
