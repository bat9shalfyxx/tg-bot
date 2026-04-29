import type { BotContext } from "../types/bot-types.js";
import { askGptChat } from "../services/ai.js";

export async function AiAnswerHandler(ctx: BotContext, next: () => Promise<void>) {
    if (!ctx.session.waitingForAI) return next();
    ctx.session.waitingForAI = false;

    const message = ctx.message?.text;
    if (!message) return next();
    
    const processing = await ctx.reply("Услышал. Ты давай посиди там, а я пока накатаю ответ...");
    const deleteProcessingMessage = () => ctx.api.deleteMessage(ctx.chat!.id, processing.message_id);

    try {
        const response = await askGptChat(message); 
        await ctx.replyWithPhoto('https://i.ytimg.com/vi/mtJz0sMgEqY/maxresdefault.jpg');
        await ctx.reply(response);
    } catch (error) {
        console.error(error);
    } finally {
        deleteProcessingMessage();
    }
}