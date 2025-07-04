import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'node:crypto';
import { TransportMap } from './mcp-contracts';

export class StatelessTransportManager {
  createTransport(): StreamableHTTPServerTransport {
    const transport: StreamableHTTPServerTransport =
      new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });

    return transport;
  }
}

export class StatefulTransportManager {
  private transports: TransportMap = {};

  createTransport(): StreamableHTTPServerTransport {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        this.transports[sessionId] = transport;
      },
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        this.removeTransport(transport.sessionId);
      }
    };

    return transport;
  }

  getTransport(sessionId: string): StreamableHTTPServerTransport | undefined {
    return this.transports[sessionId];
  }

  removeTransport(sessionId: string): void {
    delete this.transports[sessionId];
  }

  hasTransport(sessionId: string): boolean {
    return !!this.transports[sessionId];
  }
}

// Export a singleton instance
export const statefulTransportManager = new StatefulTransportManager();
export const statelessTransportManager = new StatelessTransportManager();
