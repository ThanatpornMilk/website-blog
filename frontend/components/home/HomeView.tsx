/**
 * Home View
 * Main page container for the blog list.
 */
"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/home/Hero";
import BlogCard from "@/components/blog/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface HomeViewProps {
  blogs: any[];
  search: string;
  pagination: {
    total: number;
    totalPages: number;
  };
  currentPage: number;
}

export default function HomeView({ blogs, search, pagination, currentPage }: HomeViewProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // เปลี่ยนหน้า ให้เลื่อนหน้าจอมาที่หัวข้อบทความ
  useEffect(() => {
    // เลื่อนเฉพาะเมื่อมีการเปลี่ยนหน้าหรือค้นหา 
    if (currentPage > 1 || (search && blogs.length > 0)) {
      // หน่วงเวลาเล็กน้อยเพื่อให้ Next.js เคลียร์คิวการทำงานของตัวเองก่อน
      const timer = setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentPage, search, blogs.length]);

  return (
    <main className="flex-1 pb-20">
      <Hero initialSearch={search} />
      <section className="max-w-[1400px] mx-auto px-6 pt-12">
        <div className="flex items-end justify-between mb-8">
          <div ref={listRef} className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-stone-900 font-sarabun">บทความล่าสุด</h2>
            <p className="text-stone-500 mt-1">พบ {pagination.total} บทความ {search && `สำหรับการค้นหา "${search}"`}</p>
          </div>
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-stone-600">
            {blogs.map((blog: any) => <BlogCard key={blog.id} blog={blog} />)}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-stone-200 text-stone-400 font-medium">ไม่พบบทความที่คุณกำลังมองหา...</div>
        )}

        {pagination.totalPages > 1 && (
          <div className="mt-20">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {currentPage > 1 && (
                    <PaginationPrevious
                      href={`/?search=${search}&page=${currentPage - 1}`}
                      scroll={false}
                    />
                  )}
                </PaginationItem>

                {[...Array(pagination.totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/?search=${search}&page=${i + 1}`}
                      isActive={i + 1 === currentPage}
                      scroll={false}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  {currentPage < pagination.totalPages && (
                    <PaginationNext
                      href={`/?search=${search}&page=${currentPage + 1}`}
                      scroll={false}
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </main>
  );
}
