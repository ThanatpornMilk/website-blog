import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * ─── DATABASE CONNECTION CONFIGURATION ───────────────────────────────────
 * ใช้ pg pool ร่วมกับ Prisma เพื่อให้จัดการการเชื่อมต่อได้ดีขึ้น
 */

// สร้าง Connection Pool ไปยังฐานข้อมูล PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ใช้ Adapter เชื่อมต่อ Prisma เข้ากับ Pool
const adapter = new PrismaPg(pool);

// สร้าง Prisma Client ตัวเดียวทัั้งแอป 
export const prisma = new PrismaClient({ adapter });
