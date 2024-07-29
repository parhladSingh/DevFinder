import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/dbConnect';
import Room from '@/models/roomModel';

connect();

export async function GET(request: NextRequest) {
  try {
    const rooms = await Room.find({});
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
