import { BaseMCPTool } from '@anoguez/mcp-contracts';
import z from 'zod';

const yahooFinanceSchema = z.object({
  message: z.string().min(1),
});
type YahooFinanceParams = z.infer<typeof yahooFinanceSchema>;

export class EchoTool implements BaseMCPTool {
  public readonly name = 'echo';
  public readonly schema = yahooFinanceSchema.shape;
  public readonly cb = async ({ message }: YahooFinanceParams) => ({
    content: [{ type: 'text', text: `Echo: ${message}` }],
  });
}
