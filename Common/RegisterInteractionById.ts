import { Context } from "../Context";
interface RegisterByIdOptions {
  id: string;
  ctx: Context;
  interaction;
  condition?: string;
  callback: Function;
}
export function RegisterInteractionById(options: RegisterByIdOptions): void {
  if (options.condition) {
    if (!options.interaction[options.condition]()) {
      return;
    }
    if (options.interaction.customId === options.id) {
      options.callback(options.ctx, options.interaction);
    }
  } else {
    if (options.interaction.customId === options.id) {
      options.callback(options.ctx, options.interaction);
    }
  }
}
