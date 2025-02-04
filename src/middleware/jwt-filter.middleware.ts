import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { MESSAGES } from "src/constants/messages.constants";

@Injectable()
export class JWTFilterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException(MESSAGES.ERROR_MESSAGES.MISSING_AUTHENTICATION_TOKEN);
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET ?? '');
            req['user'] = decoded;
            next();
        } catch (error) {
            throw new UnauthorizedException(MESSAGES.ERROR_MESSAGES.INVALID_AUTH_TOKEN);
        }
    }
}