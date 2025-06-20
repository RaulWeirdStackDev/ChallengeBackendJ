import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { RequestHandler } from 'express';

// 1. Define el tipo del payload esperado en el token
interface JwtPayload {
  email: string;
  // Agrega más propiedades aquí si tu token las tiene
}

// 2. Extiende la interfaz Request para incluir 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

// 3. Middleware con tipado correcto
export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;

    next(); // Continua si todo está OK
  } catch (error) {
    console.error('ERROR_JWT =>', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
