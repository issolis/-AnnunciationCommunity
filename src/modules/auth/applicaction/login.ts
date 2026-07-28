import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/error/app.error.js";
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

        const secret = process.env.JWT_SECRET_KEY;

        if (!secret) throw new AppError("JWT secret is not configured", 500);

        const token = jwt.sign({ uuid: row.uuid }, secret, { expiresIn: "1d" });

        const user = await this.userRepository.findByUuid(row.uuid);

        if (!user) throw new AppError("User not found", 404);

        return { token };
    }
}
