import { beforeEach, describe, expect, it, vi } from "vitest";
import { askGptChat } from "../services/ai.js";

process.env.API_KEY = "test-api-key";

const { mockCreate, MockOpenAIClient } = vi.hoisted(() => {
	const mockCreate = vi.fn();
	class MockOpenAIClient {
		chat = {
			completions: {
				create: mockCreate,
			},
		};
	}
	return { mockCreate, MockOpenAIClient };
});

vi.mock("openai", () => {
	return {
		default: MockOpenAIClient,
	};
});

describe("askGptChat test", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockCreate.mockReset();
	});

	it("must return reply from AI", async () => {
		mockCreate.mockResolvedValue({
			choices: [{ message: { content: "Answer from AI" } }],
		});

		const response = await askGptChat("answer me");
		expect(response).toBe("Answer from AI");
		expect(mockCreate).toHaveBeenCalledTimes(1);
	});

	it("must catch a error", async () => {
		mockCreate.mockRejectedValue("Network error");

		const response = await askGptChat("wtf internet");

		expect(response).toBe("Ошибка при запросе к нейронке.\nЧто поделать :(");
	});

	it("must throw 'Cannot find API_KEY' error", async () => {
		const originalApiKeyCopy = process.env.API_KEY;
		delete process.env.API_KEY;

		vi.resetModules();

		const { getOpenAIClient } = await import("../services/ai.js");

		await expect(async () => {
			await getOpenAIClient();
		}).rejects.toThrow("Cannot find API_KEY in .env file");

		process.env.API_KEY = originalApiKeyCopy;
	});
});
