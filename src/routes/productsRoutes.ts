import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productsController";
import { authMiddleware } from "../middleware/auth.middleware";

export const productsRouter = Router();

productsRouter.get("/products", getProductsController);
productsRouter.get("/products/:id", getProductByIdController);
productsRouter.post("/products", authMiddleware, createProductController);
productsRouter.put("/products/:id", authMiddleware, updateProductController);
productsRouter.delete("/products/:id", authMiddleware, deleteProductController);
