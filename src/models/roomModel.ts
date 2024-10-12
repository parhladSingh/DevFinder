
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface RoomDocument extends Document {
  username: string;
  description: string;
  githubRepo: string;
  linkedinprofile: string;
  tags: string;
  creatorEmail: string;      
}

const RoomSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  githubRepo: { type: String, required: true },
  linkedinprofile: { type: String, required: true }, // Fetch from user  
  tags: { type: String, required: true },
  creatorEmail: { type: String, required: true }, 
});

const Room: Model<RoomDocument> = mongoose.models.Room || mongoose.model<RoomDocument>('Room', RoomSchema);

export default Room;
