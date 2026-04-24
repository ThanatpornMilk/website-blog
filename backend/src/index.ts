import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

import blogsRouter from "./routes/blogs";
import commentsRouter from "./routes/comments";
import adminRouter from "./routes/admin";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * ─── MIDDLEWARE CONFIGURATION ───────────────────────────────────────────
 */

// ตั้งค่า CORS: อนุญาตให้ Frontend (localhost:3000) ส่งข้อมูลและ Cookie มาหาได้
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));

app.use(express.json()); // รองรับการรับข้อมูลแบบ JSON
app.use(cookieParser()); // รองรับการอ่านข้อมูลจาก Cookie

// ตั้งค่า Session: เก็บข้อมูลการล็อคอินไว้ใน Server (ชั่วคราว)
app.use(session({
    secret: process.env.SESSION_SECRET || "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // อายุ 1 วัน
    },
}));

/**
 * ─── ROUTE DEFINITIONS ──────────────────────────────────────────────────
 */

app.use("/api/blogs", blogsRouter);                   // บทความ (ฝั่งหน้าเว็บ)
app.use("/api/blogs/:slug/comments", commentsRouter); // คอมเมนต์ (ฝั่งหน้าเว็บ)
app.use("/api/admin", adminRouter);                   // หลังบ้าน (ต้องล็อคอิน)

// Health check
app.get("/", (_req, res) => {
    res.json({ status: "ok", message: "Blog API is running" });
});

/**
 * ─── GLOBAL ERROR HANDLING ──────────────────────────────────────────────
 */
app.use(errorHandler); // ดักจับ Error ทัั้งหมดที่เกิดขึ้นในระบบ

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
