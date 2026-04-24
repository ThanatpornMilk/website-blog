import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pet Friendly | ทุกเรื่องราวของสัตว์เลี้ยงที่คุณรัก",
  description: "เคล็ดลับการเลี้ยง อาหาร สุขภาพ และพฤติกรรมของสัตว์เลี้ยง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-stone-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
