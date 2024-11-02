import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel.js'; // Import your User model or user-fetching method

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const user = await User.findById(decoded._id); // Fetch user data based on decoded token info

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
  }
}
