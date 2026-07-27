import { Pool } from "pg";
import pool from "../../../shared/config/db.js";
import { AppError } from "../../../shared/error/app.error.js";
import type { HeadquarterModel } from "../model/headquarter.model.js";
import type { HeadquarterRepository } from "./headquarter.repository.interface.js";

export class HeadquarterRepositoryImpl implements HeadquarterRepository {
    constructor(
        private readonly db: Pool = pool
    ) {}

    async findAll(): Promise<HeadquarterModel[]> {
        try {
            const result = await this.db.query<HeadquarterModel>(
                `SELECT uuid, name, country FROM headquarter`
            );

            return result.rows;
        } catch (error) {
            throw new AppError(`Failed to fetch headquarters: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async findByUuid(uuid: string): Promise<HeadquarterModel | null> {
        try {
            const result = await this.db.query<HeadquarterModel>(
                `SELECT uuid, name, country FROM headquarter WHERE uuid = $1`,
                [uuid]
            );

            return result.rows[0] ?? null;
        } catch (error) {
            throw new AppError(`Failed to fetch headquarter: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async create(data: Omit<HeadquarterModel, "uuid">): Promise<HeadquarterModel> {
        try {
            const result = await this.db.query<HeadquarterModel>(
                `INSERT INTO headquarter (name, country) VALUES ($1, $2) RETURNING uuid, name, country`,
                [data.name, data.country]
            );

            return result.rows[0]!;
        } catch (error) {
            throw new AppError(`Failed to create headquarter: ${error instanceof Error ? error.message : error}`, 500);
        }
    }
}