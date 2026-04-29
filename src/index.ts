import { bot } from "./bot.js";

bot.start({onStart: () => {
    console.log("Bot started");
}})