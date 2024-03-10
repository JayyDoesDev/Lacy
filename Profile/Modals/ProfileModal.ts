import { Event, DefineEvent } from "../../Common/DefineEvent";
import { ModalSubmitInteraction } from "discord.js";
import { Context } from "../../Context";
import { SetName } from "../Controllers/SetName";
import { SetPronouns } from "../Controllers/SetPronouns";
import { SetDescription } from "../Controllers/SetDescription";
import { RightArrowStringConfig } from "../../Common/RightArrowStringConfig";
import { Emojis } from "../../Common/Emojis";
import { Colors } from "../../Common/Colors";
import UserSchema from "../../Models/UserSchema";
import { RegisterInteractionById } from "../../Common/RegisterInteractionById";

export const ProfileModal: Event = DefineEvent({
  event: {
    name: "interactionCreate",
    once: false,
  },
  on: (interaction: ModalSubmitInteraction, ctx: Context) => {
    RegisterInteractionById({
      id: `profile_${interaction.user.id}`,
      ctx: ctx,
      interaction: interaction,
      typeguards: {
        negativeTypeGuards: ["isModalSubmit"]
      },
      callback: async (ctx: Context, interaction: ModalSubmitInteraction) => {
        const preferredName: string = interaction.fields.getTextInputValue("preferred_name");
        const pronouns: string = interaction.fields.getTextInputValue("profile_pronouns");
        const description: string = interaction.fields.getTextInputValue("profile_description");
        await SetName(preferredName ? preferredName : null, interaction.user.id);
        await SetPronouns(pronouns ? pronouns : null, interaction.user.id);
        await SetDescription(description ? description : null, interaction.user.id);
        return interaction.reply({
          content: "> I have saved your profile settings! if you would like to make your profile public or private, use `/profile visable`!",
          embeds: [
            {
              title: ":bust_in_silhouette: Profile Config",
              description: `
                    ${RightArrowStringConfig(preferredName ? Emojis.CHECK_MARK : Emojis.CROSS_MARK, "Name")}
                    \n${RightArrowStringConfig(pronouns ? Emojis.CHECK_MARK : Emojis.CROSS_MARK, "Pronouns")}
                    \n${RightArrowStringConfig(description ? Emojis.CHECK_MARK : Emojis.CROSS_MARK, "Description")}`,
              color: Colors.Yellow,
              footer: {
                text: "Lacy • lacy.weeb.ws",
                icon_url: ctx.user.avatarURL()
              }
            }
          ],
          ephemeral: true,
        });
      }
    });
  }
}) as Event;


