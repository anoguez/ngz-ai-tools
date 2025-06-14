import { BaseMCPTool } from '@anoguez/mcp-contracts';
import z from 'zod';

const yahooFinanceSchema = z.object({
  symbol: z.string().min(1),
});

type YahooFinanceParams = z.infer<typeof yahooFinanceSchema>;

export class YahooFinanceV2Tool implements BaseMCPTool {
  private readonly BASE_URL = 'https://query2.finance.yahoo.com';

  public readonly name = 'fetch-stock-data-v2';
  public readonly schema = yahooFinanceSchema.shape;

  public readonly cb = async ({ symbol }: YahooFinanceParams) => {
    const response = await fetch(
      `${this.BASE_URL}/v8/finance/chart/${symbol}?interval=1d`
    );
    const data = await response.text();
    return {
      content: [{ type: 'text', text: data }],
    };
  };
}
