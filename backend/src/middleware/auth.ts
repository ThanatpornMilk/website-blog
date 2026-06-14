import { Request, Response, NextFunction } from "express";

// Middleware: ตรวจสอบว่า Admin ล็อกอินอยู่หรือเปล่า
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.admin) {
        // ถ้าไม่มีสถานะ admin ใน Session ให้หยุดการทำงานตรงนี้ (ส่ง 401 กลับไป)
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    // ถ้ามีสถานะ admin แสดงว่าล็อกอินแล้ว ให้ทำงานต่อ
    next();
}
