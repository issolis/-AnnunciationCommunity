import type { Request, Response, NextFunction } from "express";

export class AuthValidator {
    validateLogin(req: Request, res: Response, next: NextFunction): void {
        try {
            const { email, password } = req.body;

            if (typeof email !== "string" || !email.trim()) throw new Error("email is required and must be a non-empty string");
            if (typeof password !== "string" || !password.trim()) throw new Error("password is required and must be a non-empty string");

            next();
        } catch (error) {
            res.status(422).json({
                success: false,
                error: error instanceof Error ? error.message : "Invalid request"
            });
        }
    }
}
