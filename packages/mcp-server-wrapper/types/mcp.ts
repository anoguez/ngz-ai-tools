import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export interface TransportMap {
  [sessionId: string]: StreamableHTTPServerTransport;
}