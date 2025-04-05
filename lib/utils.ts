import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { parseISO, isValid, format } from "date-fns";

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "No date available";
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "Invalid date";
    
    return format(date, "EEE, MMM d, yyyy");
  } catch (error) {
    console.log('format date error: ', error);
    return "Invalid date format";
  }
};

export const formatPrice = (price: number, currency: string = "EUR") => {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: currency,
  }).format(price);
};

export const formatSize = (size: number): string => {
  return `${size} m²`;
};

export const formatRentRange = (min: number, max: number): string => {
  const minFormatted = formatPrice(min);
  const maxFormatted = formatPrice(max);
  
  if (min === max) {
    return minFormatted;
  }
  
  return `${minFormatted} - ${maxFormatted}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImageUrls = (media: any[]): string[] => {
  return media
    .filter(m => m.type === "photo")
    .map(m => m.cdnUrl);
};