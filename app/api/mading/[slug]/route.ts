import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'mading.json');

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop(); // ✅ ambil slug dari URL path

    const body = await req.json();
    const { title, content, thumbnailUrl } = body;

    const fileData = await fs.readFile(DATA_PATH, 'utf-8');
    const posts = JSON.parse(fileData);

    const postIndex = posts.findIndex((p: any) => p.slug === slug);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Postingan tidak ditemukan.' }, { status: 404 });
    }

    const updatedPost = {
      ...posts[postIndex],
      title,
      content,
      thumbnailUrl,
      updatedAt: new Date().toISOString(),
    };

    posts[postIndex] = updatedPost;

    await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2));

    return NextResponse.json({ message: 'Postingan berhasil diperbarui.', post: updatedPost });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui postingan.' }, { status: 500 });
  }
}