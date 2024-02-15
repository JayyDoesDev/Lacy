import { ApplicationCommandOptions, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../DefineCommand";
import { Context } from "../../Context";
import { Colors } from "../../Colors";
import {
  SetSubCommand,
  RunProfileSetSubCommand
} from "../SubCommands";
import { ChatInputCommandInteraction } from "discord.js";

const SubCommands: ApplicationCommandOptions[] = [
  SetSubCommand
];

export const ProfileCommand: Command = DefineCommand({
  command: {
    name: "profile",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Create and edit your global profile!",
    options: SubCommands
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    await RunProfileSetSubCommand(ctx, interaction);
  }
})
