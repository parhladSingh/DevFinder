
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface RoomDocument extends Document {
  username: string;
  description: string;
  githubRepo: string;
  linkedinProfile: string;
  tags: string;
  creatorEmail: string;      
}

const RoomSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  githubRepo: { type: String, required: true },
  linkedinProfile: { type: String, required: true },
  tags: { type: String, required: true },
  creatorEmail: { type: String, required: true }, 
});

const Room: Model<RoomDocument> = mongoose.models.Room || mongoose.model<RoomDocument>('Room', RoomSchema);

export default Room;
