import "dotenv/config";
import process from "node:process";
import { Bot } from "grammy";

import type { BotContext } from "./types/bot-types.js";
import { startHandler } from "./handlers/start.js";
import { askDeepSeek } from "./services/ai.js";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("Cannot find BOT_TOKEN in .env file.");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.command("start", startHandler)

bot.on("message:text", async (ctx)=> {
    const message = ctx.message.text;

    const processing = await ctx.reply("Услышал. Ты давай посиди пока, ща накатаю ответ...");
    const deleteProcessingMessage = () => ctx.api.deleteMessage(ctx.chat!.id, processing.message_id);

    try {
        const response = await askDeepSeek(message);
        await ctx.reply(response);
    } catch (error) {
        console.error(error);
    } finally {
        deleteProcessingMessage();
    }
})