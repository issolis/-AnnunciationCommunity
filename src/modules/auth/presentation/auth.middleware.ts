import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/error/app.error.js";

export interface AuthenticatedRequest extends Request {
    userUuid?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) throw new AppError("Missing or invalid authorization header", 401);

        const token = header.slice("Bearer ".length);
        const secret = process.env.JWT_SECRET_KEY;

        if (!secret) throw new AppError("JWT secret is not configured", 500);

        const payload = jwt.verify(token, secret) as { uuid: string };
        req.userUuid = payload.uuid;

        next();
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({ success: false, error: error.message });
        } else {
            res.status(401).json({ success: false, error: "Invalid or expired token" });
        }
    }
}
