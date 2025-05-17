import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseResource } from '../types';

export class GreetingResource implements BaseResource {
  constructor(readonly server: McpServer) {
    this.server.resource(
      'greeting',
      new ResourceTemplate('greeting://{name}', { list: undefined }),
      async (uri, { name }) => ({
        contents: [
          {
            uri: uri.href,
            text: `Hello, ${name}!`,
          },
        ],
      })
    );
  }
}
