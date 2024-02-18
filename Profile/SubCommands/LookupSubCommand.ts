import { ApplicationCommandOptionType, ApplicationCommandOptions } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, Options } from "discord.js";
import { GetProfile, ProfileProperties } from "../Controllers/GetProfile";
import { Emojis } from "../../Common/Emojis";
import { Colors } from "../../Common/Colors";
import { Wrap } from "../../Common/Wrap";

export const LookupSubCommand: ApplicationCommandOptions = {
  name: "lookup",
  description: "Look up someones global profile!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: [
    {
      name: "user",
      description: "Provide the user id of the user you would like to lookup!",
      type: ApplicationCommandOptionType.USER,
      required: true
    }
  ]
} as ApplicationCommandOptions;

export async function RunLookupSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.options.getSubcommand() === "lookup") {
    const user = interaction.options.getUser("user");
    const getProfile:
      Record<"Profile", Record<ProfileProperties, string | boolean | null>>
      = await GetProfile(user.id);
    const wrappedProfile = await Wrap<Record<"Profile", Record<ProfileProperties, string | boolean | null>>>(getProfile as any);
    let name: string = typeof (wrappedProfile.data.Profile.Name) === "string" ? wrappedProfile.data.Profile.Name : "Not set";
    let pronouns: string = typeof (wrappedProfile.data.Profile.Pronouns) === "string" ? wrappedProfile.data.Profile.Pronouns : "Not set";
    let description: string = typeof (wrappedProfile.data.Profile.Description) === "string" ? wrappedProfile.data.Profile.Description : "Not set";
    if (!wrappedProfile.data.Profile.Public) {
      name = "Not set";
      pronouns = "Not set";
      description = "Not set";
    };

    return interaction.reply({
      embeds: [
        {
          title: `:bust_in_silhouette: ${name}`,
          thumbnail: {
            url: user.avatarURL()
          },
          color: Colors.Yellow,
          description: `**Pronouns:** ${pronouns}\n**Description:** ${description}`,
          footer: {
            text: "Lacy • lacy.weeb.ws",
            icon_url: ctx.user.avatarURL()
          }
        }
      ],
      ephemeral: true
    }) as any;
  }
}
