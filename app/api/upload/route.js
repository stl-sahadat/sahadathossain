import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifySessionToken } from '../../../src/lib/sessionService';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : null;

    if (!verifySessionToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid administrative session token required to upload assets.' },
        { status: 401 }
      );
    }

    const { filename, dataUrl } = await request.json();
    if (!dataUrl || !dataUrl.includes(',')) {
      return NextResponse.json({ error: 'Invalid image dataUrl format' }, { status: 400 });
    }

    // Check payload size (~7MB base64 is ~5MB binary)
    if (dataUrl.length > 7 * 1024 * 1024) {
      return NextResponse.json({ error: 'Payload exceeds maximum allowed file size of 5MB.' }, { status: 413 });
    }

    const [header, base64Data] = dataUrl.split(',');
    let ext = null;
    if (header.includes('image/png')) ext = '.png';
    else if (header.includes('image/jpeg')) ext = '.jpg';
    else if (header.includes('image/webp')) ext = '.webp';
    else if (header.includes('image/svg+xml')) ext = '.svg';

    if (!ext) {
      return NextResponse.json(
        { error: 'Unsupported file type. Only PNG, JPG, WEBP, and SVG images are accepted.' },
        { status: 400 }
      );
    }

    const uploadDir = path.resolve(process.cwd(), 'public/assets/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

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
