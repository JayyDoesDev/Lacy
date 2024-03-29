import { ApplicationCommandOptions, ApplicationCommandOptionType } from "@antibot/interactions";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { GuildExists } from "../../Common/GuildExists";
import GuildSchema from "../../Models/GuildSchema";
import { Wrap } from "../../Common/Wrap";
import moment from "moment";
import { RegisterSubCommand } from "../../Common/RegisterSubCommand";
export const ListSubcommand: ApplicationCommandOptions = {
  name: "list",
  description: "Get the list of auto responders created!",
  type: ApplicationCommandOptionType.SUB_COMMAND,
  options: [],
} as ApplicationCommandOptions;

export function RunListSubCommand(ctx: Context, interaction: ChatInputCommandInteraction): void {
  RegisterSubCommand({
    subCommand: "list",
    ctx: ctx,
    interaction: interaction,
    callback: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
      const wrappedGuild = await Wrap(GuildSchema.findOne({ Guild: interaction.guild.id }));
      await GuildExists(interaction.guild.id)
        ? interaction.reply({
          content: `> Here are your server auto responders!\n \`\`\`${wrappedGuild.data.AutoResponders.map((e, i) => `${i + 1}. Name: ${e.AutoResponderName}\n Response: ${e.AutoResponderResponse}\n Creation Date: ${moment(e.Date).format("MMMM Do YYYY")}\n--------------------------`).join("\n") || "> No auto responders found!"}\`\`\``,
          ephemeral: true
        })
        : interaction.reply({ content: "> No auto responders found!", ephemeral: true });
    }
  })
}
