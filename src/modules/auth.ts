import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const createJWT = (user: {
  id: string;
  username: string;
  email: string;
}) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  return token;
};

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user as User;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Not a Valid Token" });
    }
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
