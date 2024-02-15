import { DefinePlugin, Plugin } from "../../DefinePlugin";
import { ProfileCommand } from "../../Profile";

export = DefinePlugin({
  name: "Profiles",
  description: "Set up a global profile for yourself around Discord!",
  commands: [ProfileCommand],
  public_plugin: true
})
