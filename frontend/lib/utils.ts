/**
 * Shared Utility Functions
 * Contains helper functions for styling (Tailwind merge) and specialized formatting (Thai dates).
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ฟอร์แมตวันที่เป็นรูปแบบภาษาไทย 
 */
export function formatThaiDate(dateString: string | Date, includeTime = false) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (includeTime) {
    options.month = "short";
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  const formatted = date.toLocaleDateString("th-TH", options);
  return includeTime ? `${formatted}น.` : formatted;
}
