import type { Snowflake } from "@antibot/interactions";
import GuildSchema from "../../Models/GuildSchema";
import { AutoResponderExists } from "./AutoResponderExists";
import { Wrap } from "../../Common/Wrap";
import { AutoResponders } from "../../Models/GuildDocument";
export type GetAutoResponderObjectType = Promise<{ AutoResponderName: string, AutoResponderResponse: string, Date: Date }>;
export type GetAutoResponderResponseType = Promise<{ Response: string }>;
export async function GetAutoResponder(name: string, guildId: Snowflake): GetAutoResponderObjectType;
export async function GetAutoResponder(name: string, guildId: Snowflake): GetAutoResponderResponseType;
export async function GetAutoResponder<T>(name: string, guildId: Snowflake): Promise<T> {
  if (await AutoResponderExists(guildId, name)) {
    const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: guildId }));
    const autoResponder = wrappedGuild.data
      .AutoResponders.find((e: AutoResponders) => {
        return e.AutoResponderName === name;
      });
    if (autoResponder) {
      return {
        AutoResponderName: autoResponder.AutoResponderName as string,
        AutoResponderResponse: autoResponder.AutoResponderResponse as string,
        Date: autoResponder.Date
      } as T;
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
