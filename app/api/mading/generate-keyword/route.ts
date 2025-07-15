import { NextRequest, NextResponse } from 'next/server';
import { generateKeyword } from '@/lib/generateKeyword';

// Fungsi untuk membersihkan HTML
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, ' ');
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
  }

  // Bersihkan konten dari tag HTML sebelum dikirim
  const cleanContent = stripHtml(content);

  try {
    // Gunakan konten yang sudah bersih
    const keywords = await generateKeyword(title, cleanContent); 
    return NextResponse.json({ keywords });
  } catch (err) {
    console.error('[API Keyword Error]', err);
    return NextResponse.json({ keywords: ['sekolah wfa'] }, { status: 200 });
  }
}