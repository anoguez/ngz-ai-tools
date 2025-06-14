import { BaseMCPResource } from '@anoguez/mcp-contracts';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';

export class GreetingResource implements BaseMCPResource {
  public readonly name = 'greeting';
  public readonly template = new ResourceTemplate('greeting://{name}', {
    list: undefined,
  });

  public readonly cb = async (uri: URL, { name }: { name: string }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  });
}
