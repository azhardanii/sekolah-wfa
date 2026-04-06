import { NextResponse } from 'next/server';
import { db as prisma } from '@/lib/db';



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as any;

    const whereClause = status ? { status } : {};

    const articles = await prisma.article.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { title, slug, content, category, thumbnailUrl, status, seoKeywords } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug, and category are required' }, { status: 400 });
    }

    // Check if slug already exists
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug sudah digunakan, gunakan slug lain' }, { status: 409 });
    }

    const keywordsArray = Array.isArray(seoKeywords) ? seoKeywords : (seoKeywords ? seoKeywords.split(',').map((k: string) => k.trim()) : []);

    const created = await prisma.article.create({
      data: {
        title,
        slug,
        content: content || '',
        category,
        thumbnailUrl: thumbnailUrl || null,
        status: status || 'DRAFT',
        seoKeywords: keywordsArray
      }
    });

    return NextResponse.json({ message: 'Success', article: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
