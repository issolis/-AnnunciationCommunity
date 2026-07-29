import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/error/app.error.js";
import { jwtSecret } from "../../shared/config/jwt.js";
import type { UserRepository } from "../../user/infraestructure/repository/user.repository.interface.js";
import type { UserModel } from "../../user/infraestructure/model/user.model.js";

interface LoginInput {
    email: string;
    password: string;
}

interface LoginOutput {
    token: string;
}

export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(data: LoginInput): Promise<LoginOutput> {
        const row = await this.userRepository.findByEmailForAuth(data.email);

        if (!row || !row.password_hash) throw new AppError("Invalid credentials", 401);

        const isValid = await bcrypt.compare(data.password, row.password_hash);

        if (!isValid) throw new AppError("Invalid credentials", 401);

        const user = await this.userRepository.findByUuid(row.uuid);

        if (!user) throw new AppError("User not found", 404);

        const token = jwt.sign(user, jwtSecret, { expiresIn: "1d" });

        return { token };
    }
}