import { Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);

  res.status(500).json({
    jsonrpc: '2.0',
    error: {
      code: -32000,
      message: 'Internal Server Error',
    },
    id: null,
  });
};
