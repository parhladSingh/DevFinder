import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import Room from "@/models/roomModel";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
