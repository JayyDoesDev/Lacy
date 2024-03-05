import { GuildExists } from "../../Common/GuildExists";
import GuildSchema from "../../Models/GuildSchema";
import type { Snowflake } from "@antibot/interactions";

export async function CreateAutoResponder(name: string, response: string, guildid: Snowflake): Promise<void> {
  if (await GuildExists(guildid)) {
    await GuildSchema.updateOne(
      {
        Guild: guildid,
      },
      {
        $push: {
          "AutoResponders": { AutoResponderName: name, AutoResponderResponse: response, Date: Date.now() }
        }
      }
    );
  } else {
    await new GuildSchema({ Guild: guildid }).save();
    await GuildSchema.updateOne(
      {
        Guild: guildid,
      },
      {
        $push: {
          "AutoResponders": { AutoResponderName: name, AutoResponderResponse: response, Date: Date.now() }
        }
      }
    );
  }
}
