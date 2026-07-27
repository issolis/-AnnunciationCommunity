import { Pool } from "pg";
import pool  from "../../../shared/config/db.js";
import type { HeadquarterModel } from "../model/headquarter.model.js";
import type { HeadquarterRepository } from "./headquarter.repository.interface.js";

export class HeadquarterRepositoryImpl implements HeadquarterRepository {
    constructor(
        private readonly db: Pool = pool
    ) {}

    async findAll(): Promise<HeadquarterModel[]> {
        const result = await this.db.query<HeadquarterModel>(
            `SELECT uuid, name, country FROM headquarter`
        );

        return result.rows;
    }

    async findByUuid(uuid: string): Promise<HeadquarterModel | null> {
        const result = await this.db.query<HeadquarterModel>(
            `SELECT uuid, name, country FROM headquarter WHERE uuid = $1`,
            [uuid]
        );

        return result.rows[0] ?? null;
    }

    async create(data: Omit<HeadquarterModel, "uuid">): Promise<HeadquarterModel> {
        const result = await this.db.query<HeadquarterModel>(
            `INSERT INTO headquarter (name, country) VALUES ($1, $2) RETURNING uuid, name, country`,
            [data.name, data.country]
        );

        return result.rows[0]!;
    }
}