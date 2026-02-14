import { Inngest } from "inngest";

// Fallback to dummy key during build/dev if missing, but runtime will fail if not set
export const inngest = new Inngest({
    id: 'finverse',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY || 'mock_key_for_build' } }
})