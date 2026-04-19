import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP allowed.' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `ozservices/${targetFolder}` },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });

    const result = await uploadPromise;

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary Upload error:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
