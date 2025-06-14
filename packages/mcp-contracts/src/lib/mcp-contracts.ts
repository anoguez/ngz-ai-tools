/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import z from 'zod';

// export type ToolCallback<T extends z.ZodRawShape> = (
//   params: z.infer<z.ZodObject<T>>
// ) => Promise<{
//   content: Array<{ type: 'text'; text: string }>;
// }>;

export interface TransportMap {
  [sessionId: string]: StreamableHTTPServerTransport;
}

export type HandlerValues = {
  tools: BaseMCPTool[];
  resources: BaseMCPResource[];
  prompts: BaseMCPPrompt[];
};

export interface BaseMCPTool {
  readonly name: string;
  readonly schema: z.ZodRawShape;
  readonly cb: any; // TODO
}

export interface BaseMCPResource {
  readonly name: string;
  readonly template: ResourceTemplate;
  readonly cb: any; // TODO
}

export interface BaseMCPPrompt {
  readonly name: string;
  readonly schema: z.ZodRawShape;
  readonly cb: any; // TODO
}
