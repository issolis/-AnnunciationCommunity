import { Router } from "express";
import { CouncilRoleController } from "./council-role.controller.js";
import { CouncilRoleValidator } from "./council-role.validator.js";
import { CouncilRoleRepositoryImpl } from "../infraestructure/repository/council-role.repository.impl.js";
import { FindAllCouncilRoleUseCase } from "../application/find-all-council-role.js";
import { FindCouncilRoleByUuidUseCase } from "../application/find-council-role-by-uuid.js";
import { CreateCouncilRoleUseCase } from "../application/create-council-role.js";

const councilRoleRepository = new CouncilRoleRepositoryImpl();

const controller = new CouncilRoleController(
    new FindAllCouncilRoleUseCase(councilRoleRepository),
    new FindCouncilRoleByUuidUseCase(councilRoleRepository),
    new CreateCouncilRoleUseCase(councilRoleRepository)
);

const validator = new CouncilRoleValidator();

export const councilRoleRouter = Router();

councilRoleRouter.get("/", controller.findAll.bind(controller));
councilRoleRouter.get("/:uuid", validator.validateUuidParam.bind(validator), controller.findByUuid.bind(controller));
councilRoleRouter.post("/", validator.validateCreate.bind(validator), controller.create.bind(controller));
