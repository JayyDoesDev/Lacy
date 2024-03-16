import { ApplicationCommandOptions, ApplicationCommandOptionType } from "@antibot/interactions";
import { Context } from "../../Context";
import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import { RegisterSubCommand } from "../../Common/RegisterSubCommand";
export const CreateSubCommand: ApplicationCommandOptions = {
  name: "create",
  description: "Create a tag!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: []
} as ApplicationCommandOptions;

export function RunCreateSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): void {
  RegisterSubCommand({
    subCommand: "create",
    ctx: ctx,
    interaction: interaction,
    callback: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
      const modal: ModalBuilder = new ModalBuilder()
        .setCustomId(`create_tag_${interaction.user.id}`)
        .setTitle("Create a Tag!");
      const tagName: TextInputBuilder = new TextInputBuilder()
        .setCustomId("tag_name")
        .setLabel("What should Lacy listen to?")
        .setPlaceholder("help")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(90)
        .setRequired(true);
        const tagResponse: TextInputBuilder = new TextInputBuilder()
        .setCustomId("tag_response")
        .setLabel("")
    }
  })
}