import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

type ValidateTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodSchema, target: ValidateTarget = "body") =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync(req[target]);

      // Express 'req.query' has only a getter, so we cannot reassign it directly.
      // Instead, we clear the existing keys and assign the parsed result in-place.
      for (const key of Object.keys(req[target])) {
        delete req[target][key];
      }
      Object.assign(req[target], parsed);

      next();
    } catch (err) {
      next(err);
    }
  };
