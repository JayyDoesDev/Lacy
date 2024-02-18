import { ApplicationCommandOptionType, ApplicationCommandOptions } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { GetProfile, ProfileProperties } from "../Controllers/GetProfile";
import { RightArrowStringConfig } from "../../Common/RightArrowStringConfig";
import { Emojis } from "../../Common/Emojis";
import { Colors } from "../../Common/Colors";
import { Wrap } from "../../Common/Wrap";

export const ProfileViewSubCommand: ApplicationCommandOptions = {
  name: "view",
  description: "View your global profile!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: []
} as ApplicationCommandOptions;

export async function RunViewSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.options.getSubcommand() === "view") {
    const getProfile:
      Record<"Profile", Record<ProfileProperties, string | boolean | null>>
      = await GetProfile(interaction.user.id);
    const wrappedProfile = await Wrap<Record<"Profile", Record<ProfileProperties, string | boolean | null>>>(getProfile as any);
    return interaction.reply({
      content: "> Here is your global profile!",
      embeds: [
        {
          title: `:bust_in_silhouette: ${interaction.user.username}`,
          thumbnail: {
            url: interaction.user.avatarURL()
          },
          color: Colors.Yellow,
          description: `${RightArrowStringConfig(
            wrappedProfile.data.Profile.Public ? Emojis.CHECK_MARK : Emojis.CROSS_MARK, "Visible"
          )}\n${RightArrowStringConfig(
            typeof (wrappedProfile.data.Profile.Name) === "string" ? `${Emojis.CHECK_MARK} Name` : `${Emojis.CROSS_MARK} Name`,
            typeof (wrappedProfile.data.Profile.Name) === "string" ? wrappedProfile.data.Profile.Name : "Not set"
          )}\n${RightArrowStringConfig(
            typeof (wrappedProfile.data.Profile.Pronouns) === "string" ? `${Emojis.CHECK_MARK} Pronouns` : `${Emojis.CROSS_MARK} Pronouns`,
            typeof (wrappedProfile.data.Profile.Pronouns) === "string" ? wrappedProfile.data.Profile.Pronouns : " Not set"
          )}\n${RightArrowStringConfig(
            typeof (wrappedProfile.data.Profile.Description) === "string" ? `${Emojis.CHECK_MARK} Description` : `${Emojis.CROSS_MARK} Description`,
            typeof (wrappedProfile.data.Profile.Description) === "string" ? wrappedProfile.data.Profile.Description : `Not set`
          )}`,
          footer: {
            text: "Lacy • lacy.weeb.ws",
            icon_url: ctx.user.avatarURL()
          },
        }
      ],
      ephemeral: true
    }) as any;
  }
}
