import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { ids, status } = body;

    if (!ids || !status) {
      return NextResponse.json({ error: 'ids and status are required' }, { status: 400 });
    }

    const updated = await prisma.article.updateMany({
      where: {
        id: { in: ids }
      },
      data: { status }
    });

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

    const deleted = await prisma.article.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return NextResponse.json({ message: 'Success deleted', deleted: deleted.count }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
