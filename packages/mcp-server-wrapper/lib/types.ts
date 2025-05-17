import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export interface BaseResource {
  server: McpServer;
}

export interface BaseTools {
  server: McpServer;
}

export interface BasePrompt {
  server: McpServer;
}
