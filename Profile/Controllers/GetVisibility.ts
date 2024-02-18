import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";

export async function GetVisibility(userId: Snowflake): Promise<boolean> {
  if (await UserExists(userId)) {
    return new UserSchema({ User: userId }).Profile.Public;
  } else {
    return true;
  }
}
