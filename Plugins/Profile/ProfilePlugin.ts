import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { ProfileCommand, ProfileModal } from "../../Profile";

export = DefinePlugin({
  name: "Profiles",
  description: "Set up a global profile for yourself around Discord!",
  commands: [ProfileCommand],
  events: [ProfileModal],
  public_plugin: true
})
