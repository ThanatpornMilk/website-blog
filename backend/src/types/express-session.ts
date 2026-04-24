import "express-session";

declare module "express-session" {
  interface SessionData {
    // ระบุว่าใน Session สามารถเก็บค่า admin (เป็น true/false) ได้
    admin?: boolean;

    // ระบุว่าสามารถเก็บ ID ของแอดมินที่ล็อคอินอยู่ได้
    adminId?: string;
  }
}
