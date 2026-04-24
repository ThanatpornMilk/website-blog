/**
 * Common API Fetcher
 * Manages Base URL configuration, default headers, and global error handling for API requests.
 */

// ตรวจสอบว่าเป็นฝั่ง Server หรือ Client และอยู่ใน Docker หรือไม่
const getBaseUrl = () => {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
  const internalUrl = process.env.INTERNAL_API_URL;
  
  // ถ้าเป็นฝั่ง Server
  if (typeof window === "undefined") {
    // ถ้ามี internalUrl (รันใน Docker) ให้ใช้ตัวนั้น
    // ถ้าไม่มี (รัน Manual) ให้ใช้ publicUrl
    return internalUrl || publicUrl;
  }
  
  return publicUrl;
};

const BASE_URL = getBaseUrl();

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // เพิ่ม Default Headers (เช่น JSON Content-Type)
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // ดำเนินการเรียก API
  const response = await fetch(url, {
    ...options,
    headers,
    // อนุญาตให้ส่ง Cookie ไปด้วยสำหรับ Session-based Auth
    credentials: options.credentials || "include",
  });

  // จัดการ Error พื้นฐาน 
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    // จัดการกรณี 401 Unauthorized (Session หมดอายุ)
    if (response.status === 401 && typeof window !== "undefined") {
      // อาจจะทำการ Redirect ไปหน้า Login ถ้าจำเป็น
      console.warn("Session expired or unauthorized");
    }

    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  // ส่งคืนข้อมูลในรูปแบบ JSON
  return response.json();
}
