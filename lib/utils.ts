import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, getHours } from 'date-fns';
import { id } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number = 1000) => {
  if (ms < 0) {
    console.warn('Waktu sleep tidak boleh negatif, menggunakan default 1000ms');
    ms = 1000;
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function getGreeting(): string {
  const now = new Date();
  const currentHour = getHours(now);

  if (currentHour >= 5 && currentHour < 12) {
    return 'صباح الخير'; 
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'نهارك سعيد'; 
  } else if (currentHour >= 15 && currentHour < 18) {
    return 'مساء الخير'; 
  }

  return 'مساء النور'; 
}

export function formatDate(date: Date | string, pattern: string = 'dd MMMM yyyy'): string {
  return format(new Date(date), pattern, { locale: id });
}