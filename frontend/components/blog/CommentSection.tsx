/**
 * Comment Section
 * Displays comments and the submission form.
 */
import { MessageSquareText } from "lucide-react";
import CommentForm from "./CommentForm";
import { formatThaiDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CommentSectionProps {
  slug: string;
  comments: any[];
}

export default function CommentSection({
  slug,
  comments,
}: Readonly<CommentSectionProps>) {
  return (
    <section className="mt-20 pt-12 border-t border-stone-100">
      {/* หัวข้อ "คอมเมนต์" */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-500/10 p-2 rounded-xl">
          <MessageSquareText
            size={28}
            className="text-orange-500"
          />
        </div>
        <h3 className="text-3xl font-black text-stone-800 tracking-tight">
          ความคิดเห็น
        </h3>
      </div>

      {/* ฟอร์มแสดงความคิดเห็น */}
      <CommentForm slug={slug} />

      {/* รายการคอมเมนต์ (ลดระยะห่างและใช้ UI Components) */}
      <div className="mt-12 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-stone-400 text-sm font-bold uppercase tracking-widest">
            ความคิดเห็นทัั้งหมด ({comments?.length || 0})
          </h4>
        </div>

        {comments && comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="pb-6 border-b border-stone-50 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black shadow-sm">
                      {comment.author[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 leading-none mb-1">{comment.author}</h4>
                      <Badge variant="secondary" className="bg-stone-50 text-stone-400 border-none font-medium text-[10px] py-0 px-2 h-5">
                        {formatThaiDate(comment.createdAt, true)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-stone-600 leading-relaxed pl-13 text-sm md:text-base">
                  {comment.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-stone-400 text-center py-12 bg-stone-50/50 rounded-[2.5rem] border border-dashed border-stone-200">
            ยังไม่มีใครแสดงความคิดเห็น เป็นคนแรกที่เริ่มพูดคุยสิ!
          </p>
        )}
      </div>
    </section>
  );
}
