import type { UserRepository } from "../infraestructure/repository/user.repository.interface.js";
import type { UserModel } from "../infraestructure/model/user.model.js";

export class FindAllUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(): Promise<UserModel[]> {
        return this.userRepository.findAll();
    }
}