import { Keyboard } from "grammy";
import type { BotContext } from "../types/bot-types.js";
import { Hears } from "../consts/hears.js";

const keyboard = new Keyboard()
    .text(Hears.AI_ASSISTANT)
    .text(Hears.ROLL)
    .text(Hears.HELP)
    .resized()
    .persistent()

export async function startHandler(ctx: BotContext) { 
    const name = ctx.from?.first_name ?? 'Червяк';
    await ctx.replyWithPhoto('blob:https://web.telegram.org/4e53e494-3fc4-48f5-b4f9-6f8abefcdfe1');
    await ctx.reply(
        `Здарова, ${name}, че делать собираемся?

        Могу предложить разве что:

        /start - начать работу
        /roll - рандомное число (1-100)
        /help - список команд`, { reply_markup: keyboard }
    );
}