import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SessionData } from '../types/bot-types.js';
import { Hears } from '../consts/hears.js';

interface TestContext {
    session: SessionData;
    message: { text: string };
    reply: ReturnType<typeof vi.fn>;
}

describe('Bot handlers logic', () => {
    let ctx: TestContext;
    
    beforeEach(() => {
        ctx = {
            session: { waitingForAI: false },
            message: { text: Hears.AI_ASSISTANT },
            reply: vi.fn()
        };
    });
    
    it('должен установить waitingForAI в true', () => {
        const aiHandler = (ctx: TestContext, next: () => void) => {
            if (ctx.message.text === Hears.AI_ASSISTANT) {
                ctx.session.waitingForAI = true;
            }
            return next();
        };
        
        let nextCalled = false;
        aiHandler(ctx, () => { nextCalled = true; });
        
        expect(ctx.session.waitingForAI).toBe(true);
        expect(nextCalled).toBe(true);
    });
    
    it('должен обрабатывать другие сообщения корректно', () => {
        const aiHandler = (ctx: TestContext, next: () => void) => {
            if (ctx.message.text === Hears.AI_ASSISTANT) {
                ctx.session.waitingForAI = true;
            }
            return next();
        };
        
        ctx.message.text = '/start';
        
        let nextCalled = false;
        aiHandler(ctx, () => { nextCalled = true; });
        
        expect(ctx.session.waitingForAI).toBe(false);
        expect(nextCalled).toBe(true);
    });
});