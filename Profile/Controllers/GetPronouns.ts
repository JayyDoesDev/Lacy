import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";
export async function GetPronouns(userId: Snowflake): Promise<string>;
export async function GetPronouns(userId: Snowflake): Promise<null>;
export async function GetPronouns<T>(userId: Snowflake): Promise<T> {
  if (await UserExists(userId)) {
    return new UserSchema({ User: userId }).Profile.Pronouns as T;
  } else {
    return null;
  }
}
