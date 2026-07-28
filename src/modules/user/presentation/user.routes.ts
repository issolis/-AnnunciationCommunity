import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserValidator } from "./user.validator.js";
import { UserRepositoryImpl } from "../infraestructure/repository/user.repository.impl.js";
import { FindAllUserUseCase } from "../application/find-all-user.js";
import { FindUserByUuidUseCase } from "../application/find-user-by-uuid.js";
import { CreateUserUseCase } from "../application/create-user.js";

const userRepository = new UserRepositoryImpl();

const controller = new UserController(
    new FindAllUserUseCase(userRepository),
    new FindUserByUuidUseCase(userRepository),
    new CreateUserUseCase(userRepository)
);

const validator = new UserValidator();

export const userRouter = Router();

userRouter.get("/", controller.findAll.bind(controller));
userRouter.get("/:uuid", validator.validateUuidParam.bind(validator), controller.findByUuid.bind(controller));
userRouter.post("/", validator.validateCreate.bind(validator), controller.create.bind(controller));