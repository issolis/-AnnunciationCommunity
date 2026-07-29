import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error/app.error.js";
import { jwtSecret } from "../config/jwt.js";
import type { UserModel } from "../../user/infraestructure/model/user.model.js";


export interface AuthenticatedRequest extends Request {
    user?: UserModel;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) throw new AppError("Missing or invalid authorization header", 401);

        const token = header.slice("Bearer ".length);
        const payload = jwt.verify(token, jwtSecret) as UserModel;

        req.user = payload;

        next();
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({ success: false, error: error.message });
        } else {
            res.status(401).json({ success: false, error: "Invalid or expired token" });
        }
    }
}