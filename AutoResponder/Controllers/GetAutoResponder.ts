import { Snowflake } from "discord.js";
import GuildSchema from "../../Models/GuildSchema";
import { AutoResponderExists } from "./AutoResponderExists";
import { Wrap } from "../../Common/Wrap";

export async function GetAutoResponder(name: string, guildId: Snowflake):
  Promise<{ AutoResponderName: string, AutoResponderResponse: string, Date: Date } | { Response: string }> {
  if (await AutoResponderExists(guildId, name)) {
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    const autoResponder = wrappedGuild.data
      .AutoResponders.find((e: { AutoResponderName: string, AutoResponderResponse: string, Date: Date }) => {
        return e.AutoResponderName === name;
      });
    if (autoResponder) {
      return {
        AutoResponderName: autoResponder.AutoResponderName as string,
        AutoResponderResponse: autoResponder.AutoResponderResponse as string,
        Date: autoResponder.Date
      };
    } else {
      return {
        Response: "Not Found"
      };
    }
  } else {
    return {
      Response: "Not Found"
    };
  }
}
