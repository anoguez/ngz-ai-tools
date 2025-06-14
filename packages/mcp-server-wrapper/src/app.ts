import express, { Application } from 'express';
import { mcpRouter } from './routes/mcp';
import { errorHandler } from './middleware/error';
import { logger } from '@anoguez/mcp-contracts';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.path}`);
      next();
    });
  }

  private setupRoutes(): void {
    this.app.use('/mcp', mcpRouter);

    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  getApp(): Application {
    return this.app;
  }
}
