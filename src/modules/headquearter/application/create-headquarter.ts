import type { HeadquarterRepository } from "../infraestructure/repository/headquarter.repository.interface.js";
import type { HeadquarterModel } from "../infraestructure/model/headquarter.model.js";

export class CreateHeadquarterUseCase {
    constructor(
        private readonly headquarterRepository: HeadquarterRepository
    ) {}

    async execute(data: Omit<HeadquarterModel, "uuid">): Promise<HeadquarterModel> {
        return this.headquarterRepository.create(data);
    }
}