import type { ApiResponse } from "@amalgam/shared";
import type { Request, Response } from "express";
import db from "@/lib/db.js";

export async function healthCheck(_req: Request, res: Response) {
  let ok: boolean;

  try {
    await db.$queryRaw`SELECT 1`;
    ok = true;
  } catch (_err) {
    ok = false;
  }

  res.status(200).json({
    data: {
      ok,
      now: Date.now(),
    },
  } satisfies ApiResponse<{
    ok: boolean;
    now: number;
  }>);
}
