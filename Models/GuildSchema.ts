import { Schema, model } from "mongoose";
import { GuildDocument } from "./GuildDocument";

const GuildSchema = new Schema({
  Guild: {
    type: String
  },
  AutoResponders: {
    type: [{ AutoResponderName: String, AutoResponderResponse: String, Date: Date }],
    default: []
  },
  Tags: {
    type: [
      {
        TagTitle: { type: String, default: null },
        TagName: { type: String },
        TagResponse: { type: String, default: null },
        TagFooter: { type: String, default: null },
        Date: Date
      }
    ],
    default: []
  }
}, { versionKey: false });
export = model<GuildDocument>("guilds", GuildSchema);
