import { BaseMCPTool } from '@anoguez/mcp-core';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

const YahooFinanceSchema = z.object({
  symbol: z.string().min(1),
});

// type YahooFinanceParams = z.infer<typeof YahooFinanceSchema>;

export class YahooFinanceV2Tool
  implements BaseMCPTool<typeof YahooFinanceSchema>
{
  private readonly BASE_URL = 'https://query2.finance.yahoo.com';

  public readonly name = 'fetch-stock-data-v2';
  public readonly schema = YahooFinanceSchema.shape;

  public readonly cb = async ({
    symbol,
  }: typeof YahooFinanceSchema.shape): Promise<CallToolResult> => {
    const response = await fetch(
      `${this.BASE_URL}/v8/finance/chart/${symbol}?interval=1d`
    );
    const data = await response.text();
    return {
      content: [{ type: 'text', text: data }],
    };
  };
}
