import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/lib/models';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    await connectDB();
    
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role, name: user.name });

    return NextResponse.json({
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
