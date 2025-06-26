import express from 'express';
import { registerExpressMcpRouter } from '@anoguez/mcp-core';
import { YahooFinanceV2Tool, EchoTool } from '../tools';
import { GreetingResource, EchoResource } from '../resources';
import { EchoPrompt } from '../prompts';

export const mcpRouter = express.Router();

registerExpressMcpRouter(mcpRouter, {
  prompts: [new EchoPrompt()],
  resources: [new GreetingResource(), new EchoResource()],
  tools: [new YahooFinanceV2Tool(), new EchoTool()],
});
