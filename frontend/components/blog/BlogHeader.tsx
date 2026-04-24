/**
 * Blog Header
 * Hero section for blog detail pages.
 */
import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import { formatThaiDate } from "@/lib/utils";

interface BlogHeaderProps {
  blog: any;
}

export default function BlogHeader({ blog }: BlogHeaderProps) {
  const formattedDate = formatThaiDate(blog.createdAt);
  const coverImage = blog.images?.find((img: any) => img.isCover)?.url || "/images/placeholder.jpg";

  return (
    <header className="relative h-[60vh] min-h-[400px] w-full bg-stone-100 overflow-hidden">
      <Image
        src={coverImage}
        alt={blog.title}
        fill
        sizes="100vw"
        className="object-cover scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      {/* ปุ่มกลับหน้าหลัก */}
      <div className="absolute top-0 left-0 w-full p-6 z-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-bold bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:bg-black/40"
          >
            <ArrowLeft size={16} /> กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>

      {/* ข้อมูลบทความ */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 shadow-sm">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
            <div className="flex items-center gap-2 font-medium">
              <Calendar size={16} className="text-orange-500 fill-orange-500" /> {formattedDate}
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Eye size={16} className="text-orange-500 fill-orange-500" /> {blog.views.toLocaleString()} ครั้ง
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
