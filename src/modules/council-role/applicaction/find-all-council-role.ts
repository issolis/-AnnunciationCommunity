import type { CouncilRoleRepository } from "../infraestructure/repository/council-role.repository.interface.js";
import type { CouncilRoleModel } from "../infraestructure/model/council-role.model.js";

export class FindAllCouncilRoleUseCase {
    constructor(
        private readonly councilRoleRepository: CouncilRoleRepository
    ) {}

    async execute(): Promise<CouncilRoleModel[]> {
        return this.councilRoleRepository.findAll();
    }
}
