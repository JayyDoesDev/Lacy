import { Command } from "../../Common/DefineCommand";
import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { HelpCommand, PingCommand } from "../../Generic";

export = DefinePlugin({
	name: "Generic",
	description: "Generic",
	commands: [HelpCommand, PingCommand],
	public_plugin: true
}) as Plugin;
