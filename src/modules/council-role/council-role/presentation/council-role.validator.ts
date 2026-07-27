import type { Request, Response, NextFunction } from "express";

export class CouncilRoleValidator {
    validateCreate(req: Request, res: Response, next: NextFunction): void {
        try {
            const { role } = req.body;

            if (typeof role !== "string" || !role.trim()) throw new Error("role is required and must be a non-empty string");

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
