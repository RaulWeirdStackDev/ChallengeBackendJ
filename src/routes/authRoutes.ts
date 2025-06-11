import { Router } from "express";
import { loginController, registerController, getUsersController, getUsersByIdController } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/usuarios", authMiddleware, getUsersController); 
authRouter.get("/usuarios/:id", authMiddleware, getUsersByIdController);