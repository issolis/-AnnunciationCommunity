import express from "express";
import { headquarterRouter } from "./modules/headquearter/presentation/headquarter.routes.js";
import { councilRoleRouter } from "./modules/council-role/council-role/presentation/council-role.routes.js";
import { userRouter } from "./modules/user/presentation/user.routes.js";
import { authRouter } from "./modules/auth/presentation/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/headquarter", headquarterRouter);
app.use("/council-role", councilRoleRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(error);
    res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});