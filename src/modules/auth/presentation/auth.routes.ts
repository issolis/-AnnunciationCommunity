import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthValidator } from "./auth.validator.js";
import { UserRepositoryImpl } from "../../user/infraestructure/repository/user.repository.impl.js";
import { LoginUseCase } from "../applicaction/login.js";

const userRepository = new UserRepositoryImpl();

const controller = new AuthController(
    new LoginUseCase(userRepository)
);

const validator = new AuthValidator();

export const authRouter = Router();

authRouter.post("/login", validator.validateLogin.bind(validator), controller.login.bind(controller));
