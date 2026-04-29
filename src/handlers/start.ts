import type { BotContext } from "../types/bot-types.js";

export async function startHandler(ctx: BotContext) {
    const name = ctx.from?.first_name ?? 'Червяк';
    await ctx.reply(
        `Здарова, ${name}, че делать собираемся?

        Могу предложить разве что:

        /start - начать работу
        /roll - рандомное число (1-100)
        `);
}