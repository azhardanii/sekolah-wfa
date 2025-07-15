import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs';
import sharp from 'sharp';

const uploadPath = path.join(process.cwd(), 'public', 'img', 'mading');

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file || !file.name) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}.webp`;
  const filePath = path.join(uploadPath, filename);

  await fs.mkdir(uploadPath, { recursive: true });

  try {
    await sharp(buffer)
      .webp({ quality: 70 })
      .toFile(filePath);

    const publicUrl = `/img/mading/${filename}`;
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Sharp error:', err);
    return NextResponse.json({ error: 'Image processing failed' }, { status: 500 });
  }
}