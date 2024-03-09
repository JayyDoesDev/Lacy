import { Document } from "mongoose";

export interface AutoResponders {
  AutoResponderName: String;
  AutoResponderResponse: String;
  Date: Date;
}

export interface Tags {
  TagTitle: String;
  TagName: String;
  TagResponse: String;
  TagFooter: String;
  Date: Date;
}

export interface GuildDocument extends Document {
  Guild: String;
  AutoResponders: AutoResponders[];
  Tags: Tags[];
}
