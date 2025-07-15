import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'mading.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, thumbnailUrl, keyword } = body;
    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // hapus tanda baca
        .trim()
        .replace(/\s+/g, '-');    // ganti spasi jadi tanda minus
    const createdAt = new Date().toISOString();

    const newPost = { title, slug, content, thumbnailUrl, createdAt, keyword };

    const fileData = await fs.readFile(DATA_PATH, 'utf-8');
    const posts = JSON.parse(fileData);

    const updatedPosts = [newPost, ...posts];

    await fs.writeFile(DATA_PATH, JSON.stringify(updatedPosts, null, 2));

    return NextResponse.json({ message: 'Artikel sudah terposting di Mading.', post: newPost }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fileData = await fs.readFile(DATA_PATH, 'utf-8');
    const posts = JSON.parse(fileData);
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: 'Gagal membaca data mading.' }, { status: 500 });
  }
}
