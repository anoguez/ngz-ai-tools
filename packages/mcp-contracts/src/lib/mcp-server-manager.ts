import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Implementation } from '@modelcontextprotocol/sdk/types.js';
import { logger } from '../utils/logger';
import { HandlerValues } from './mcp-contracts';

const defaultConfig: Implementation = {
  name: 'ngz-mcp-server',
  version: '1.0.0',
};

export abstract class MCPServerManager {
  abstract registerHandlers(handlers: HandlerValues): void;
}

export class MCPServerManagerImpl extends MCPServerManager {
  private server: McpServer;

  constructor(config: Implementation = defaultConfig) {
    super();
    this.server = new McpServer(config);
  }

  registerHandlers({ tools, resources, prompts }: HandlerValues) {
    // Register Tools
    logger.info('Registering Tools...');
    for (const tool of tools) {
      this.server.tool(tool.name, tool.schema, tool.cb);
    }

    // Register Resources
    logger.info('Registering Resources...');
    for (const resource of resources) {
      this.server.resource(resource.name, resource.template, resource.cb);
    }

    // Register Prompts
    logger.info('Registering Prompts...');
    for (const prompt of prompts) {
      this.server.prompt(prompt.name, prompt.schema, prompt.cb);
    }
  }

  getServer(): McpServer {
    return this.server;
  }
}
