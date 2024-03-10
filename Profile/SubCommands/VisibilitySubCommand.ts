import { ApplicationCommandOptionType, ApplicationCommandOptions } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { SetVisibility } from "../Controllers/SetVisibility";
import { RightArrowStringConfig } from "../../Common/RightArrowStringConfig";
import { Emojis } from "../../Common/Emojis";
import { Colors } from "../../Common/Colors";
import { RegisterSubCommand } from "../../Common/RegisterSubCommand";

export const ProfileVisibilitySubCommand: ApplicationCommandOptions = {
  name: "visibility",
  description: "Set the visibility of your global profile!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: [
    {
      name: "visible",
      description: "Choose whether you would like your profile to be looked up by other users within the bot!",
      type: ApplicationCommandOptionType.BOOLEAN,
      required: true
    }
  ]
} as ApplicationCommandOptions;

export function RunVisibilitySubCommand(ctx: Context, interaction: ChatInputCommandInteraction): void {
  RegisterSubCommand({
    subCommand: "visibility",
    ctx: ctx,
    interaction: interaction,
    callback: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
      const getvisible: boolean = interaction.options.getBoolean("visible");
      await SetVisibility(getvisible, interaction.user.id);
      return interaction.reply({
        content: `> Your profile visibility has been set to ${getvisible}! Use \`/profile view\` to view your profile!`,
        embeds: [
          {
            title: ":bust_in_silhouette: Profile Config",
            color: Colors.Yellow,
            description: RightArrowStringConfig(getvisible ? Emojis.CHECK_MARK : Emojis.CROSS_MARK, "Profile Visibility"),
            footer: {
              text: "Lacy • lacy.weeb.ws",
              icon_url: ctx.user.avatarURL()
            }
          }
        ],
        ephemeral: true
      }) as any;
    }
  })
}
