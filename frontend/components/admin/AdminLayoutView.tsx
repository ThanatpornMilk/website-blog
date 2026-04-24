/**
 * Admin Layout View
 * Main wrapper for admin pages with sidebar and content area.
 */
"use client";

import AdminSidebar from "./AdminSidebar";
import Navbar from "@/components/layout/Navbar";

interface AdminLayoutViewProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function AdminLayoutView({
  children,
  onLogout,
}: Readonly<AdminLayoutViewProps>) {
  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      {/* Sidebar */}
      <AdminSidebar onLogout={onLogout} />

      {/* ส่วนขวา: Navbar + Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* เรียกใช้คอมโพเนนต์ Navbar โดยส่ง isAdminLayout=true */}
        <Navbar isAdminLayout={true} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-stone-50/50">
          <div className="p-10 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
