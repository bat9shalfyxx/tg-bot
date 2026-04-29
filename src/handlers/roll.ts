import type { BotContext } from "../types/bot-types.js";

export async function rollHandler(ctx: BotContext) {
    const randomNumber = Math.round(Math.random() * 100);
    await ctx.reply(`Бог рандома выдал вам число: ${randomNumber}...`);
}
