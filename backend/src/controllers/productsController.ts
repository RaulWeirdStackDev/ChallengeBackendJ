import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.productos.findMany({
      orderBy: { id: 'asc' }
    });
    res.status(200).json(productos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const product = await prisma.productos.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    const nuevoProducto = await prisma.productos.create({
      data: { nombre, descripcion, precio, stock }
    });

    res.status(201).json({ message: "Producto creado", producto: nuevoProducto });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const updatedProduct = await prisma.productos.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, precio, stock },
    });

    res.status(200).json({ message: "Producto actualizado", producto: updatedProduct });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const deletedProduct = await prisma.productos.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Producto eliminado", producto: deletedProduct });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error desconocido" });
    }
  }
};
