import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/error/app.error.js";
import { FindAllCouncilRoleUseCase } from "../application/find-all-council-role.js";
import { FindCouncilRoleByUuidUseCase } from "../application/find-council-role-by-uuid.js";
import { CreateCouncilRoleUseCase } from "../application/create-council-role.js";

export class CouncilRoleController {
    constructor(
        private readonly findAllCouncilRoleUseCase: FindAllCouncilRoleUseCase,
        private readonly findCouncilRoleByUuidUseCase: FindCouncilRoleByUuidUseCase,
        private readonly createCouncilRoleUseCase: CreateCouncilRoleUseCase
    ) {}

    async findAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const councilRoles = await this.findAllCouncilRoleUseCase.execute();
            res.status(200).json({ success: true, data: councilRoles });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async findByUuid(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const { uuid } = req.params as { uuid: string };
            const councilRole = await this.findCouncilRoleByUuidUseCase.execute(uuid);

            if (!councilRole) throw new AppError("Council role not found", 404);

            res.status(200).json({ success: true, data: councilRole });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const councilRole = await this.createCouncilRoleUseCase.execute(req.body);
            res.status(201).json({ success: true, data: councilRole });
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
