import { Request, Response } from "express";
import prisma from "../db";

// TODO: get all products
export const getProducts = async (
  req: Request,
  res: Response
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Product: true,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ data: user.Product });
};

// TODO: get single product

export const getOneProduct = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongToId: req.user.id,
    },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({
    data: product,
  });
};

// TODO: create a product

export const createProduct = async (
  req: Request,
  res: Response
) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongToId: req.user.id,
    },
  });

  if (!product) {
    res.status(404).json({ message: "Failed to create the product" });
    return;
  }
  res.json({
    data: product,
  });
};

//TODO: update a product

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  const update = await prisma.product.update({
    where: {
      id,
      belongToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });

  if (!update) {
    res.status(404).json({ message: "Failed to update the product" });
    return;
  }
  res.json({
    data: update,
  });
};

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  const remove = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongToId: req.user.id,
    },
  });
  if (!remove) {
    res.status(404).json({ message: "Failed to update the product" });
    return;
  }
  res.json({
    data: remove,
  });
};
