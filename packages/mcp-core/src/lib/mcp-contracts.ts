import {
  ReadResourceTemplateCallback,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolResult,
  GetPromptResult,
} from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

export interface TransportMap {
  [sessionId: string]: StreamableHTTPServerTransport;
}

export type HandlerValues = {
  tools: BaseMCPTool[];
  resources: BaseMCPResource[];
  prompts: BaseMCPPrompt[];
};

export type ToolCallback<Args extends z.ZodRawShape> = (
  args: Args
) => Promise<CallToolResult>;

export type PromptCallback<Args extends z.ZodRawShape> = (
  args: Args
) => Promise<GetPromptResult>;

export interface BaseMCPTool<TSchema extends z.AnyZodObject = z.AnyZodObject> {
  readonly name: string;
  readonly schema: TSchema['shape'];
  readonly cb: ToolCallback<TSchema['shape']>;
}
export interface BaseMCPResource {
  readonly name: string;
  readonly template: ResourceTemplate;
  readonly cb: ReadResourceTemplateCallback;
}

export interface BaseMCPPrompt<
  TSchema extends z.AnyZodObject = z.AnyZodObject
> {
  readonly name: string;
  readonly schema: TSchema['shape'];
  readonly cb: PromptCallback<TSchema['shape']>;
}
