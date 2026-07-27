import type { HeadquarterModel } from "../model/headquarter.model.js";


export interface HeadquarterRepository{
    findAll(): Promise<HeadquarterModel[] | []>; 
    findByUuid(uuid: string): Promise<HeadquarterModel | null>;
    create(data: Omit<HeadquarterModel, "uuid">): Promise<HeadquarterModel>;
}