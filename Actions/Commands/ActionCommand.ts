import { ApplicationCommandOptions, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../Common/DefineCommand";
import { Context } from "../../Context";
import { ChatInputCommandInteraction } from "discord.js";
import { Colors } from "../../Common/Colors";
import {
  ActionPatSubCommand,
  RunActionPatSubCommand,
  ActionBiteSubCommand,
  RunActionBiteSubCommand,
  ActionSlapSubCommand,
  RunSlapSubCommand,
  ActionKissSubCommand,
  RunActionKissSubCommand
} from "../SubCommands";

const SubCommands: ApplicationCommandOptions[] = [
  ActionPatSubCommand,
  ActionBiteSubCommand,
  ActionSlapSubCommand,
  ActionKissSubCommand
];

export const ActionCommand: Command = DefineCommand({
  command: {
    name: "action",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Action commands!",
    options: SubCommands
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    await RunActionPatSubCommand(ctx, interaction);
    await RunActionBiteSubCommand(ctx, interaction);
    await RunSlapSubCommand(ctx, interaction);
    await RunActionKissSubCommand(ctx, interaction);
  }
})
