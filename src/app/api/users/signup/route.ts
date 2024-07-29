// src/app/api/users/route.ts
import {connect} from "@/lib/dbConnect";
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password,linkdinprofile } = reqBody; // Added isCreator

    // Checking if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      linkdinprofile,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({ message: 'User created successfully', success: true, savedUser });
  } catch (error: any) {
    console.error('Failed to create user:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
