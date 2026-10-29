import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { filename, dataUrl } = await request.json();
    if (!dataUrl || !dataUrl.includes(',')) {
      return NextResponse.json({ error: 'Invalid image dataUrl' }, { status: 400 });
    }

    const uploadDir = path.resolve(process.cwd(), 'public/assets/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const [header, base64Data] = dataUrl.split(',');
    let ext = '.png';
    if (header.includes('image/jpeg')) ext = '.jpg';
    else if (header.includes('image/webp')) ext = '.webp';
    else if (header.includes('image/svg')) ext = '.svg';

    const sanitizedName = (filename || 'asset')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 30);
    const newFileName = `${sanitizedName}_${Date.now()}${ext}`;
    const targetFilePath = path.join(uploadDir, newFileName);

    fs.writeFileSync(targetFilePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/assets/uploads/${newFileName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
