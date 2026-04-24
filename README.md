# Pet Friendly Blog 🐾

เว็บไซต์บล็อกสำหรับคนรักสัตว์เลี้ยง รองรับการจัดการบทความและความคิดเห็นผ่านระบบ Admin

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | Express.js, TypeScript, Prisma ORM |
| **Database** | PostgreSQL |
| **Container** | Docker, Docker Compose |

---

## การติดตั้งและรันโปรเจกต์

### วิธีที่ 1: Docker 

> ต้องติดตั้ง [Docker Desktop](https://www.docker.com/products/docker-desktop/) ก่อน

```bash
# 1. Clone โปรเจกต์
git clone <repository-url>
cd website-blog

# 2. รันทุก Service (Database + Backend + Frontend)
docker compose up --build

# 3. (ครั้งแรกเท่านั้น) เปิด Terminal ใหม่แล้วรัน
docker compose exec backend npx prisma migrate deploy
docker compose exec backend pnpm prisma db seed
```

เข้าใช้งานได้ที่:
- **หน้าเว็บ**: http://localhost:3000
- **API**: http://localhost:8080

---

### 💻 วิธีที่ 2: Manual (ต้องมี Node.js และ PostgreSQL)

**สิ่งที่ต้องติดตั้ง:**
- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [PostgreSQL](https://www.postgresql.org/) v16+

#### ขั้นตอน:

**1. Clone และติดตั้ง Dependencies**
```bash
git clone <repository-url>
cd website-blog
```

**2. ตั้งค่า Backend**
```bash
cd backend
cp .env.example .env
# แก้ไข .env ให้ DATABASE_URL ชี้ไปยัง PostgreSQL 
pnpm install
npx prisma migrate deploy
pnpm prisma db seed
pnpm dev
```

**3. ตั้งค่า Frontend**
```bash
cd frontend
cp .env.local.example .env.local
pnpm install
pnpm dev
```

เข้าใช้งานได้ที่:
- **หน้าเว็บ**: http://localhost:3000
- **API**: http://localhost:8080

---

## Environment Variables

### Backend (`backend/.env`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `DATABASE_URL` | - | Connection string ของ PostgreSQL |
| `PORT` | `8080` | Port ของ Backend Server |
| `CORS_ORIGIN` | `http://localhost:3000` | URL ของ Frontend |
| `SESSION_SECRET` | - | Secret key สำหรับ Session |
| `ADMIN_SEED_USERNAME` | `admin` | Username สำหรับ Admin |
| `ADMIN_SEED_PASSWORD` | `admin1234` | Password สำหรับ Admin |

### Frontend (`frontend/.env.local`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api` | URL ของ Backend API |

---

## โครงสร้างโปรเจกต์

```
website-blog/
├── backend/                  # Express.js API Server
│   ├── prisma/
│   │   ├── schema.prisma     # Database Schema
│   │   ├── seed.ts           # Script สำหรับใส่ข้อมูลตัวอย่าง
│   │   └── seed-data/        # ข้อมูล JSON และไฟล์ Markdown
│   ├── src/
│   │   ├── routes/           # API Routes (blogs, admin, comments)
│   │   ├── middleware/       # Auth, Error Handler
│   │   └── index.ts          # Entry Point
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                 # Next.js Application
│   ├── app/                  # App Router Pages
│   ├── components/
│   │   ├── admin/            # Admin Panel Components
│   │   ├── blog/             # Blog Display Components
│   │   ├── home/             # Home Page Components
│   │   └── ui/               # Shared UI Components
│   ├── lib/
│   │   └── api/              # API Client Functions
│   ├── public/               # Static Files (images, SVGs)
│   ├── Dockerfile
│   └── .env.local.example
│
├── docker-compose.yml        # Full Stack Docker Configuration
└── README.md
```

---

## Admin Panel

เข้าใช้งาน Admin ได้ที่ http://localhost:3000/admin

| ข้อมูล | ค่า |
|---|---|
| **Username** | `admin` |
| **Password** | `admin1234` |