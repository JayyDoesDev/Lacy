import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { AutoResponderCommand, AutoResponderModal } from "../../AutoResponder";

export = DefinePlugin({
  name: "Auto Responder",
  description: "Create auto responders to have Lacy respond to your messages!",
  commands: [AutoResponderCommand],
  events: [AutoResponderModal],
  public_plugin: true
}) as Plugin;
