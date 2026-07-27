import type { CouncilRoleRepository } from "../infraestructure/repository/council-role.repository.interface.js";
import type { CouncilRoleModel } from "../infraestructure/model/council-role.model.js";

export class FindCouncilRoleByUuidUseCase {
    constructor(
        private readonly councilRoleRepository: CouncilRoleRepository
    ) {}

    async execute(uuid: string): Promise<CouncilRoleModel | null> {
        return this.councilRoleRepository.findByUuid(uuid);
    }
}
