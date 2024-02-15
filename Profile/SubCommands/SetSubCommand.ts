import { ApplicationCommandOptions, ApplicationCommandOptionType } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, ModalBuilder, ModalSubmitInteraction, TextInputStyle } from "discord.js";
import { Colors } from "../../Common/Colors";
import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
export const SetSubCommand: ApplicationCommandOptions = {
  name: "set",
  description: "Set your pronouns and description!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: []
} as ApplicationCommandOptions;

export async function RunProfileSetSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): Promise<void> {
  const modal: ModalBuilder = new ModalBuilder()
  .setCustomId(`profile_${interaction.user.id}`)
  .setTitle("Setup Your Global Profile")
  const preferredName: TextInputBuilder = new TextInputBuilder()
    .setCustomId('preferred_name')
    .setLabel("What is your preferred name?")
    .setPlaceholder("Lacy")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(60)
    .setRequired(false);
  const preferredNameRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(preferredName);
  modal.addComponents(preferredNameRow as any)
  if (interaction.options.getSubcommand() === "set") {
    await interaction.showModal(modal);
  }
}
