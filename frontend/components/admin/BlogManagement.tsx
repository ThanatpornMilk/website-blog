/**
 * Blog Management
 * Dashboard for listing and managing blog posts.
 */
"use client";

import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { DataTable, Button, Badge } from "@/components/ui";
import { Eye, CheckCircle, XCircle, Pencil } from "lucide-react";
import { adminClient } from "@/lib/api/admin-client";
import { ColumnDef } from "@tanstack/react-table";
import BlogEditView from "./BlogEditView";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = async () => {
    // [API Call] ดึงข้อมูลบทความ
    try {
      const data = await adminClient.getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบทความ:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = async (id: string, current: boolean) => {
    // [API Call] สลับสถานะ Published/Unpublished ผ่าน API
    try {
      await adminClient.toggleBlog(id, !current);
      const data = await adminClient.getBlogs();
      setBlogs(data);
    } catch (err) {
      alert("ไม่สามารถเปลี่ยนสถานะได้: " + err);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "ชื่อบทความ",
      accessorKey: "title",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="py-1">
            <p className="font-bold text-stone-900">{blog.title}</p>
          </div>
        );
      },
    },
    {
      header: "ยอดเข้าชม",
      accessorKey: "views",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex items-center gap-2 text-stone-600 font-bold">
            <Eye size={16} className="text-stone-300" />
            {blog.views.toLocaleString()}
          </div>
        );
      },
    },
    {
      header: "สถานะ",
      accessorKey: "published",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggle(blog.id, blog.published)}
            className="h-auto p-0 hover:bg-transparent border-none shadow-none"
          >
            <Badge
              variant={blog.published ? "success" : "secondary"}
              className="cursor-pointer hover:scale-105 transition-transform font-bold py-1.5 px-3"
            >
              {blog.published ? (
                <CheckCircle size={10} className="mr-1" />
              ) : (
                <XCircle size={10} className="mr-1" />
              )}
              {blog.published ? "เผยแพร่แล้ว" : "ยังไม่เผยแพร่"}
            </Badge>
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">จัดการ</div>,
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-lg hover:bg-orange-50 hover:text-orange-500 border-none"
              onClick={() => setEditingId(blog.id)}
            >
              <Pencil size={18} className="text-stone-400" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (editingId) {
    return (
      <BlogEditView
        blogId={editingId}
        onBack={() => setEditingId(null)}
        onSave={() => {
          setEditingId(null);
          loadData();
        }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader
        title="จัดการบทความ"
        description="รายการบทความทั้งหมดที่คุณดูแล"
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={blogs}
          emptyMessage="ยังไม่มีบทความในระบบ"
        />
      )}
    </div>
  );
}
