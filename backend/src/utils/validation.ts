import type { Booking } from '../models/types.js';

export function isValidIsoDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

export function validateBooking(input: Omit<Booking, 'id'>): string | null {
  if (!input.title.trim()) return 'Название бронирования обязательно.';
  if (!input.resourceId) return 'Ресурс обязателен.';
  if (!isValidIsoDate(input.start) || !isValidIsoDate(input.end)) {
    return 'Дата и время должны быть в формате ISO-8601.';
  }
  if (new Date(input.end).getTime() <= new Date(input.start).getTime()) {
    return 'Время окончания должно быть позже времени начала.';
  }
  return null;
}

export function timesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart).getTime() < new Date(bEnd).getTime() &&
    new Date(bStart).getTime() < new Date(aEnd).getTime();
}
