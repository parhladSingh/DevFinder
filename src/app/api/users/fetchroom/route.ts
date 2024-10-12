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

export async function POST(request: NextRequest) {
  try {
    const { roomId } = await request.json();
    console.log('Room ID:', roomId); // Log the received roomId

    if (!roomId) {
      return NextResponse.json({ error: 'No roomId provided' }, { status: 400 });
    }

    const room = await Room.findOne({ _id: roomId });
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room); // Return the room data
  } catch (error: any) {
    console.error('Server Error:', error.message); // Log the error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
