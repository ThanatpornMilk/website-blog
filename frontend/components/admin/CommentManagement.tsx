/**
 * Comment Management
 * Interface for moderating user comments.
 */
"use client";

import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { adminClient } from "@/lib/api/admin-client";
import { Button, Badge, DataTable } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Clock, XCircle, Check, X, Pencil } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "รออนุมัติ", color: "bg-orange-50 text-orange-600", icon: Clock },
  APPROVED: { label: "อนุมัติแล้ว", color: "bg-green-50 text-green-600", icon: CheckCircle2 },
  REJECTED: { label: "ไม่อนุมัติ", color: "bg-red-50 text-red-500", icon: XCircle },
};

export default function CommentManagement() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await adminClient.getComments();
      setComments(data);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSetStatus = async (id: string, status: string) => {
    try {
      await adminClient.updateComment(id, status);
      const data = await adminClient.getComments();
      setComments(data);
    } catch (err) {
      alert("ไม่สามารถเปลี่ยนสถานะได้: " + err);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "ผู้แสดงความเห็น",
      accessorKey: "author",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center font-black text-orange-600 text-sm shrink-0">
              {comment.author[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-stone-900">{comment.author}</p>
              <p className="text-[10px] text-stone-400 font-medium uppercase tracking-widest">
                {comment.blog.title}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      header: "ความคิดเห็น",
      accessorKey: "message",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <p className="text-stone-600 text-sm italic whitespace-normal max-w-sm leading-relaxed">
            "{comment.message}"
          </p>
        );
      },
    },
    {
      header: "สถานะ",
      accessorKey: "status",
      cell: ({ row }) => {
        const comment = row.original;
        const status = comment.status;
        const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
        const Icon = config.icon;

        return (
          <div className="flex items-center gap-2">
            <Badge className={`${config.color} border-none font-bold gap-1 shadow-none py-1.5 px-3`}>
              <Icon size={11} /> {config.label}
            </Badge>

            {status === "PENDING" ? (
              <div className="flex gap-1">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => handleSetStatus(comment.id, "APPROVED")}
                  className="h-8 w-8 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 border-none"
                >
                  <Check size={14} />
                </Button>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => handleSetStatus(comment.id, "REJECTED")}
                  className="h-8 w-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 border-none"
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => handleSetStatus(comment.id, "PENDING")}
                className="h-8 w-8 rounded-lg text-stone-300 hover:text-orange-500 hover:bg-orange-50 border-none"
              >
                <Pencil size={13} />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader
        title="จัดการความคิดเห็น"
        description="ตรวจสอบและอนุมัติข้อความจากผู้ใช้งาน"
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={comments}
          emptyMessage="ยังไม่มีความคิดเห็นในระบบ"
        />
      )}
    </div>
  );
}
