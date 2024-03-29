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
  description: "Create an auto responder!",
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
        .setCustomId(`create_auto_responder_${interaction.user.id}`)
        .setTitle("Create an Auto Responder!");
      const autoResponderName: TextInputBuilder = new TextInputBuilder()
        .setCustomId("auto_responder_name")
        .setLabel("What should Lacy respond to?")
        .setPlaceholder("Hello")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(90)
        .setRequired(true);
      const autoResponderResponse: TextInputBuilder = new TextInputBuilder()
        .setCustomId("auto_responder_response")
        .setLabel("What should Lacy respond with?")
        .setPlaceholder(`Hello!`)
        .setMaxLength(300)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
      const autoResponderNameRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(autoResponderName);
      const autoResponderResponseRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(autoResponderResponse);
      modal.addComponents(autoResponderNameRow, autoResponderResponseRow);
      await interaction.showModal(modal);
    }
  })
}
