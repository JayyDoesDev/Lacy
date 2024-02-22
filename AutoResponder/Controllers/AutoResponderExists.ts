import { GuildExists } from "../../Common/GuildExists";
import { Wrap } from "../../Common/Wrap";
import GuildSchema from "../../Models/GuildSchema";
import type { Snowflake } from "@antibot/interactions";
export async function AutoResponderExists(guildId: Snowflake, name: string): Promise<boolean> {
  if (await GuildExists(guildId)) {
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    return wrappedGuild.data
      .AutoResponders.find((e: { AutoResponderName: string, AutoResponderResponse: string, Date: Date }) =>
        e.AutoResponderName === name) ? true : false;
  } else {
    await new GuildSchema({ Guild: guildId }).save();
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    return wrappedGuild.data
      .AutoResponders.find((e: { AutoResponderName: string, AutoResponderResponse: string, Date: Date }) =>
        e.AutoResponderName === name) ? true : false;
  }
}
