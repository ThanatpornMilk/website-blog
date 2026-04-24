/**
 * Blog Detail View
 * Main container for full blog post display.
 */
import ReactMarkdown from "react-markdown";
import BlogHeader from "./BlogHeader";
import BlogGallery from "./BlogGallery";
import CommentSection from "@/components/blog/CommentSection";

interface BlogDetailViewProps {
  blog: any;
  slug: string;
}

export default function BlogDetailView({ blog, slug }: Readonly<BlogDetailViewProps>) {
  return (
    <article className="flex-1 bg-white pb-20">
      {/* ส่วนหัวบทความ (Server Component) */}
      <BlogHeader blog={blog} />

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* เนื้อหาบทความ */}
        <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-800 prose-headings:font-black prose-p:text-stone-600 prose-img:rounded-[2rem] prose-img:shadow-xl">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* แกลเลอรี่รูปภาพ (Client Component - แยกเฉพาะจุดที่ต้อง Interactive) */}
        <BlogGallery images={blog.images} blogTitle={blog.title} />

        {/* ส่วนคอมเมนต์ */}
        <CommentSection slug={slug} comments={blog.comments} />
      </div>
    </article>
  );
}
