import { BaseMCPPrompt } from '@anoguez/mcp-contracts';
import z from 'zod';

const promptSchema = z.object({ message: z.string() });
type PromptParams = z.infer<typeof promptSchema>;

export class EchoPrompt implements BaseMCPPrompt {
  public readonly name = 'echo';
  public readonly schema = promptSchema.shape;

  public readonly cb = async ({ message }: PromptParams) => ({
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
