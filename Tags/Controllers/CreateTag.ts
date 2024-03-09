import { GuildExists } from "../../dist/Common/GuildExists";
import GuildSchema from "../../Models/GuildSchema";
import type { Snowflake } from "@antibot/interactions";

interface TagOptions {
  title: string | null;
  name: string;
  response: string | null;
  footer: string | null;
}

export async function CreateTag(options: TagOptions, guildId: Snowflake): Promise<void> {
  if (await GuildExists(guildId)) {
    await GuildSchema.updateOne(
      {
        Guild: guildId
      },
      {
        $push: {
          "Tags": { TagTitle: options.title, TagName: options.name, TagResponse: options.name, TagFooter: options.footer }
        }
      }
    );
  } else {
    await new GuildSchema({ Guild: guildId }).save();
    await GuildSchema.updateOne(
      {
        Guild: guildId
      },
      {
        $push: {
          "Tags": { TagTitle: options.title, TagName: options.name, TagResponse: options.name, TagFooter: options.footer }
        }
      }
    );
  }
}
