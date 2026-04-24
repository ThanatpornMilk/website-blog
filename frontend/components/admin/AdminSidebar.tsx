/**
 * Admin Sidebar
 * Side navigation menu for the admin dashboard.
 */
"use client";

import { FileText, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  onLogout: () => void;
}

const menuItems = [
  {
    href: "/admin/blogs",
    label: "จัดการบทความ",
    icon: FileText,
    pattern: /^\/admin\/blogs/,
  },
  {
    href: "/admin/comments",
    label: "จัดการความคิดเห็น",
    icon: MessageSquare,
    pattern: /^\/admin\/comments/,
  },
];

export default function AdminSidebar({ onLogout }: Readonly<AdminSidebarProps>) {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white text-stone-900 flex flex-col shrink-0 h-screen sticky top-0 border-r border-stone-200 shadow-sm">
      <div className="p-10">
        <h2 className="text-2xl font-black tracking-tighter text-orange-500 uppercase leading-none">
          Pet Admin
        </h2>
        <p className="text-[10px] text-stone-400 font-bold tracking-[0.2em] mt-2">
          ระบบจัดการข้อมูล
        </p>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-sm",
              item.pattern.test(pathname)
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 translate-x-1"
                : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
            )}
          >
            <item.icon size={20} className={cn(
              item.pattern.test(pathname) ? "text-white" : "text-stone-400"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-stone-100">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start gap-4 h-auto py-4 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm border-none shadow-none"
        >
          <LogOut size={20} /> ออกจากระบบ
        </Button>
      </div>
    </aside>
  );
}
