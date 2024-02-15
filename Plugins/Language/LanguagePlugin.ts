import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { LanguageCommand } from "../../Language/index";

export = DefinePlugin({
  name: "Language",
  description: "Change the language of Zygote!",
  commands: [LanguageCommand],
  public_plugin: true
}) as Plugin;
