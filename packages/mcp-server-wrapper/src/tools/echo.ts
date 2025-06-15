import { BaseMCPTool } from '@anoguez/mcp-core';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

const YahooFinanceSchema = z.object({
  message: z.string().min(1),
});

// type YahooFinanceParams = z.infer<typeof YahooFinanceSchema>;

export class EchoTool implements BaseMCPTool<typeof YahooFinanceSchema> {
  public readonly name = 'echo';
  public readonly schema = YahooFinanceSchema.shape;

  public readonly cb = async ({
    message,
  }: typeof YahooFinanceSchema.shape): Promise<CallToolResult> => ({
    content: [{ type: 'text', text: `Echo: ${message}` }],
  });
}
