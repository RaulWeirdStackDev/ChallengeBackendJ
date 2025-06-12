import { Router } from "express";
import {
  loginController,
  registerController,
  getUsersController,
  getUsersByIdController,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints relacionados con autenticación y usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: claveSegura123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
authRouter.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: claveSegura123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso (devuelve JWT)
 *       401:
 *         description: Credenciales inválidas
 */
authRouter.post("/login", loginController);

/**
 * @swagger
 * /api/auth/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios (requiere autenticación)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 */
authRouter.get("/usuarios", authMiddleware, getUsersController);

/**
 * @swagger
 * /api/auth/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID (requiere autenticación)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *           example: 123
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */
authRouter.get("/usuarios/:id", authMiddleware, getUsersByIdController);
