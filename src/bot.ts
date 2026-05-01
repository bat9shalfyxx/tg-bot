import "dotenv/config";
import process from "node:process";
import { Bot, session } from "grammy";

import type { BotContext, SessionData } from "./types/bot-types.js";
import { AiAnswerHandler } from "./handlers/ai-answer.js";
import { startHandler } from "./handlers/start.js";
import { rollHandler } from "./handlers/roll.js";
import { helpHandler } from "./handlers/help.js";
import { Hears } from "./consts/hears.js";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("Cannot find BOT_TOKEN in .env file.");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(session<SessionData, BotContext>({
    initial: () => ({
        waitingForAI: false
    })
}))

bot.command("start", startHandler);
bot.command("roll", rollHandler);
bot.command("help", helpHandler);

bot.hears(Hears.ROLL, rollHandler);
bot.hears(Hears.HELP, helpHandler);
bot.hears(Hears.AI_ASSISTANT, (ctx) => {
    ctx.session.waitingForAI = true;
    ctx.reply('Что тебе нужно?');   
});

bot.on("message:text", AiAnswerHandler);