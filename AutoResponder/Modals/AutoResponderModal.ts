import { Event, DefineEvent } from "../../Common/DefineEvent";
import { ModalSubmitInteraction } from "discord.js";
import { Context } from "../../Context";
import { CreateAutoResponder } from "../Controllers/CreateAutoResponder";
import { AutoResponderExists } from "../Controllers/AutoResponderExists";
import { Emojis } from "../../Common/Emojis";
import { Colors } from "../../Common/Colors";
import { RegisterInteractionById } from "../../Common/RegisterInteractionById";
export const AutoResponderModal: Event = DefineEvent({
  event: {
    name: "interactionCreate",
    once: false
  },
  on: (interaction: ModalSubmitInteraction, ctx: Context) => {
    RegisterInteractionById({
      id: `create_auto_responder_${interaction.user.id}`,
      ctx: ctx,
      interaction: interaction,
      typeguards: {
        negativeTypeGuards: ["isModalSubmit"]
      },
      callback: async (ctx: Context, interaction: ModalSubmitInteraction) => {
        const autoResponderName: string = interaction.fields.getTextInputValue("auto_responder_name");
        const autoResponderResponse: string = interaction.fields.getTextInputValue("auto_responder_response");
        if (await AutoResponderExists(interaction.guild.id, autoResponderName)) {
          return interaction.reply({ content: `> The auto responder ${autoResponderName} already exists! Use \`/auto-responder delete\` to delete it!`, ephemeral: true });
        } else {
          await CreateAutoResponder(autoResponderName, autoResponderResponse, interaction.guild.id);
          return interaction.reply({
            content: `> I have created your auto responder going by the name of \`${autoResponderName}\`!`,
            embeds: [
              {
                title: `${Emojis.CHECK_MARK} Auto Responder Created`,
                description: `• **Auto Responder Name:** \`${autoResponderName}\`\n• **Auto Responder Response:** \`\`\`\n${autoResponderResponse}\`\`\``,
                color: Colors.Yellow,
                footer: {
                  text: "Lacy • lacy.weeb.ws",
                  icon_url: ctx.user.avatarURL()
                }
              }
            ],
            ephemeral: true
          })
        }
      }
    })
  }
}) as Event;
