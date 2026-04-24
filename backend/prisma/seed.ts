import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Fix __dirname for tsx/ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import ข้อมูล Blog จาก JSON
import blogsData from "./seed-data/blogs.json";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Starting database seeding...");

    // 1. จัดการข้อมูล Admin
    const username = process.env.ADMIN_SEED_USERNAME;
    const password = process.env.ADMIN_SEED_PASSWORD;

    if (!username || !password) {
        throw new Error("Missing ADMIN_SEED_USERNAME or ADMIN_SEED_PASSWORD in .env");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.upsert({
        where: { username },
        update: { passwordHash },
        create: { username, passwordHash },
    });

    console.log(`Admin seeded: ${username}`);

    // 2. จัดการข้อมูล Blog
    console.log("Seeding blogs and content...");

    for (const blog of (blogsData as any[])) {
        let content = "";
        try {
            // อ่านเนื้อหาจากไฟล์ Markdown
            const contentPath = path.join(__dirname, "seed-data", blog.contentFile);
            console.log(`Reading: ${contentPath}`);
            content = fs.readFileSync(contentPath, "utf-8");
            if (!content.trim()) throw new Error("File is empty");
        } catch (error) {
            console.error(`Error reading content for ${blog.slug}:`, error);
            content = "Content coming soon...";
        }

        // สร้างรูปภาพประกอบ
        const imageRecords = [];
        
        // เพิ่มรูปปก
        if (blog.coverImage) {
            imageRecords.push({ url: blog.coverImage, isCover: true });
        }

        // เพิ่มรูปประกอบอื่นๆ (ถ้ามี)
        if (blog.images && blog.images.length > 0) {
            blog.images.forEach((imgUrl: string) => {
                imageRecords.push({ url: imgUrl, isCover: false });
            });
        }

        // จัดการคอมเมนต์ (ถ้ามีใน JSON)
        const commentRecords = blog.comments || [];

        // บันทึกลง Database (ใช้ upsert เพื่อป้องกันข้อมูลซ้ำ)
        await prisma.blog.upsert({
            where: { slug: blog.slug },
            update: {
                title: blog.title,
                excerpt: blog.excerpt,
                content: content,
                published: blog.published,
                views: blog.views || 0,
                createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
                // ล้างรูปภาพและคอมเมนต์เก่าแล้วใส่ใหม่เพื่อให้ตรงตาม JSON ล่าสุด
                images: {
                    deleteMany: {},
                    create: imageRecords,
                },
                comments: {
                    deleteMany: {},
                    create: commentRecords.map((c: any) => ({
                        author: c.author,
                        message: c.message,
                        status: c.approved ? "APPROVED" : "PENDING",
                        createdAt: c.createdAt ? new Date(c.createdAt) : new Date()
                    })),
                }
            },
            create: {
                title: blog.title,
                slug: blog.slug,
                excerpt: blog.excerpt,
                content: content,
                published: blog.published,
                views: blog.views || 0,
                createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
                adminId: admin.id,
                images: {
                    create: imageRecords,
                },
                comments: {
                    create: commentRecords.map((c: any) => ({
                        author: c.author,
                        message: c.message,
                        status: c.approved ? "APPROVED" : "PENDING",
                        createdAt: c.createdAt ? new Date(c.createdAt) : new Date()
                    })),
                }
            },
        });

        console.log(`Blog seeded: ${blog.slug} (Views: ${blog.views}, Comments: ${commentRecords.length})`);
    }

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error("Seeding failed:", e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });