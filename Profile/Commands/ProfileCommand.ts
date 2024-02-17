import { ApplicationCommandOptions, ApplicationCommandType } from "@antibot/interactions";
import { Command, DefineCommand } from "../../Common/DefineCommand";
import { Context } from "../../Context";
import { Colors } from "../../Common/Colors";
import {
  ProfileSetSubCommand,
  RunProfileSetSubCommand,
  ProfileVisibilitySubCommand,
  RunVisibilitySubCommand
} from "../SubCommands";
import { ChatInputCommandInteraction } from "discord.js";

const SubCommands: ApplicationCommandOptions[] = [
  ProfileSetSubCommand,
  ProfileVisibilitySubCommand
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
    await RunVisibilitySubCommand(ctx, interaction);
  }
})
