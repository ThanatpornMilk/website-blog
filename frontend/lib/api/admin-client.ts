/**
 * Admin API Client
 * Collection of API interaction functions that require administrative authentication.
 */

import { apiFetch } from "../api";

export const adminClient = {
  // [BLOG] ดึงรายการบทความทัั้งหมดในหน้า Admin
  getBlogs: () => apiFetch("/admin/blogs"),

  // [BLOG] ดึงข้อมูลบทความรายอัน (รวมรูปและเนื้อหาเต็ม)
  getBlog: (id: string) => apiFetch(`/admin/blogs/${id}`),

  // [BLOG] แก้ไขข้อมูลบทความ
  updateBlog: (id: string, data: any) =>
    apiFetch(`/admin/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // [BLOG] เปิด/ปิดการแสดงผลบทความ (Published/Unpublished)
  toggleBlog: (id: string, published: boolean) =>
    apiFetch(`/admin/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ published }),
    }),

  // [COMMENT] ดึงรายการความคิดเห็นทัั้งหมดมาจัดการ
  getComments: () => apiFetch("/admin/comments"),

  // [COMMENT] อัปเดตสถานะ (PENDING, APPROVED, REJECTED)
  updateComment: (id: string, status: string) =>
    apiFetch(`/admin/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // [ADMIN] ตรวจสอบสถานะว่า Login อยู่หรือไม่
  getMe: () => apiFetch("/admin/me"),

  // [ADMIN] ออกจากระบบ
  logout: () => apiFetch("/admin/logout", { method: "POST" }),
};
