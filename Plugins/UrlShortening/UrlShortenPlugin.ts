import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { DeleteCommand, ShortenCommand, LinksCommand } from "../../UrlShortening";

export = DefinePlugin({
  name: "Url Shortening",
  description: "Shorten urls!",
  commands: [ShortenCommand, DeleteCommand, LinksCommand],
  public_plugin: true
}) as Plugin;
