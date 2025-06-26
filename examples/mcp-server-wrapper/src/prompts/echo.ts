import { BaseMCPPrompt } from '@anoguez/mcp-core';
import { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

const PromptSchema = z.object({ message: z.string() });

export class EchoPrompt implements BaseMCPPrompt<typeof PromptSchema> {
  public readonly name = 'echo';
  public readonly schema = PromptSchema.shape;

  public readonly cb = async ({
    message,
  }: typeof PromptSchema.shape): Promise<GetPromptResult> => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Please process this message: ${message}`,
        },
      },
    ],
  });
}
