import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * GET /api/blogs
 * หน้าที่: ดึงรายการบทความทัั้งหมดมาโชว์ที่หน้าแรก (รองรับการค้นหาและการแบ่งหน้า)
 */
router.get("/", asyncHandler(async (req: Request, res: Response) => {
    // ดึงค่าเลขหน้า (ถ้าไม่มีให้เป็นหน้า 1)
    const page = Math.max(1, Number.parseInt(req.query.page as string) || 1);
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string)?.trim() || "";

    // เงื่อนไข: ต้องเป็นบทความที่ "เผยแพร่แล้ว" เท่านั้น
    const where = {
        published: true,
        ...(search && {
            title: { contains: search, mode: "insensitive" as const },
        }),
    };

    // ดึงข้อมูลบล็อกและนับจำนวนทัั้งหมดพร้อมกัน 
    const [blogs, total] = await Promise.all([
        prisma.blog.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                slug: true,
                title: true,
                excerpt: true,
                authorName: true,
                views: true,
                createdAt: true,
                images: {
                    where: { isCover: true },
                    select: { url: true },
                    take: 1,
                },
            },
        }),
        prisma.blog.count({ where }),
    ]);

    res.json({
        data: blogs,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}));

/**
 * GET /api/blogs/:slug
 * หน้าที่: ดึงรายละเอียดบทความหนึ่งเรื่องมาแสดง 
 */
router.get("/:slug", asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
        where: { slug: slug as string },
        include: {
            images: {
                orderBy: [{ isCover: "desc" }, { createdAt: "asc" }],
            },
            comments: {
                // ดึงเฉพาะคอมเมนต์ที่ผ่านการอนุมัติแล้ว
                where: { status: "APPROVED" },
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    author: true,
                    message: true,
                    createdAt: true,
                },
            },
        },
    });

    // ถ้าไม่เจอหรือยังไม่เผยแพร่ ให้แจ้งว่าไม่พบข้อมูล
    if (!blog?.published) {
        res.status(404).json({ error: "ไม่พบบทความนี้ในระบบ" });
        return;
    }

    // อัปเดตยอดเข้าชม 
    prisma.blog.update({
        where: { slug: slug as string },
        data: { views: { increment: 1 } },
    }).catch(err => console.error("ไม่สามารถอัปเดตยอดเข้าชมได้:", err));

    res.json(blog);
}));

export default router;
