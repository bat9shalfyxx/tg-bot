import { bot } from "./bot.js";

bot.start({onStart: () => {
    console.log('\x1b[32m%s\x1b[0m', "The bot has been successfully started...");
}})