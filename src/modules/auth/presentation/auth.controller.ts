import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/error/app.error.js";
import { LoginUseCase } from "../applicaction/login.js";

export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase
    ) {}

    async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const result = await this.loginUseCase.execute(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: unknown, res: Response): void {
        if (error instanceof AppError) {
            res.status(error.status).json({ success: false, error: error.message });
        } else if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: "Unexpected error" });
        }
    }
}
