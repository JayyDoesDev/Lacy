import {
  ApplicationCommandOptions,
  ApplicationCommandType,
  PermissionBitToString,
  Permissions
} from "@antibot/interactions";
import { Command, DefineCommand } from "../../Common/DefineCommand";
import { Context } from "../../Context";
import {
  CreateSubCommand,
  RunCreateSubCommand,
  ListSubcommand,
  RunListSubCommand
} from "../SubCommands/index";
import { ChatInputCommandInteraction } from "discord.js";

const SubCommands: ApplicationCommandOptions[] = [
  CreateSubCommand,
  ListSubcommand
];

export const AutoResponderCommand: Command = DefineCommand({
  command: {
    name: "auto-responder",
    type: ApplicationCommandType.CHAT_INPUT,
    description: "Create auto responders in your server!",
    default_member_permissions: PermissionBitToString(
      Permissions({ ManageGuild: true })
    ),
    options: SubCommands
  },
  on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
    await RunCreateSubCommand(ctx, interaction);
    await RunListSubCommand(ctx, interaction);
  }
})
