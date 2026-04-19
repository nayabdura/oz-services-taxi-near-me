import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access, mkdir } from 'fs/promises';
import path from 'path';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });

    const folder = formData.get('folder') as string || 'blogs';
    const allowedFolders = ['blogs', 'fleet'];
    const targetFolder = allowedFolders.includes(folder) ? folder : 'blogs';

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP allowed.' }, { status: 400 });
    }

    // 5MB max
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${targetFolder}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', targetFolder);
    try {
      await access(uploadDir);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, filename);
    await writeFile(uploadPath, buffer);

    return NextResponse.json({ url: `/uploads/${targetFolder}/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
