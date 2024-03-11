import { UserExists } from "../../Common/UserExists";
import UserSchema from "../../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";

export type ProfileProperties = "Public" | "Name" | "Pronouns" | "Description";

export type ProfileReturnType<T> = {
  Profile: Record<ProfileProperties, T>;
};

export async function GetProfile(userId: Snowflake): Promise<ProfileReturnType<string>>;
export async function GetProfile(userId: Snowflake): Promise<ProfileReturnType<boolean>>;
export async function GetProfile(userId: Snowflake): Promise<ProfileReturnType<null>>;
export async function GetProfile<T>(
  userId: Snowflake
): Promise<ProfileReturnType<T>> {
  if (await UserExists(userId)) {
    const data = await UserSchema.findOne({ User: userId });
    return {
      Profile: {
        Public: data.Profile.Public,
        Name: data.Profile.Name,
        Pronouns: data.Profile.Pronouns,
        Description: data.Profile.Description,
      },
    } as ProfileReturnType<T>;
  } else {
    return {
      Profile: {
        Public: true,
        Name: null,
        Pronouns: null,
        Description: null,
      },
    } as ProfileReturnType<T>;
  }
}
