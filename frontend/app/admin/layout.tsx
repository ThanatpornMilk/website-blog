/**
 * Admin Layout (Auth Guard)
 * Verify permissions and authenticate the session before allowing access to any Admin routes.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiFetch } from "@/lib/api";
import AdminLayoutView from "@/components/admin/AdminLayoutView";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  /**
   * ระบบตรวจสอบสิทธิ์ (Auth Check)
   * ทำงานทุกครั้งที่เปลี่ยนหน้าในโซน /admin
   */
  useEffect(() => {
    // ถ้าอยู่ที่หน้า Login ไม่ต้องเช็คสิทธิ์ซ้ำ (ป้องกัน Loop)
    if (pathname === "/admin/login") {
      setIsAdmin(true);
      return;
    }

    const checkAuth = async () => {
      try {
        // เรียก API ที่ต้องใช้สิทธิ์แอดมิน ถ้าผ่านแสดงว่าล็อคอินอยู่
        await apiFetch("/admin/me");
        setIsAdmin(true);
      } catch {
        // ถ้า API ตอบกลับว่า 401 (ไม่มีสิทธิ์) ให้ดีดไปหน้า Login ทันที
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [pathname, router]);

  // ฟังก์ชันออกจากระบบ: ทำลาย Session ที่ Backend และล้างหน้าบ้าน
  const handleLogout = async () => {
    try {
      await apiFetch("/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการออกจากระบบ:", err);
    }
  };

  // ระหว่างที่ระบบกำลังเช็คสิทธิ์ (isAdmin ยังเป็น null) ให้โชว์หน้าโหลดก่อน
  if (isAdmin === null && pathname !== "/admin/login") {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-stone-50">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <AdminLayoutView onLogout={handleLogout}>
      {children}
    </AdminLayoutView>
  );
}