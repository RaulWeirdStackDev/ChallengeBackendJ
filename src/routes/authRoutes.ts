import { Router } from "express";
import { loginController, registerController, getUsersController } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/usuarios", getUsersController); 