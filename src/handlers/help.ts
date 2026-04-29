import type { BotContext } from "../types/bot-types.js";

export async function helpHandler(ctx: BotContext) {
    await ctx.reply(
    `Список команд:
    /start - начать работу
    /roll - рандомное число (1-100)
    /help - список команд
    `)
}