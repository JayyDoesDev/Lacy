import { Document } from "mongoose";

export interface Profile {
  Public: boolean;
  Name: string;
  Pronouns: string;
  Description: string;
}

export interface UserDocument extends Document {
  User: String;
  Date: Date;
  Language: string;
  Profile: Profile;
}
