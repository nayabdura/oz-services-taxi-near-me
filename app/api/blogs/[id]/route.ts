import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Blog } from '@/lib/models';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const blog = await Blog.findOne({ slug: id });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
