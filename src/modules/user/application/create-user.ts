import bcrypt from "bcrypt";
import type { UserRepository } from "../infraestructure/repository/user.repository.interface.js";
import type { UserModel } from "../infraestructure/model/user.model.js";

type CreateUserInput = Omit<UserModel, "uuid" | "headquarter" | "council_role"> & {
    headquarter_uuid: string;
    council_role_uuid: string | null;
    password: string | null;
};

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(data: CreateUserInput): Promise<UserModel> {
        const password_hash = data.password ? await bcrypt.hash(data.password, 10) : null;
        const { password, ...rest } = data;

        return this.userRepository.create({ ...rest, password_hash });
    }
}