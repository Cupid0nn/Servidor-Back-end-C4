import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString();
    console.log(`el dia [${now}] se ejecuta ${req.method} en la ruta ${req.originalUrl}`);
    next();
  }
}
