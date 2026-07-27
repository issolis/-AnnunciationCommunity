import type { HeadquarterRepository } from "../infraestructure/repository/headquarter.repository.interface.js";
import type { HeadquarterModel } from "../infraestructure/model/headquarter.model.js";

export class FindHeadquarterByUuidUseCase {
    constructor(
        private readonly headquarterRepository: HeadquarterRepository
    ) {}

    async execute(uuid: string): Promise<HeadquarterModel | null> {
        return this.headquarterRepository.findByUuid(uuid);
    }
}