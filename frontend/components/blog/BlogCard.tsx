/**
 * Blog Card
 * Component for displaying blog post previews.
 */
import Link from "next/link";
import Image from "next/image";
import { Eye, Calendar } from "lucide-react";
import { formatThaiDate } from "@/lib/utils";

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  views: number;
  createdAt: string;
  images: { url: string }[];
}

export default function BlogCard({ blog }: Readonly<{ blog: BlogCardProps }>) {
  const formattedDate = formatThaiDate(blog.createdAt);

  const coverImage = blog.images?.[0]?.url || "/images/placeholder.jpg";

  return (
    <Link 
      href={`/${blog.slug}`} 
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="aspect-[21/9] relative overflow-hidden">
        <Image
          src={coverImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <h3 className="text-xl font-bold text-stone-800 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {blog.title}
        </h3>
        <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
          {blog.excerpt}
        </p>
        <div className="pt-4 mt-auto flex items-center justify-between text-xs text-stone-400 font-medium border-t border-stone-50">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-orange-400" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1.5">
            <Eye size={14} className="text-orange-400" />
            {blog.views.toLocaleString()} ครั้ง
          </div>
        </div>
      </div>
    </Link>
  );
}
