import { NextResponse } from 'next/server';
import { db as prisma } from '@/lib/db';
import { pingIndexing } from '@/lib/ping-indexing';



export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { ids, status } = body;

    if (!ids || !status) {
      return NextResponse.json({ error: 'ids and status are required' }, { status: 400 });
    }

    // If publishing, fetch slugs of articles that are NOT yet published (for indexing ping)
    let slugsToPing: string[] = [];
    if (status === 'PUBLISHED') {
      const notYetPublished = await prisma.article.findMany({
        where: { id: { in: ids }, status: { not: 'PUBLISHED' } },
        select: { slug: true },
      });
      slugsToPing = notYetPublished.map((a) => a.slug);
    }

    const updated = await prisma.article.updateMany({
      where: {
        id: { in: ids }
      },
      data: { status }
    });

    // Ping n8n for each newly published article
    for (const slug of slugsToPing) {
      pingIndexing(slug, 'URL_UPDATED');
    }

    return NextResponse.json({ message: 'Success', updated: updated.count }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ids array is required and cannot be empty' }, { status: 400 });
    }

    // Fetch slugs before deleting (for de-indexing ping)
    const toDelete = await prisma.article.findMany({
      where: { id: { in: ids } },
      select: { slug: true },
    });

    const deleted = await prisma.article.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    // Ping n8n to de-index each deleted article
    for (const article of toDelete) {
      pingIndexing(article.slug, 'URL_DELETED');
    }

    return NextResponse.json({ message: 'Success deleted', deleted: deleted.count }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
