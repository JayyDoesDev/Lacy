import { Schema, model } from "mongoose";
import { UserDocument } from "./UserDocument";

const UserSchema = new Schema({
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
export = model<UserDocument>("users", UserSchema);


