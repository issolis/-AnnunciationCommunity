import type { CouncilRoleModel } from "../model/council-role.model.js";

export interface CouncilRoleRepository {
    findAll(): Promise<CouncilRoleModel[]>;
    findByUuid(uuid: string): Promise<CouncilRoleModel | null>;
    create(data: Omit<CouncilRoleModel, "uuid">): Promise<CouncilRoleModel>;
}
