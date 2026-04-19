import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Testimonial } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ published: 1 }).sort({ created_at: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonial API error', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
