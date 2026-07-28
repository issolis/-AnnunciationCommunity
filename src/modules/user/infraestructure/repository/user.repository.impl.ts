import { Pool } from "pg";
import pool from "../../../shared/config/db.js";
import { AppError } from "../../../shared/error/app.error.js";
import { UserMapper } from "../model/user.mapper.js";
import type { UserJoinedRow } from "../model/user.mapper.js";
import type { UserModel } from "../model/user.model.js";
import type { UserRow } from "../model/user.row.js";
import type { UserRepository } from "./user.repository.interface.js";

const SELECT_JOINED = `
    SELECT
        u.uuid, u.national_id, u.name, u.f_lastname, u.s_lastname, u.dob,
        u.phone, u.email, u.access_level,
        h.name AS headquarter_name,
        cr.role AS council_role_name
    FROM "user" u
    JOIN headquarter h ON h.uuid = u.headquarter_uuid
    LEFT JOIN council_role cr ON cr.uuid = u.council_role_uuid
`;

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly db: Pool = pool
    ) {}

    async findAll(): Promise<UserModel[]> {
        try {
            const result = await this.db.query<UserJoinedRow>(SELECT_JOINED);

            return result.rows.map(UserMapper.toModel);
        } catch (error) {
            throw new AppError(`Failed to fetch users: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async findByUuid(uuid: string): Promise<UserModel | null> {
        try {
            const result = await this.db.query<UserJoinedRow>(
                `${SELECT_JOINED} WHERE u.uuid = $1`,
                [uuid]
            );

            const row = result.rows[0];
            return row ? UserMapper.toModel(row) : null;
        } catch (error) {
            throw new AppError(`Failed to fetch user: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async findByEmailForAuth(email: string): Promise<UserRow | null> {
        try {
            const result = await this.db.query<UserRow>(
                `SELECT uuid, national_id, name, f_lastname, s_lastname, dob, phone, email,
                        password_hash, access_level, headquarter_uuid, council_role_uuid
                 FROM "user"
                 WHERE email = $1`,
                [email]
            );

            return result.rows[0] ?? null;
        } catch (error) {
            throw new AppError(`Failed to fetch user for auth: ${error instanceof Error ? error.message : error}`, 500);
        }
    }

    async create(data: Omit<UserModel, "uuid" | "headquarter" | "council_role"> & {
        headquarter_uuid: string;
        council_role_uuid: string | null;
        password_hash: string | null;
    }): Promise<UserModel> {
        try {
            const inserted = await this.db.query<{ uuid: string }>(
                `INSERT INTO "user" (national_id, name, f_lastname, s_lastname, dob, phone, email, password_hash, access_level, headquarter_uuid, council_role_uuid)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 RETURNING uuid`,
                [
                    data.national_id,
                    data.name,
                    data.f_lastname,
                    data.s_lastname,
                    data.dob,
                    data.phone,
                    data.email,
                    data.password_hash,
                    data.access_level,
                    data.headquarter_uuid,
                    data.council_role_uuid
                ]
            );

            const created = await this.findByUuid(inserted.rows[0]!.uuid);
            return created!;
        } catch (error) {
            throw new AppError(`Failed to create user: ${error instanceof Error ? error.message : error}`, 500);
        }
    }
}