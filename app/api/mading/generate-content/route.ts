import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/generateContent';

export async function POST(req: NextRequest) {
  try {
    const { title, keyword } = await req.json();

    if (!title || !keyword) {
      return NextResponse.json({ error: 'Missing title or keyword' }, { status: 400 });
    }

    const htmlContent = await generateContent(title, keyword);

    return NextResponse.json({ content: htmlContent });
  } catch (err) {
    console.error('[API Content Generation Error]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}