import { Request, Response } from "express";
import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createUser = async (
  req: Request & {
    body: {
      username: string;
      email: string;
      password: string;
    };
  },
  res: Response
) => {
  const { username, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        asset: "",
        password: await hashPassword(password),
      },
    });

    const token = createJWT(user);
    res.status(201).json({ message: "User created successfully!", token });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signIn = async (
  req: Request & {
    body: {
      username: string;
      password: string;
    };
  },
  res: Response
) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const isValidUser = await comparePassword(password, user.password);

    if (!isValidUser) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    const token = createJWT(user);
    res.status(200).json({ message: "Login successful!", token });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
