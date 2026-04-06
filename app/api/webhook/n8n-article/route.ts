import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, content, thumbnailUrl, category, seoKeywords } = body;

    // Validate required fields
    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, category are required.' },
        { status: 400 }
      );
    }

    // Optional: add authorization header check here to ensure only n8n can access it
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.N8N_WEBHOOK_SECRET}`) {
       // Only enable if you set N8N_WEBHOOK_SECRET in your .env
       // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if article with slug already exists
    const existing = await prisma.article.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Article with this slug already exists.' },
        { status: 409 }
      );
    }

    // Determine default tags if not provided
    const keywordsArray = Array.isArray(seoKeywords) ? seoKeywords : (seoKeywords ? seoKeywords.split(',').map((k: string) => k.trim()) : []);

    // Create article in database
    const newArticle = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        thumbnailUrl: thumbnailUrl || null,
        category: category,
        status: 'DRAFT',
        seoKeywords: keywordsArray,
      }
    });

    return NextResponse.json(
      { message: 'Article successfully drafted from n8n.', article: newArticle },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error processing n8n webhook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
