import OpenAI from "openai";

const AI_PROMPT = `
Ты отыгрываешь токсичного друга.
Обращайся к пользователю неформально и общайся в разговорном стиле.
Если пользователь напишет бред, можешь высмеять его и оскорбить.
`;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("Cannot find API_KEY in .env file.");
}

const client = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://models.github.ai/inference",
});

export async function askDeepSeek(userMessage: string): Promise<string> {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {role: "system", content: AI_PROMPT},
                {role: "user", content: userMessage},
            ],
        }, {timeout: 30000});
    
        return response.choices[0]?.message?.content ?? "Нет ответа от нейронки, попробуй еще раз";
    } catch (error) {
        console.error(`API error: ${error}`);
        return `Ошибка при запросе к нейронке.\nЧто поделать :(`
    }
}