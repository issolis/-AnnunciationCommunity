import type { Request, Response, NextFunction } from "express";

export class UserValidator {
    validateCreate(req: Request, res: Response, next: NextFunction): void {
        try {
            const { national_id, name, f_lastname, dob, headquarter_uuid } = req.body;

            if (typeof national_id !== "string" || !national_id.trim()) throw new Error("national_id is required and must be a non-empty string");
            if (typeof name !== "string" || !name.trim()) throw new Error("name is required and must be a non-empty string");
            if (typeof f_lastname !== "string" || !f_lastname.trim()) throw new Error("f_lastname is required and must be a non-empty string");
            if (typeof dob !== "string" || !dob.trim()) throw new Error("dob is required and must be a non-empty string");
            if (typeof headquarter_uuid !== "string" || !headquarter_uuid.trim()) throw new Error("headquarter_uuid is required and must be a non-empty string");

            next();
        } catch (error) {
            res.status(422).json({
                success: false,
                error: error instanceof Error ? error.message : "Invalid request"
            });
        }
    }

    validateUuidParam(req: Request, res: Response, next: NextFunction): void {
        try {
            const uuid = req.params.uuid as string;

            if (!uuid || !uuid.trim()) throw new Error("uuid cannot be empty");

            next();
        } catch (error) {
            res.status(422).json({
                success: false,
                error: error instanceof Error ? error.message : "Invalid request"
            });
        }
    }
}