import { NextResponse } from 'next/server';
import getDB from '@/lib/db';

export async function GET() {
  try {
    const db = getDB();
    const fleet = db.prepare('SELECT * FROM fleet WHERE active = 1 ORDER BY sort_order ASC').all();

    return NextResponse.json(fleet);
  } catch (error) {
    console.error('Error fetching fleet:', error);
    return NextResponse.json({ error: 'Failed to fetch fleet' }, { status: 500 });
  }
}
