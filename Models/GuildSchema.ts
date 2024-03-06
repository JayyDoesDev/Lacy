import { Schema, Document, model } from "mongoose";

interface AutoResponders {
  AutoResponderName: String;
  AutoResponderResponse: String;
  Date: Date;
}

interface Tags {
  TagTitle: String;
  TagName: String;
  TagResponse: String;
  TagFooter: String;
  Date: Date;
}

interface GuildDocument extends Document {
  Guild: String;
  AutoResponders: AutoResponders[];
  Tags: Tags[];
}

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
        TagFooter: { type: String, default: null }
      }
    ],
    default: []
  }
}, { versionKey: false });
export = model<GuildDocument>("guilds", GuildSchema);

