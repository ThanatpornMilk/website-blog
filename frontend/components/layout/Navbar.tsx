/**
 * Navigation Bar
 * Global header for public and admin navigation.
 */
"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isAdminLayout?: boolean;
}

export default function Navbar({ isAdminLayout = false }: NavbarProps) {
  const pathname = usePathname();

  // ถ้าเป็น Global Navbar (ไม่ได้ระบุ isAdminLayout) ให้ซ่อนตัวเองเมื่ออยู่ในหน้าแอดมิน
  // ยกเว้นหน้า Login ที่ต้องมีให้กลับไปได้
  if (!isAdminLayout && pathname?.startsWith("/admin") && pathname !== "/admin/login") {
    return null;
  }

  return (
    <nav className={`border-b border-stone-200 bg-white sticky top-0 z-50 ${isAdminLayout ? "w-full" : ""}`}>
      <div className={`${isAdminLayout ? "px-8" : "max-w-[1400px] mx-auto px-6"} h-16 flex items-center justify-between`}>
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-stone-800">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg">
            <PawPrint size={20} />
          </div>
          Pet Friendly
          {isAdminLayout && (
            <span className="text-[10px] bg-stone-100 text-stone-400 px-2 py-0.5 rounded-full ml-1 font-bold uppercase tracking-widest">Admin</span>
          )}
        </Link>
        <div className="flex gap-6 font-medium text-stone-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">Blog</Link>
          {!isAdminLayout && <Link href="/admin/login" className="hover:text-orange-500 transition-colors">Admin</Link>}
        </div>
      </div>
    </nav>
  );
}
