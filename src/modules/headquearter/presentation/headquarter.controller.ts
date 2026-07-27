import type { Request, Response, NextFunction } from "express";
import { FindAllHeadquarterUseCase } from "../application/find-all-headquarter.js";
import { FindHeadquarterByUuidUseCase } from "../application/find-headquarter-by-uuid.js";
import { CreateHeadquarterUseCase } from "../application/create-headquarter.js";

export class HeadquarterController {
    constructor(
        private readonly findAllHeadquarterUseCase: FindAllHeadquarterUseCase,
        private readonly findHeadquarterByUuidUseCase: FindHeadquarterByUuidUseCase,
        private readonly createHeadquarterUseCase: CreateHeadquarterUseCase
    ) {}

    async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const headquarters = await this.findAllHeadquarterUseCase.execute();
            res.status(200).json(headquarters);
        } catch (error) {
            next(error);
        }
    }

    async findByUuid(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { uuid } = req.params as { uuid: string };
        const headquarter = await this.findHeadquarterByUuidUseCase.execute(uuid);

        if (!headquarter) {
            res.status(404).json({ error: "Headquarter not found" });
            return;
        }

        res.status(200).json(headquarter);
    } catch (error) {
        next(error);
    }
}

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const headquarter = await this.createHeadquarterUseCase.execute(req.body);
            res.status(201).json(headquarter);
        } catch (error) {
            next(error);
        }
    }
}
