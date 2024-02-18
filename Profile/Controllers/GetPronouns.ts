import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";

export async function GetPronouns(userId: Snowflake): Promise<string | null> {
  if (await UserExists(userId)) {
    return new UserSchema({ User: userId }).Profile.Pronouns;
  } else {
    return null;
  }
}
