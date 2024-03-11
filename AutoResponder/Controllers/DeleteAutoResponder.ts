import type { Snowflake } from "@antibot/interactions";
import GuildSchema from "../../Models/GuildSchema";
import { AutoResponderExists } from "./AutoResponderExists";
import { Wrap } from "../../Common/Wrap";
import { AutoResponders } from "../../Models/GuildDocument";
export type DeleteAutoResponderStringType = Promise<{ Response: string }>;
export type DeleteAutoResponderBooleanType = Promise<{ Response: boolean }>;
export async function DeleteAutoResponder(name: string, guildId: Snowflake): DeleteAutoResponderStringType;
export async function DeleteAutoResponder(name: string, guildId: Snowflake): DeleteAutoResponderBooleanType;
export async function DeleteAutoResponder<T>(name: string, guildId: Snowflake): Promise<T> {
  if (await AutoResponderExists(guildId, name)) {
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    const autoResponder = wrappedGuild.data
      .AutoResponders.find((e: AutoResponders) => {
        return e.AutoResponderName === name;
      });
    if (autoResponder) {
      wrappedGuild.data.updateOne(
        {
          Guild: guildId
        },
        {
          $pull: {
            "AutoResponders": { AutoResponder: name }
          }
        }
      )
    } else {
      return {
        Response: "Not Found"
      } as T;
    }
  } else {
    return {
      Response: "Not Found"
    } as T;
  }
}
