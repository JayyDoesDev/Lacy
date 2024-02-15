import UserSchema from "../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";
export async function UserExists(userId: Snowflake): Promise<boolean> {
  const findUser = await UserSchema.findOne({ User: userId });
  let bool: boolean;
  findUser ? bool = true : bool = false;
  return bool;
}
