/**
 * Blog Gallery
 * Interactive image lightbox for blog posts.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogGallery({ images, blogTitle }: { images: any[], blogTitle: string }) {
  const [index, setIndex] = useState<number | null>(null);

  // กรองเอารูปภาพทัั้งหมดที่ไม่ใช่รูปปก
  const allImages = images.filter(img => !img.isCover);
  
  // ถ้าไม่มีรูปเพิ่มเติมเลย ไม่ต้องแสดงอะไร
  if (allImages.length === 0) return null;

  // ฟังก์ชันกด "ถัดไป"
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === allImages.length - 1) {
      setIndex(0); // ถ้าถึงรูปสุดท้าย ให้กลับไปรูปแรก
    } else {
      setIndex(index! + 1); // ไปรูปถัดไป
    }
  };

  // ฟังก์ชันกด "ก่อนหน้า"
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === 0) {
      setIndex(allImages.length - 1); // ถ้าอยู่รูปแรก ให้ไปรูปสุดท้าย
    } else {
      setIndex(index! - 1); // ถอยหลัง
    }
  };

  return (
    <div className="mt-12 pt-12 border-t border-stone-100">
      <h3 className="text-xl font-bold text-stone-800 mb-6">รูปภาพประกอบ</h3>
      
      {/* ส่วนแสดงรูปภาพ 4 รูปในหน้าเว็บ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allImages.slice(0, 4).map((img, i) => {
          const isFourth = i === 3;
          const hasMore = allImages.length > 4;

          return (
            <div 
              key={i} 
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setIndex(i)}
            >
              <Image 
                src={img.url} 
                alt={blogTitle} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover group-hover:scale-105 transition" 
              />
              
              {/* ถ้าเป็นรูปที่ 4 และมีรูปเหลือ ให้โชว์เครื่องหมาย + */}
              {isFourth && hasMore && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">+{allImages.length - 3}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* หน้าต่างป๊อปอัปดูรูปเต็มจอ (Lightbox) */}
      {index !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIndex(null)}
        >
          {/* ปุ่มปิด */}
          <button className="absolute top-5 right-5 text-white" onClick={() => setIndex(null)}>
            <X size={30} />
          </button>

          {/* รูปภาพใหญ่ */}
          <div className="relative w-full h-[80vh] pointer-events-none">
            <Image 
              src={allImages[index].url} 
              alt="full" 
              fill 
              sizes="100vw"
              className="object-contain" 
            />
          </div>

          {/* ปุ่มลูกศร (ย้ายมาไว้หลังรูปและเพิ่ม z-10) */}
          <button className="absolute left-5 text-white/50 hover:text-white z-10 p-4" onClick={prev}>
            <ChevronLeft size={40} />
          </button>
          <button className="absolute right-5 text-white/50 hover:text-white z-10 p-4" onClick={next}>
            <ChevronRight size={40} />
          </button>
          
          {/* ตัวเลขบอกลำดับ */}
          <div className="absolute bottom-10 text-white/70">
            {index + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
