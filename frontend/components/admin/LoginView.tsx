/**
 * Login View
 * Admin authentication interface.
 */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Button, Input, Label } from "@/components/ui";

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiFetch("/admin/me");
        router.push("/admin");
      } catch (err) {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-stone-50 min-h-screen font-sans">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl border border-stone-100 p-10 md:p-16">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="bg-orange-500 p-6 rounded-[2rem] text-white mb-6 shadow-2xl shadow-orange-500/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            เข้าสู่ระบบแอดมิน
          </h1>
          <p className="text-stone-400 text-sm mt-3 font-bold uppercase tracking-widest">
            ระบบจัดการบล็อกสัตว์เลี้ยง
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-3">
            <Label className="uppercase tracking-[0.2em] ml-1 text-stone-400 text-[10px]">
              ชื่อผู้ใช้
            </Label>
            <div className="relative">
              <User
                className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300"
                size={20}
              />
              <Input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-16 h-14 rounded-2xl bg-stone-50/50 border-stone-100 focus-visible:ring-orange-500/10"
                placeholder="พิมพ์ชื่อผู้ใช้..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="uppercase tracking-[0.2em] ml-1 text-stone-400 text-[10px]">
              รหัสผ่าน
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300"
                size={20}
              />
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-16 pr-14 h-14 rounded-2xl bg-stone-50/50 border-stone-100 focus-visible:ring-orange-500/10"
                placeholder="พิมพ์รหัสผ่าน..."
              />
              {/* ปุ่มตาเปิด-ปิด */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl text-base font-black bg-stone-900 hover:bg-stone-800 text-white shadow-xl shadow-stone-900/10 transform active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} className="mr-3" /> เข้าสู่ระบบแอดมิน
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
