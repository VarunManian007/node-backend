import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LogMiddleware.name);
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`[${new Date().toISOString()}] ${req.method} ${req.baseUrl}`);
        next();
      }
}

