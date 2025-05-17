import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseResource } from '../types';

export class EchoResource implements BaseResource {
  constructor(readonly server: McpServer) {
    this.server.resource(
      'echo',
      new ResourceTemplate('echo://{message}', { list: undefined }),
      async (uri, { message }) => ({
        contents: [
          {
            uri: uri.href,
            text: `Resource echo: ${message}`,
          },
        ],
      })
    );
  }
}
