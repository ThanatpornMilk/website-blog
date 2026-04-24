/**
 * Global Error Handler 
 * รวบรวมการจัดการ Error ทั้งหมดของโปรเจกต์ไว้ที่เดียว
 */

import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Centralized Error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
