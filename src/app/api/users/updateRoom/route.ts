
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import Room from "@/models/roomModel";

connect();

interface Params {
  id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    const reqBody = await request.json();
    const { _id, username, description, githubRepo, linkedinProfile, tags } = reqBody;

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { username, description, githubRepo, linkedinProfile, tags },
      { new: true }
    );

    if (!updatedRoom) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(updatedRoom);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
