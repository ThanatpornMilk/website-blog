import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../utils/asyncHandler";
import { z } from "zod";

const router = Router();

/**
 * ─── AUTHENTICATION ROUTES (No Admin Required) ───────────────────────────
 */

// POST /api/admin/login: ตรวจสอบรหัสผ่านจาก .env และสร้าง Session
router.post("/login", asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // ตรวจสอบกับค่าที่ตั้งไว้ในไฟล์ .env
    if (username === process.env.ADMIN_SEED_USERNAME && password === process.env.ADMIN_SEED_PASSWORD) {
        req.session.admin = true; // บันทึกสถานะแอดมินลงใน Session
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
}));

/**
 * ─── MIDDLEWARE: ADMIN GUARD ──────────────────────────────────────────────
 * ถ้าไม่มี Session แอดมิน จะเตะออก
 */
const requireAdmin = (req: Request, res: Response, next: any) => {
    if (req.session.admin) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// ใช้ตรวจกับทุก Route ที่อยู่หลังจากนี้
router.use(requireAdmin);

/**
 * ─── PROTECTED ROUTES (Admin Required) ────────────────────────────────────
 */

// ตรวจสอบสถานะตัวเอง (ใช้ในหน้า Admin Layout เพื่อเช็คว่ายังล็อคอินอยู่ไหม)
router.get("/me", (req, res) => res.json({ authenticated: true }));

// ทำลาย Session เพื่อออกจากระบบ
router.post("/logout", (req, res) => {
    req.session.destroy(() => res.json({ message: "Logged out" }));
});

// ─── BLOG MANAGEMENT ─────────────────────────────────────────────────────

// GET /api/admin/blogs ดึงรายการบล็อกทัั้งหมด (เฉพาะที่ต้องใช้)
router.get("/blogs", asyncHandler(async (req: Request, res: Response) => {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            slug: true,
            title: true,
            authorName: true,
            published: true,
            views: true,
            createdAt: true,
            _count: { select: { comments: true } },
        },
    });
    res.json(blogs);
}));

// GET /api/admin/blogs/:id ดึงข้อมูลบทความรายอันเพื่อนำไปใส่ในฟอร์มแก้ไข
router.get("/blogs/:id", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await prisma.blog.findFirst({
        where: { OR: [{ id: id as string }, { slug: id as string }] },
        include: { images: true },
    });
    if (!blog) return res.status(404).json({ error: "ไม่พบข้อมูลบทความ" });
    res.json(blog);
}));

// บันทึกการแก้ไขบทความ (ใช้ Zod ตรวจสอบความถูกต้องของข้อมูลก่อนลง DB)
const updateBlogSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    images: z.array(z.object({
        url: z.string(),
        isCover: z.boolean()
    })).optional(),
});

router.patch("/blogs/:id", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = updateBlogSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error.flatten() });

    const { images, ...data } = result.data;

    const blog = await prisma.blog.update({
        where: { id: id as string },
        data: {
            ...data,
            // ถ้ามีการส่งรูปมาใหม่ ให้ลบของเก่าแล้วสร้างใหม่ทัั้งหมด 
            ...(images && {
                images: {
                    deleteMany: {},
                    create: images
                }
            })
        },
    });
    res.json(blog);
}));

// ─── COMMENT MANAGEMENT ──────────────────────────────────────────────────

// GET /api/admin/comments ดึงรายการคอมเมนต์พร้อมข้อมูลบทความที่เกี่ยวข้อง
router.get("/comments", asyncHandler(async (req: Request, res: Response) => {
    const comments = await prisma.comment.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        include: { blog: { select: { title: true, slug: true } } },
    });
    res.json(comments);
}));

// PATCH /api/admin/comments/:id อัปเดตสถานะของคอมเมนต์
router.patch("/comments/:id", asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const comment = await prisma.comment.update({
        where: { id: id as string },
        data: { status },
    });
    res.json(comment);
}));

export default router;
