import { ChatInputCommandInteraction } from "discord.js";
import UserSchema from "../../Models/UserSchema";
import { Schema } from "mongoose";
import type { Snowflake } from "@antibot/interactions";
import { UserExists } from "../../Common/UserExists";
export async function SetLang(lang: string, userId: Snowflake): Promise<void> {
  if (await UserExists(userId)) {
    await UserSchema.updateOne(
      {
        User: userId,
      },
      {
        $set: { Language: lang },
      }
    );
  } else {
    await new UserSchema({ User: userId }).save();
    await UserSchema.updateOne(
      {
        User: userId,
      },
      {
        $set: { Language: lang },
      }
    )
  }
}
