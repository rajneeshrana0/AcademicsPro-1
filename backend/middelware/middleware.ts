import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    const decode = jwt.verify(
      header as string,
      process.env.JWT_SECRET as string
    );
    // req.userId = decode.id;

    if (decode) {
      //@ts-ignore

      req.userId = decode.id;

      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
        data: req.body,
      });
    }

   
  } catch {
    res.status(400).json({
      message: "Internal Server Error",
      data: req.body,
    });
  }
};
