import { BaseMCPResource } from '@anoguez/mcp-core';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';

export class EchoResource implements BaseMCPResource {
  public readonly name = 'echo';
  public readonly template = new ResourceTemplate('echo://{message}', {
    list: undefined,
  });

  public readonly cb = async (
    uri: URL,
    { message }: Record<string, string | string[]>
  ) => ({
    contents: [
      {
        uri: uri.href,
        text: `Resource echo: ${message}`,
      },
    ],
  });
}
