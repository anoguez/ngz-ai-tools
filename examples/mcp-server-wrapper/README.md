# ngz-mcp

A wrapper for the Model Context Protocol (MCP) SDK to simplify AI interactions.

## Running it locally

Run `yarn dev`

## Inpector

Run `yarn inspector` to inspect and debug MCP.

### Registering tools, resources and prompts

Place tools on `lib/tools` - Files on this folder will be automatically detected and registered as available tools
```ts
export class EchoTool implements BaseTools {
  constructor(readonly server: McpServer) {
    this.server.tool('echo', { message: z.string() }, async ({ message }) => ({
      content: [{ type: 'text', text: `Tool echo: ${message}` }],
    }));
  }
}
```

Place resources on `lib/resources` - Files on this folder will be automatically detected and registered as available resources
```ts
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
```

Place prompts on `lib/prompts` - Files on this folder will be automatically detected and registered as available prompts
```ts
export class EchoPrompt implements BasePrompt {
  constructor(readonly server: McpServer) {
    this.server.prompt('echo', { message: z.string() }, ({ message }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Please process this message: ${message}`,
          },
        },
      ],
    }));
  }
}
```