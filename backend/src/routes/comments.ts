import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../utils/asyncHandler";
import { z } from "zod";

const router = Router({ mergeParams: true });

// Validate ภาษาไทย ภาษาอังกฤษ ตัวเลข และสัญลักษณ์ทั่วไป
const ThaiNumRegex = /^[ก-๙a-zA-Z0-9\s.,!?_@()\-+=]*$/;

const CommentSchema = z.object({
    author: z
        .string()
        .min(1, "กรุณากรอกชื่อ")
        .max(100)
        .regex(ThaiNumRegex, "ชื่อต้องเป็นภาษาไทย ภาษาอังกฤษ ตัวเลข หรือสัญลักษณ์ทั่วไปเท่านั้น"),
    message: z
        .string()
        .min(1, "กรุณากรอกข้อความ")
        .max(1000)
        .regex(ThaiNumRegex, "ข้อความต้องเป็นภาษาไทย ภาษาอังกฤษ ตัวเลข หรือสัญลักษณ์ทั่วไปเท่านั้น"),
});

// POST /api/blogs/:slug/comments — ส่ง Comment
router.post("/", asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    // 1. เช็คว่าชื่อและข้อความเป็นไปตามกฎ (ไทย+ตัวเลข) 
    const result = CommentSchema.safeParse(req.body);
    if (!result.success) {
        // ดึงเฉพาะข้อความ error มาต่อกันเป็น string เดียวแล้วส่งกลับ
        const errorMsg = Object.values(result.error.flatten().fieldErrors).flat().join(", ");
        return res.status(400).json({ error: errorMsg });
    }

    // 2. ตรวจสอบให้แน่ใจว่า slug เป็น string
    const blogSlug = Array.isArray(slug) ? slug[0] : slug;

    // 3. เช็คว่าบทความที่คอมเมนต์มีอยู่จริงในฐานข้อมูลไหม
    const blog = await prisma.blog.findUnique({
        where: { slug: blogSlug },
    });

    if (!blog) {
        return res.status(404).json({ error: "ไม่พบบทความที่คุณต้องการแสดงความเห็น" });
    }

    // 3. สร้างคอมเมนต์ใหม่ในฐานข้อมูล
    const comment = await prisma.comment.create({
        data: {
            author: result.data.author,
            message: result.data.message,
            blogId: blog.id,
        },
    });

    // 4. ส่งข้อความยืนยัน
    res.status(201).json({
        message: "ส่งความคิดเห็นสำเร็จแล้ว และกำลังรอการตรวจสอบจากแอดมิน",
        data: comment,
    });
}));

export default router;
