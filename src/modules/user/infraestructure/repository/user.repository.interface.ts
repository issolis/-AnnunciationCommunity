
import type { UserModel } from "../model/user.model.js";
import type { UserRow } from "../model/user.row.js";

export interface UserRepository {
    findAll(): Promise<UserModel[]>;
    findByUuid(uuid: string): Promise<UserModel | null>;
    findByEmailForAuth(email: string): Promise<UserRow | null>;
    create(data: Omit<UserModel, "uuid" | "headquarter" | "council_role"> & {
        headquarter_uuid: string;
        council_role_uuid: string | null;
        password_hash: string | null;
    }): Promise<UserModel>;
}