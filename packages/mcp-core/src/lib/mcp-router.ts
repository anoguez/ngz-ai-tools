import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { MCPServerManagerImpl } from './mcp-server-manager';
import { statefulTransportManager } from './transport-manager';
import { Request, Response, Router } from 'express';
import { HandlerValues } from './mcp-contracts';

export async function registerExpressMcpRouter(
  mcpRouter: Router,
  handlers: HandlerValues
): Promise<void> {
  // Handle POST requests for client-to-server communication
  mcpRouter.post('/', (req, res) => handleClientRequest(req, res, handlers));

  // Handle GET requests for server-to-client notifications via SSE
  mcpRouter.get('/', handleSessionRequest);

  // Handle DELETE requests for session termination
  mcpRouter.delete('/', handleSessionRequest);
}

async function handleClientRequest(
  req: Request,
  res: Response,
  handlers: HandlerValues
) {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (sessionId && statefulTransportManager.hasTransport(sessionId)) {
    // Reuse existing transport
    const transport = statefulTransportManager.getTransport(sessionId);
    await transport?.handleRequest(req, res, req.body);
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // New initialization request
    const transport = statefulTransportManager.createTransport();
    const mcpServer = new MCPServerManagerImpl();

    // Register tools, resources and prompts
    mcpServer.registerHandlers(handlers);

    // Connect to the MCP server
    await mcpServer.getServer().connect(transport);
    await transport.handleRequest(req, res, req.body);
  } else {
    // Invalid request
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: 400,
        message: 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
  }
}

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (!sessionId || !statefulTransportManager.hasTransport(sessionId)) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }

  const transport = statefulTransportManager.getTransport(sessionId);
  await transport?.handleRequest(req, res);
};
