import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Redirect ke /under-development
  url.pathname = '/under-development';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/ekskul',
    '/kantin',
    '/ruangbk',
    '/rekreasi',
    '/kelas-online',
    '/kelas-offline',
  ],
};
