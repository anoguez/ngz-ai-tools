import pino from 'pino';

// TODO: move to another package
class Logger {
  private logger: pino.Logger;

  constructor(prefix: string = 'MCP') {
    this.logger = pino({
      name: prefix,
      timestamp: true,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string, error?: Error): void {
    this.logger.error({ err: error }, message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}

export const logger = new Logger();
