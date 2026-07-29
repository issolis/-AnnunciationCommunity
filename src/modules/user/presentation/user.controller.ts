import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/error/app.error.js";
import type { AuthenticatedRequest } from "../../shared/middlewares/auth.middleware.js";
import { FindAllUserUseCase } from "../application/find-all-user.js";
import { FindUserByUuidUseCase } from "../application/find-user-by-uuid.js";
import { CreateUserUseCase } from "../application/create-user.js";


export class UserController {
    constructor(
        private readonly findAllUserUseCase: FindAllUserUseCase,
        private readonly findUserByUuidUseCase: FindUserByUuidUseCase,
        private readonly createUserUseCase: CreateUserUseCase
    ) {}

    async findAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const users = await this.findAllUserUseCase.execute();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async findByUuid(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const { uuid } = req.params as { uuid: string };
            const user = await this.findUserByUuidUseCase.execute(uuid);

            if (!user) throw new AppError("User not found", 404);

            res.status(200).json({ success: true, data: user });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async findMe(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void> {
        try {
            if (!req.user) throw new AppError("Unauthorized", 401);

            const user = await this.findUserByUuidUseCase.execute(req.user.uuid);

            if (!user) throw new AppError("User not found", 404);

            res.status(200).json({ success: true, data: user });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            res.status(201).json({ success: true, data: user });
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