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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints relacionados con productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
productsRouter.get("/products", getProductsController);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
productsRouter.get("/products/:id", getProductByIdController);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Zapatos deportivos
 *               precio:
 *                 type: number
 *                 example: 39990
 *     responses:
 *       201:
 *         description: Producto creado
 *       401:
 *         description: No autorizado
 */
productsRouter.post("/products", authMiddleware, createProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
productsRouter.put("/products/:id", authMiddleware, updateProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
productsRouter.delete("/products/:id", authMiddleware, deleteProductController);
