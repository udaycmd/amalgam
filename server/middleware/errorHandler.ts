import type { ApiResponse } from "@amalgam/shared";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _nxt: NextFunction,
) => {
  console.error({ error: err });
  res.status(500).send({
    error: { code: 500, details: "Internal Server Error" },
  } satisfies ApiResponse<undefined>);
};
