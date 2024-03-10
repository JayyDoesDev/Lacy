import { ApplicationCommandOptions, ApplicationCommandOptionType } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction, ModalBuilder, ModalSubmitInteraction, TextInputStyle } from "discord.js";
import { Colors } from "../../Common/Colors";
import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
import { RegisterSubCommand } from "../../Common/RegisterSubCommand";
export const ProfileSetSubCommand: ApplicationCommandOptions = {
  name: "set",
  description: "Set your pronouns and description!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: []
} as ApplicationCommandOptions;

export function RunProfileSetSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): void {
  RegisterSubCommand({
    subCommand: "set",
    ctx: ctx,
    interaction: interaction,
    callback: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
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
      const pronouns: TextInputBuilder = new TextInputBuilder()
        .setCustomId("profile_pronouns")
        .setLabel("What is your pronouns?")
        .setPlaceholder("she/her")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(15)
        .setRequired(false);
      const description: TextInputBuilder = new TextInputBuilder()
        .setCustomId('profile_description')
        .setLabel("What do you want people to know about you?")
        .setPlaceholder("I like to play games!")
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(300)
        .setRequired(false);
      const preferredNameRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(preferredName);
      const pronounsRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(pronouns);
      const descriptionRow: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>().addComponents(description);
      modal.addComponents(preferredNameRow, pronounsRow, descriptionRow as any)
      await interaction.showModal(modal);
    }
  })
}
