import type { CouncilRoleRepository } from "../infraestructure/repository/council-role.repository.interface.js";
import type { CouncilRoleModel } from "../infraestructure/model/council-role.model.js";

export class CreateCouncilRoleUseCase {
    constructor(
        private readonly councilRoleRepository: CouncilRoleRepository
    ) {}

    async execute(data: Omit<CouncilRoleModel, "uuid">): Promise<CouncilRoleModel> {
        return this.councilRoleRepository.create(data);
    }
}
