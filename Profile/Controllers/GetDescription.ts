import type { Snowflake } from "@antibot/interactions";
import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";

export async function GetDescription(userId: Snowflake): Promise<string | null> {
  if (await UserExists(userId)) {
    return new UserSchema({ User: userId }).Profile.Description;
  } else {
    return null;
  }
}
