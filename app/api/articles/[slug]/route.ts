import { NextResponse } from 'next/server';
import { db as prisma } from '@/lib/db';
import { pingIndexing } from '@/lib/ping-indexing';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    // If slug is "new", return 404 because it should be handled differently or just return null
    if (slug === 'new') {
      return NextResponse.json(null, { status: 404 });
    }

    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    
    const { title, slug: newSlug, content, category, thumbnailUrl, status, seoKeywords } = body;

    // Fetch old article to detect status transition
    const oldArticle = await prisma.article.findUnique({ where: { slug } });

    const keywordsArray = Array.isArray(seoKeywords) ? seoKeywords : (seoKeywords ? seoKeywords.split(',').map((k: string) => k.trim()) : []);

    const updated = await prisma.article.update({
      where: { slug },
      data: {
        title,
        slug: newSlug || slug,
        content,
        category,
        thumbnailUrl: thumbnailUrl || null,
        status,
        seoKeywords: keywordsArray
      }
    });

    // Ping n8n indexing if article just became PUBLISHED
    if (status === 'PUBLISHED' && oldArticle?.status !== 'PUBLISHED') {
      pingIndexing(updated.slug, 'URL_UPDATED');
    }

    return NextResponse.json({ message: 'Success', article: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await prisma.article.delete({
      where: { slug }
    });

    // Ping n8n to de-index the deleted article
    pingIndexing(slug, 'URL_DELETED');

    return NextResponse.json({ message: 'Success deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
