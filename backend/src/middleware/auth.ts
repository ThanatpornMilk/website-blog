import { Request, Response, NextFunction } from "express";

// Middleware: ตรวจสอบว่า Admin ล็อกอินอยู่หรือเปล่า
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.adminId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
