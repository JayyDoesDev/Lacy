import { ApplicationCommandOptions, ApplicationCommandOptionType } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { Wrap, FluxResponse } from "../../Common/Wrap";
import { Colors } from "../../Common/Colors";
import { RegisterSubCommand } from "../../Common/RegisterSubCommand";

export const ActionKissSubCommand: ApplicationCommandOptions = {
  name: "kiss",
  description: "Kiss people!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: [
    {
      name: "user",
      description: "Provide the user you would like to kiss",
      type: ApplicationCommandOptionType.USER,
      required: true
    }
  ]
} as ApplicationCommandOptions;

export async function RunActionKissSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  RegisterSubCommand({
    subCommand: "create",
    ctx: ctx,
    interaction: interaction,
    callback: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
      const user = interaction.options.getUser("user");
      const wrapped = await Wrap<FluxResponse>(ctx.flux.sfw.gifs.getKiss() as any)
      interaction.reply({
        embeds: [
          {
            description: `**${interaction.user.username}** has kissed **${user.username}**! (˶  >   ₃  < ˶)♡`,
            image: {
              url: wrapped.data.file,
            },
            color: Colors.Scarlet,
            footer: {
              icon_url: "https://fluxpoint.dev/img/icons/fluxpoint.png",
              text: "Powered by https://fluxpoint.dev"
            }
          }
        ]
      })
    }
  })
}
