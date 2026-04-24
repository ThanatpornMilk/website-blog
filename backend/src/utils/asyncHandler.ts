/**
 * ฟังก์ชันช่วยจัดการ Async Error 
 * ไม่ต้องเขียน try-catch ซ้ำ ๆ ในทุก Route
 */

import { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
