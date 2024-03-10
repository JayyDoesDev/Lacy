import type { Snowflake } from "@antibot/interactions";
import GuildSchema from "../../Models/GuildSchema";
import { TagExists } from "./TagExists";
import { Wrap } from "../../Common/Wrap";
import { Tags } from "../../Models/GuildDocument";

export async function GetTag(name: string, guildId: Snowflake):
  Promise<Tags | { Response: string }> {
  if (await TagExists(guildId, name)) {
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    const tag = wrappedGuild.data
      .Tags.find((e: Tags) => {
        return e.TagName === name;
      });
    if (tag) {
      return {
        TagTitle: tag.TagTitle,
        TagName: tag.TagName,
        TagResponse: tag.TagResponse,
        TagFooter: tag.TagFooter,
        Date: tag.Date
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
