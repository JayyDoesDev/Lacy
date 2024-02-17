import { Schema, Document, model } from "mongoose";

interface UserDocument extends Document {
  User: string;
  Date: Date;
  Language: string;
  Profile: {
    Public: boolean;
    Name: string;
    Pronouns:  string;
    Description: string;
  }
}
const userSchema = new Schema({
  User: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Language: {
    type: String,
    default: 'en',
  },
  Profile: {
    Public: {
      type: Boolean,
      default: true,
    },
    Name: {
      type: String,
      default: null,
    },
    Pronouns: {
      type: String,
      default: null,
    },
    Description: {
      type: String,
      default: null,
    }
  }
}, { versionKey: false });
export = model<UserDocument>("users", userSchema);


