export interface UserRow {
    uuid: string;
    national_id: string;
    name: string;
    f_lastname: string;
    s_lastname: string | null;
    dob: string;
    phone: string | null;
    email: string | null;
    password_hash: string | null;
    access_level: number | null;
    headquarter_uuid: string;
    council_role_uuid: string | null;
}