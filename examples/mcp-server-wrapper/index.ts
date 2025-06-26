#!/usr/bin/env node

import { App } from './src/app';
import { config } from './config/index';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logger, MCPServerManagerImpl } from '@anoguez/mcp-core';
import { YahooFinanceV2Tool } from './src/tools/yahooFinanceV2';
import { EchoTool } from './src/tools';
import { EchoResource, GreetingResource } from './src/resources';
import { EchoPrompt } from './src/prompts';

async function startHttpMode() {
  try {
    const app = new App();
    const server = app.getApp().listen(config.PORT, () => {
      logger.info(
        `Server running on port ${config.PORT} in ${config.NODE_ENV} mode`
      );
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Starting graceful shutdown...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: Error) => {
      logger.error('Unhandled Rejection:', reason);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error as Error);
    process.exit(1);
  }
}

async function startStdioMode() {
  logger.info('Starting mcp in STDIO mode');
  const serverManager = new MCPServerManagerImpl();

  serverManager.registerHandlers({
    tools: [new YahooFinanceV2Tool(), new EchoTool()],
    resources: [new GreetingResource(), new EchoResource()],
    prompts: [new EchoPrompt()],
  });

  await serverManager.startStdioMode();
  logger.info('Server started in STDIO mode');
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('mode', {
      alias: 'm',
      type: 'string',
      choices: ['http', 'stdio'],
      default: 'http',
      describe: 'Server mode to run in',
    })
    .parseSync();

  switch (argv.mode) {
    case 'http':
      await startHttpMode();
      break;
    case 'stdio':
      await startStdioMode();
      break;
    default:
      logger.error(`Unsupported mode: ${argv.mode}`);
      process.exit(1);
  }
}

main().catch((error) => {
  logger.error('Startup error:', error);
  process.exit(1);
});
