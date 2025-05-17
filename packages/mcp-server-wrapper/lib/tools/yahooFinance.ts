import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTools } from '../types';
import z from 'zod';

export class YahooFinanceTool implements BaseTools {
  private readonly BASE_URL = 'https://query2.finance.yahoo.com';

  constructor(readonly server: McpServer) {
    this.server.tool(
      'fetch-stock-data',
      { symbol: z.string() },
      async ({ symbol }) => {
        const response = await fetch(
          `${this.BASE_URL}/v8/finance/chart/${symbol}?interval=1d`
        );
        const data = await response.text();
        return {
          content: [{ type: 'text', text: data }],
        };
      }
    );

    this.server.tool(
      'fetch-historical-stock-data',
      { symbol: z.string(), startDate: z.number(), endDate: z.number() },
      async ({ symbol, startDate, endDate }) => {
        const response = await fetch(
          `${this.BASE_URL}/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d`
        );
        const data = await response.text();
        return {
          content: [{ type: 'text', text: data }],
        };
      }
    );
  }
}
