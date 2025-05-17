import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Implementation } from '@modelcontextprotocol/sdk/types.js';
import * as resources from './resources';
import * as tools from './tools';
import * as prompts from './prompts';
import { logger } from '../utils/logger';

const defaultConfig: Implementation = {
  name: 'ngz-mcp-server',
  version: '1.0.0',
};

export class MCPServerManager {
  private server: McpServer;

  constructor(config: Implementation = defaultConfig) {
    this.server = new McpServer(config);
    this.registerHandlers();
  }

  private registerHandlers() {
    this.registerResources();
    this.registerTools();
    this.registerPrompts();
  }

  private registerResources() {
    logger.info('Registering resources...');
    Object.values(resources).forEach((Resource) => {
      try {
        if (typeof Resource === 'function') {
          new Resource(this.server);
        }
      } catch (error) {
        logger.error(`Failed to register resource: ${error}`);
      }
    });
  }

  private registerTools() {
    logger.info('Registering tools...');
    Object.values(tools).forEach((Tool) => {
      try {
        if (typeof Tool === 'function') {
          new Tool(this.server);
        }
      } catch (error) {
        logger.error(`Failed to register tool: ${error}`);
      }
    });
  }

  private registerPrompts() {
    logger.info('Registering prompts...');
    Object.values(prompts).forEach((Prompt) => {
      try {
        if (typeof Prompt === 'function') {
          new Prompt(this.server);
        }
      } catch (error) {
        logger.error(`Failed to register prompt: ${error}`);
      }
    });
  }

  getServer(): McpServer {
    return this.server;
  }
}
