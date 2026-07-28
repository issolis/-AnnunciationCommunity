import type { UserRepository } from "../infraestructure/repository/user.repository.interface.js";
import type { UserModel } from "../infraestructure/model/user.model.js";

export class FindUserByUuidUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(uuid: string): Promise<UserModel | null> {
        return this.userRepository.findByUuid(uuid);
    }
}