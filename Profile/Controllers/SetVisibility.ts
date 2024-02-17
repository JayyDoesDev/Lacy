import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";

export async function SetVisibility(boolean: boolean, userId: Snowflake): Promise<void> {
  if (await UserExists(userId)) {
    await UserSchema.updateOne(
      {
        User: userId,
      },
      {
        $set: {
          "Profile.Public": boolean
         },
      }
    );
  } else {
    await new UserSchema({ User: userId }).save();
    await UserSchema.updateOne(
      {
        User: userId,
      },
      {
        $set: {
          "Profile.Public": boolean
         },
      }
    );
  }
}
