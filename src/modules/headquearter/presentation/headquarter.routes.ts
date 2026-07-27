import { Router } from "express";
import { HeadquarterController } from "./headquarter.controller.js";
import { HeadquarterValidator } from "./headquarter.validator.js";
import { HeadquarterRepositoryImpl } from "../infraestructure/repository/headquarter.repository.impl.js";
import { FindAllHeadquarterUseCase } from "../application/find-all-headquarter.js";
import { FindHeadquarterByUuidUseCase } from "../application/find-headquarter-by-uuid.js";
import { CreateHeadquarterUseCase } from "../application/create-headquarter.js";

const headquarterRepository = new HeadquarterRepositoryImpl();

const controller = new HeadquarterController(
    new FindAllHeadquarterUseCase(headquarterRepository),
    new FindHeadquarterByUuidUseCase(headquarterRepository),
    new CreateHeadquarterUseCase(headquarterRepository)
);

const validator = new HeadquarterValidator();

export const headquarterRouter = Router();

headquarterRouter.get("/", controller.findAll.bind(controller));
headquarterRouter.get("/:uuid", validator.validateUuidParam.bind(validator), controller.findByUuid.bind(controller));
headquarterRouter.post("/", validator.validateCreate.bind(validator), controller.create.bind(controller));