import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

type ValidateTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodSchema, target: ValidateTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    // .parse() throws ZodError — caught by errorMiddleware
    req[target] = schema.parse(req[target]);
    next();
  };
