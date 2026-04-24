/**
 * Comment Form
 * Submission form for new blog comments.
 */
"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Input, Textarea, Button, Label } from "@/components/ui";

export default function CommentForm({ slug }: Readonly<{ slug: string }>) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      await apiFetch(`/blogs/${slug}/comments`, {
        method: "POST",
        body: JSON.stringify({ author, message }),
      });

      setStatus("success");
      setAuthor("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "เกิดข้อผิดพลาดในการส่งความเห็น");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f9f8f6] rounded-[2.5rem] p-8 md:p-10 border border-stone-200/60 shadow-sm mt-8">
      <h3 className="text-xl font-black text-stone-800 mb-8 tracking-tight">
        ร่วมแสดงความคิดเห็น
      </h3>

      {status === "success" && (
        <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={20} />
          <p className="text-sm font-medium">ส่งความคิดเห็นเรียบร้อยแล้ว! กรุณารอแอดมินตรวจสอบครับ</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="author" className="text-stone-800 font-bold">
            ชื่อผู้ส่ง <span className="text-red-500">*</span>
          </Label>
          <Input
            id="author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isSubmitting}
            placeholder="ชื่อของคุณ"
            className="bg-white border-stone-200 focus-visible:ring-orange-500/10"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="message" className="text-stone-800 font-bold">
            ความคิดเห็น <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            placeholder="แชร์ความคิดเห็นของคุณ..."
            className="bg-white border-stone-200 focus-visible:ring-orange-500/10 h-32"
          />
        </div>

        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-stone-400 font-medium order-2 md:order-1">
            ความคิดเห็นจะแสดงหลังแอดมินตรวจสอบ
          </p>

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="order-1 md:order-2 px-10 h-12 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-orange-500/20"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "ส่งความคิดเห็น"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
