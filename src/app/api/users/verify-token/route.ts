import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel.js'; 
import { connect } from "@/lib/dbConnect";

connect();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user:null }, { status: 200 });
    }

    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const user = await User.findById(decoded.id); 

    return NextResponse.json({ user:user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
  }
}