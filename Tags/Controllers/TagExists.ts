import { GuildExists } from "../../Common/GuildExists";
import { Wrap } from "../../Common/Wrap";
import type { Snowflake } from "@antibot/interactions";
import GuildSchema from "../../Models/GuildSchema";
import { Model, Document } from "mongoose";
import { GuildDocument, Tags } from "../../Models/GuildDocument";
export async function TagExists(guildId: Snowflake, name: string): Promise<boolean> {
  if (await GuildExists(guildId)) {
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    return wrappedGuild.data
      .Tags.find((e: Tags) => {
        e.TagName === name
      }) ? true : false;
  };
  return false;
};
