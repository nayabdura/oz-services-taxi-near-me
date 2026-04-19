import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Blog } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ published: 1 }).sort({ created_at: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Blogs API error', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
