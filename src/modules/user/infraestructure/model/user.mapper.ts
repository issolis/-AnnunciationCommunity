import type { UserRow } from "./user.row.js";
import type { UserModel } from "./user.model.js";

export interface UserJoinedRow extends UserRow {
    headquarter_name: string;
    council_role_name: string | null;
}

export class UserMapper {
    static toModel(row: UserJoinedRow): UserModel {
        return {
            uuid: row.uuid,
            national_id: row.national_id,
            name: row.name,
            f_lastname: row.f_lastname,
            s_lastname: row.s_lastname,
            dob: row.dob,
            phone: row.phone,
            email: row.email,
            access_level: row.access_level,
            headquarter: row.headquarter_name,
            council_role: row.council_role_name
        };
    }
}