import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/error/app.error.js";
import { FindAllHeadquarterUseCase } from "../application/find-all-headquarter.js";
import { FindHeadquarterByUuidUseCase } from "../application/find-headquarter-by-uuid.js";
import { CreateHeadquarterUseCase } from "../application/create-headquarter.js";

export class HeadquarterController {
    constructor(
        private readonly findAllHeadquarterUseCase: FindAllHeadquarterUseCase,
        private readonly findHeadquarterByUuidUseCase: FindHeadquarterByUuidUseCase,
        private readonly createHeadquarterUseCase: CreateHeadquarterUseCase
    ) {}

    async findAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const headquarters = await this.findAllHeadquarterUseCase.execute();
            res.status(200).json({ success: true, data: headquarters });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async findByUuid(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const { uuid } = req.params as { uuid: string };
            const headquarter = await this.findHeadquarterByUuidUseCase.execute(uuid);

            if (!headquarter) throw new AppError("Headquarter not found", 404);

            res.status(200).json({ success: true, data: headquarter });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async create(req: Request, res: Response, _next: NextFunction): Promise<void> {
        try {
            const headquarter = await this.createHeadquarterUseCase.execute(req.body);
            res.status(201).json({ success: true, data: headquarter });
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