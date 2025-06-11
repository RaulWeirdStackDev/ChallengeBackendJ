import bcrypt from "bcryptjs";
import { PrismaClient } from '../generated/prisma/client';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'; 
const prisma = new PrismaClient();


export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

  
    if ( !email || !password) {
      res.status(400).json({ error: "Todos los campos son obligatorios" });
      return;
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    
    const nuevoUsuario = await prisma.usuarios.create({
      data: {        
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Se requiere email y contraseña" });
      return;
    }

    const user = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: "Login exitoso", token, user: userWithoutPassword });

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const getUsersController = async (req: Request, res: Response) => {
  try {
    const usuario = await prisma.usuarios.findMany({
      orderBy: { id: 'asc' }
    });
    res.status(200).json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};