import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BasePrompt } from '../types';
import z from 'zod';

export class EchoPrompt implements BasePrompt {
  constructor(readonly server: McpServer) {
    this.server.prompt('echo', { message: z.string() }, ({ message }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please process this message: ${message}`,
          },
        },
      ],
    }));
  }
}
