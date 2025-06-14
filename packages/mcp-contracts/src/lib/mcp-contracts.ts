import {
  PromptCallback,
  ReadResourceTemplateCallback,
  ResourceTemplate,
  ToolCallback,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import z from 'zod';

export interface TransportMap {
  [sessionId: string]: StreamableHTTPServerTransport;
}

export type HandlerValues = {
  tools: BaseMCPTool[];
  resources: BaseMCPResource[];
  prompts: BaseMCPPrompt[];
};

export interface BaseMCPTool<T extends z.ZodRawShape = z.ZodRawShape> {
  readonly name: string;
  readonly schema: z.ZodRawShape;
  readonly cb: ToolCallback<T>;
}

export interface BaseMCPResource {
  readonly name: string;
  readonly template: ResourceTemplate;
  readonly cb: ReadResourceTemplateCallback;
}

export interface BaseMCPPrompt<T extends z.ZodRawShape = z.ZodRawShape> {
  readonly name: string;
  readonly schema: z.ZodRawShape;
  readonly cb: PromptCallback<T>;
}
