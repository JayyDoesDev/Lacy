import { Event, DefineEvent } from "../../Common/DefineEvent";
import { Context } from "../../Context";
import { GetAutoResponder } from "../Controllers/GetAutoResponder";
import { Colors } from "../../Common/Colors";
import { Message } from "discord.js";
import { Wrap } from "../../Common/Wrap";
export const AutoResponderEvent: Event = DefineEvent({
  event: {
    name: "messageCreate",
    once: false
  },
  on: async (message: Message, ctx: Context) => {
    const wrappedAutoResponder: Record<"data",
      { AutoResponderName: string, AutoResponderResponse: string, Date: Date }
      | { Response: String }> = await Wrap
        <{ AutoResponderName: string, AutoResponderResponse: string, Date: Date }
          | { Response: String }>(GetAutoResponder(message.content, message.guild.id));
    if ('AutoResponderName' in wrappedAutoResponder.data) {
      message.channel.send({
        embeds: [
          {
            description: wrappedAutoResponder.data.AutoResponderResponse,
            color: Colors.Yellow,
            footer: {
              text: "Lacy • lacy.weeb.ws",
              icon_url: ctx.user.avatarURL()
            }
          }
        ]
      })
    } else {
      return;
    }
  },
}) as Event;
