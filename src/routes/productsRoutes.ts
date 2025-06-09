import { Router, Request, Response } from "express";
import { getProductsController, createProductController, getProductByIdController, deleteProductController, updateProductController } from "../controllers/productsController";

export const productsRouter = Router();

productsRouter.get("/products", getProductsController); 
productsRouter.get("/products/:id", getProductByIdController); 
productsRouter.post("/products", createProductController);
productsRouter.put("/products/:id", updateProductController);
productsRouter.delete("/products/:id", deleteProductController);