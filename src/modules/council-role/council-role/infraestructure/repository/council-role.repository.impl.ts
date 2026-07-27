import { Pool } from "pg";
import pool from "../../../../shared/config/db.js";
import { AppError } from "../../../../shared/error/app.error.js";
import type { CouncilRoleModel } from "../model/council-role.model.js";
import type { CouncilRoleRepository } from "./council-role.repository.interface.js";

export class CouncilRoleRepositoryImpl implements CouncilRoleRepository {
    constructor(
        private readonly db: Pool = pool
    ) {}

    async findAll(): Promise<CouncilRoleModel[]> {
        try {
            const result = await this.db.query<CouncilRoleModel>(
                `SELECT uuid, role FROM council_role`
            );

            return result.rows;
        } catch (error) {
            throw new AppError(`Failed to fetch council roles: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async findByUuid(uuid: string): Promise<CouncilRoleModel | null> {
        try {
            const result = await this.db.query<CouncilRoleModel>(
                `SELECT uuid, role FROM council_role WHERE uuid = $1`,
                [uuid]
            );

            return result.rows[0] ?? null;
        } catch (error) {
            throw new AppError(`Failed to fetch council role: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async create(data: Omit<CouncilRoleModel, "uuid">): Promise<CouncilRoleModel> {
        try {
            const result = await this.db.query<CouncilRoleModel>(
                `INSERT INTO council_role (role) VALUES ($1) RETURNING uuid, role`,
                [data.role]
            );

            return result.rows[0]!;
        } catch (error) {
            throw new AppError(`Failed to create council role: ${error instanceof Error ? error.message : error}`, 500);
        }
    }
}
