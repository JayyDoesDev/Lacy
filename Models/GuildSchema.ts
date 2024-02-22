import { Schema, Document, model } from "mongoose";

interface AutoResponders {
  AutoResponderName: String;
  AutoResponderResponse: String;
  Date: Date;
}
interface GuildDocument extends Document {
  Guild: String;
  AutoResponders: AutoResponders[];
}

const GuildSchema = new Schema({
  Guild: {
    type: String
  },
  AutoResponders: {
    type: [ { AutoResponderName: String, AutoResponderResponse: String, Date: Date } ],
    default: []
  }
}, { versionKey: false });
export = model<GuildDocument>("guilds", GuildSchema);

