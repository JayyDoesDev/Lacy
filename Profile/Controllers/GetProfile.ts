import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";

export type ProfileProperties = "Public" | "Name" | "Pronouns" | "Description";
export async function GetProfile(userId: Snowflake): Promise<Record<"Profile", Record<ProfileProperties, string | boolean | null>>> {
  if (await UserExists(userId)) {
    const data = await UserSchema.findOne({ User: userId });
    return {
      Profile: {
        Public: data.Profile.Public,
        Name: data.Profile.Name,
        Pronouns: data.Profile.Pronouns,
        Description: data.Profile.Description
      }
    };
  } else {
    return {
      Profile: {
        Public: true,
        Name: null,
        Pronouns: null,
        Description: null
      }
    };
  }
}
