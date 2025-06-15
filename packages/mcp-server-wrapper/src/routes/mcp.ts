import express from 'express';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { MCPServerManagerImpl, transportManager } from '@anoguez/mcp-core';
import { YahooFinanceV2Tool } from '../tools/yahooFinanceV2';
import { EchoTool } from '../tools';
import { EchoResource, GreetingResource } from '../resources';
import { EchoPrompt } from '../prompts';

export const mcpRouter = express.Router();

// Handle POST requests for client-to-server communication
mcpRouter.post('/', async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (sessionId && transportManager.hasTransport(sessionId)) {
    // Reuse existing transport
    const transport = transportManager.getTransport(sessionId);
    await transport?.handleRequest(req, res, req.body);
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // New initialization request
    const transport = transportManager.createTransport();
    const mcpServer = new MCPServerManagerImpl();

    // Register tools, resources and prompts
    mcpServer.registerHandlers({
      tools: [new YahooFinanceV2Tool(), new EchoTool()],
      resources: [new GreetingResource(), new EchoResource()],
      prompts: [new EchoPrompt()],
    });

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
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (
  req: express.Request,
  res: express.Response
) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (!sessionId || !transportManager.hasTransport(sessionId)) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }

  const transport = transportManager.getTransport(sessionId);
  await transport?.handleRequest(req, res);
};

// Handle GET requests for server-to-client notifications via SSE
mcpRouter.get('/', handleSessionRequest);

// Handle DELETE requests for session termination
mcpRouter.delete('/', handleSessionRequest);
