import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTools } from '../types';
import z from 'zod';

export class EchoTool implements BaseTools {
  constructor(readonly server: McpServer) {
    this.server.tool('echo', { message: z.string() }, async ({ message }) => ({
      content: [{ type: 'text', text: `Tool echo: ${message}` }],
    }));
  }
}
