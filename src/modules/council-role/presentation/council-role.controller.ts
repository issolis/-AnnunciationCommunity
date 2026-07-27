import type { Request, Response, NextFunction } from "express";
import { FindAllCouncilRoleUseCase } from "../applicaction/find-all-council-role.js";
import { FindCouncilRoleByUuidUseCase } from "../applicaction/find-council-role-by-uuid.js";
import { CreateCouncilRoleUseCase } from "../applicaction/create-council-role.js";

export class CouncilRoleController {
    constructor(
        private readonly findAllCouncilRoleUseCase: FindAllCouncilRoleUseCase,
        private readonly findCouncilRoleByUuidUseCase: FindCouncilRoleByUuidUseCase,
        private readonly createCouncilRoleUseCase: CreateCouncilRoleUseCase
    ) {}

    async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const councilRoles = await this.findAllCouncilRoleUseCase.execute();
            res.status(200).json(councilRoles);
        } catch (error) {
            next(error);
        }
    }

    async findByUuid(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { uuid } = req.params as { uuid: string };
            const councilRole = await this.findCouncilRoleByUuidUseCase.execute(uuid);

            if (!councilRole) {
                res.status(404).json({ error: "Council role not found" });
                return;
            }

            res.status(200).json(councilRole);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const councilRole = await this.createCouncilRoleUseCase.execute(req.body);
            res.status(201).json(councilRole);
        } catch (error) {
            next(error);
        }
    }
}
