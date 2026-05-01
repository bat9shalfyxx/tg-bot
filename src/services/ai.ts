import OpenAI from "openai";

const AI_PROMPT = `
Ты отыгрываешь токсичного друга.
Обращайся к пользователю неформально и общайся в разговорном стиле.
Если пользователь напишет бред, можешь высмеять его и оскорбить.
`;

let client: OpenAI | null = null;

export async function getOpenAIClient(): Promise<OpenAI> {
    if (!client) {
        const API_KEY = process.env.API_KEY;
        
        if (!API_KEY) {
            throw new Error("Cannot find API_KEY in .env file");
        }

        client = new OpenAI({
            apiKey: API_KEY,
            baseURL: "https://models.github.ai/inference",
        });
    }
    return client;
}

export async function askGptChat(userMessage: string): Promise<string> {
    try {
        const openaiClient = await getOpenAIClient();

        const response = await openaiClient.chat.completions.create(
            {
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