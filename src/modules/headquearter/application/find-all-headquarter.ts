import type { HeadquarterRepository } from "../infraestructure/repository/headquarter.repository.interface.js";
import type { HeadquarterModel } from "../infraestructure/model/headquarter.model.js";

export class FindAllHeadquarterUseCase {
    constructor(
        private readonly headquarterRepository: HeadquarterRepository
    ) {}

    async execute(): Promise<HeadquarterModel[]> {
        return this.headquarterRepository.findAll();
    }
}