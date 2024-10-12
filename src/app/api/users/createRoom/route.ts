import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/dbConnect";
import Room, { RoomDocument } from "@/models/roomModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      username,
      description,
      githubRepo,
      linkedinprofile,
      tags,
      creatorEmail,
    } = reqBody;

    // Log the incoming request body
    console.log("Received request body:", reqBody);

    // Validate required fields
    if (
      !username ||
      !description ||
      !githubRepo ||
      !linkedinprofile ||
      !tags ||
      !creatorEmail
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new room
    const newRoom: RoomDocument = new Room({
      username,
      description,
      githubRepo,
      linkedinprofile,
      tags,
      creatorEmail,
    });

    // Save the new room to the database
    const savedRoom = await newRoom.save();
    console.log("Saved room:", savedRoom);

    return NextResponse.json({
      message: "Room created successfully",
      success: true,
      savedRoom,
    });
  } catch (error: any) {
    console.error("Error creating room:", error.message); // Log the error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
