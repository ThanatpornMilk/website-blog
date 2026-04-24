"use client";

import { ReactNode } from "react";

interface TabsProps {
  value: string;
  onValueChange: (value: any) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className = "" }: TabsProps) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export function TabsList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex bg-stone-100 p-1 rounded-xl gap-1 w-fit ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  activeValue: string;
  onClick: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, activeValue, onClick, children, className = "" }: TabsTriggerProps) {
  const isActive = value === activeValue;
  
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
        isActive 
          ? "bg-white text-orange-500 shadow-sm" 
          : "text-stone-400 hover:text-stone-600"
      } ${className}`}
    >
      {children}
    </button>
  );
}
