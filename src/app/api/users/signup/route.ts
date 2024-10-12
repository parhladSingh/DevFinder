import {connect} from "@/lib/dbConnect";
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, linkedinprofile } = reqBody;

    // Check for null or invalid linkedinprofile before inserting
    if (!linkedinprofile || linkedinprofile.trim() === "") {
      return NextResponse.json({ error: 'LinkedIn profile is required' }, { status: 400 });
    }

    // Check if user already exists by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Check if a user with the same LinkedIn profile already exists
    const existingUserByLinkedIn = await User.findOne({ linkedinprofile });
    if (existingUserByLinkedIn) {
      return NextResponse.json({ error: 'User with this LinkedIn profile already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      linkedinprofile,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({ message: 'User created successfully', success: true, savedUser });
  } catch (error: any) {
    console.error('Failed to create user:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
