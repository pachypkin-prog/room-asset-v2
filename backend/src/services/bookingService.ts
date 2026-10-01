import { randomUUID } from 'node:crypto';
import type { AppData, Booking } from '../models/types.js';
import { timesOverlap, validateBooking } from '../utils/validation.js';

export class ConflictError extends Error {}
export class ValidationError extends Error {}

export function createBooking(data: AppData, input: Omit<Booking, 'id'>): Booking {
  const validationError = validateBooking(input);
  if (validationError) throw new ValidationError(validationError);
  const conflict = data.bookings.some((existing) =>
    existing.resourceType === input.resourceType &&
    existing.resourceId === input.resourceId &&
    timesOverlap(input.start, input.end, existing.start, existing.end)
  );
  if (conflict) throw new ConflictError('Ресурс уже забронирован на выбранный период.');
  const booking: Booking = { ...input, id: randomUUID() };
  data.bookings.push(booking);
  return booking;
}

export function updateBooking(data: AppData, id: string, input: Omit<Booking, 'id'>): Booking {
  const index = data.bookings.findIndex((booking) => booking.id === id);
  if (index === -1) throw new ValidationError('Бронирование не найдено.');
  const validationError = validateBooking(input);
  if (validationError) throw new ValidationError(validationError);
  const conflict = data.bookings.some((existing) =>
    existing.id !== id &&
    existing.resourceType === input.resourceType &&
    existing.resourceId === input.resourceId &&
    timesOverlap(input.start, input.end, existing.start, existing.end)
  );
  if (conflict) throw new ConflictError('Ресурс уже забронирован на выбранный период.');
  const booking: Booking = { ...input, id };
  data.bookings[index] = booking;
  return booking;
}
