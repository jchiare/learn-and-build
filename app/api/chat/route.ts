import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  // Select the appropriate AI provider
  const aiModel = model === 'gpt-5'
    ? openai('gpt-4o') // Using GPT-4o as GPT-5 placeholder
    : anthropic('claude-sonnet-4-20250514');

  // Stream the response
  const result = streamText({
    model: aiModel,
    messages,
  });

  // Save messages to database (async, don't await to not block response)
  const lastUserMessage = messages[messages.length - 1];
  if (lastUserMessage) {
    prisma.chatMessage.create({
      data: {
        role: 'user',
        content: lastUserMessage.content,
        model,
      },
    }).catch(console.error);
  }

  return result.toDataStreamResponse();
}
