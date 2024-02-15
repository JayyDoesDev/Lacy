import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { ActionCommand } from "../../Actions";

export = DefinePlugin({
	name: "Actions",
	description: "Action commands!",
	commands: [ActionCommand],
	public_plugin: true
}) as Plugin;
