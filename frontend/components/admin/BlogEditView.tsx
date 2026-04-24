/**
 * Blog Edit View
 * Form for editing blog post details and content.
 */
"use client";

import { useState, useEffect } from "react";
import { adminClient } from "@/lib/api/admin-client";
import { Button, Input, Label, Textarea, Card, Tabs, TabsList, TabsTrigger } from "@/components/ui";
import AdminHeader from "./AdminHeader";
import { Save, ImageIcon, Info, Eye, PenLine } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface BlogEditViewProps {
  blogId: string;
  onBack: () => void;
  onSave: () => void;
}

export default function BlogEditView({ blogId, onBack, onSave }: Readonly<BlogEditViewProps>) {
  // สถานะโหลดข้อมูล และสถานะการบันทึก
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // สถานะแท็บปัจจุบัน (เขียน หรือ ดูตัวอย่าง)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  
  // ข้อมูลในฟอร์ม (หัวข้อ, Slug, คำโปรย, เนื้อหาแบบ Markdown)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });
  
  // รายการรูปภาพของบทความนี้
  const [images, setImages] = useState<any[]>([]);

  // 📥 ดึงข้อมูลบทความจาก Server เมื่อเปิดหน้าแก้ไข
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await adminClient.getBlog(blogId);
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
        });
        setImages(data.images || []);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงรายละเอียดบทความ:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [blogId]);

  // 💾 ฟังก์ชันส่งข้อมูลที่แก้ไขแล้วกลับไปบันทึกที่ Server
  const handleSave = async () => {
    setSaving(true);
    try {
      await adminClient.updateBlog(blogId, formData);
      onSave(); // แจ้งหน้าหลักให้ปิดหน้าแก้ไขและโหลดข้อมูลใหม่
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", err);
      alert("ไม่สามารถบันทึกข้อมูลได้: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "write" | "preview");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const coverImage = images.find(img => img.isCover);
  const otherImages = images.filter(img => !img.isCover);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <AdminHeader
        title="แก้ไขบทความ"
        description="ปรับปรุงเนื้อหาและข้อมูลพื้นฐานของบทความ"
        action={
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} className="rounded-2xl font-bold text-stone-400">
              ยกเลิก
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 font-bold gap-2 shadow-lg shadow-orange-500/20"
            >
              <Save size={18} />
              {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Left: Main Form */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="space-y-6 flex-1 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-stone-800 font-bold text-sm ml-1">ชื่อบทความ *</Label>
                <Input 
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="rounded-2xl border-stone-200 h-12 text-base font-medium"
                  placeholder="ระบุชื่อบทความ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-stone-800 font-bold text-sm ml-1">URL Slug *</Label>
                <Input 
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="rounded-2xl border-stone-200 h-12 text-sm font-mono"
                  placeholder="url-path-example"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-stone-800 font-bold text-sm ml-1">เนื้อหาย่อ</Label>
              <Textarea 
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="rounded-[2rem] border-stone-200 min-h-[100px] resize-none leading-relaxed"
                placeholder="สรุปเนื้อหาบทความสั้นๆ"
              />
            </div>

            <div className="space-y-2 flex-1 flex flex-col relative">
              <div className="flex items-center justify-between mb-2 px-1">
                <Label htmlFor="content" className="text-stone-800 font-bold text-sm">เนื้อหาเต็ม</Label>
                
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList>
                    <TabsTrigger value="write" activeValue={activeTab} onClick={handleTabChange}>
                      <PenLine size={12} /> เขียน
                    </TabsTrigger>
                    <TabsTrigger value="preview" activeValue={activeTab} onClick={handleTabChange}>
                      <Eye size={12} /> ดูตัวอย่าง
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {activeTab === "write" ? (
                <Textarea 
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="rounded-[2rem] border-stone-200 flex-1 min-h-[400px] leading-relaxed font-mono text-sm"
                  placeholder="เขียนเนื้อหาบทความที่นี่... (รองรับ Markdown)"
                />
              ) : (
                <div className="flex-1 min-h-[400px] bg-stone-50/50 rounded-[2rem] border border-stone-200 p-8 overflow-y-auto max-h-[600px]">
                   <div className="prose prose-stone max-w-none prose-headings:text-stone-800 prose-headings:font-black prose-p:text-stone-600 prose-img:rounded-2xl">
                      <ReactMarkdown>{formData.content || "*ยังไม่มีเนื้อหา*"}</ReactMarkdown>
                   </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right: Media Display */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <Label className="text-stone-800 font-bold text-sm ml-1 flex items-center gap-2">
              <ImageIcon size={16} className="text-orange-500" /> รูปปก
            </Label>
            
            <div className="relative aspect-[16/10] bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 shadow-inner">
              {coverImage ? (
                <Image src={coverImage.url} alt="Cover" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
                  <ImageIcon size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider">ยังไม่มีรูปปก</span>
                </div>
              )}
            </div>
            
            <div className="bg-stone-50 p-3 rounded-xl flex items-start gap-2 border border-stone-100">
               <Info size={14} className="text-stone-400 mt-0.5 shrink-0" />
               <p className="text-[10px] text-stone-400 leading-tight">
                 ระบบจัดการรูปภาพกำลังอยู่ระหว่างการพัฒนา ปัจจุบันเน้นการจัดการเนื้อหาตัวอักษร
               </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between ml-1">
              <Label className="text-stone-800 font-bold text-sm">รูปเพิ่มเติม</Label>
              <span className="text-[10px] font-black text-stone-400">{otherImages.length}/6</span>
            </div>

            <div className="grid grid-cols-2 gap-3 opacity-60">
              {otherImages.map((img, i) => (
                <div key={i} className="relative aspect-square bg-stone-50 rounded-2xl overflow-hidden">
                  <Image src={img.url} alt={`Image ${i}`} fill sizes="(max-width: 768px) 50vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
