import { describe, expect, it } from 'vitest';
import { ConflictError, createBooking } from './bookingService.js';
import type { AppData } from '../models/types.js';

const data: AppData = { rooms: [], assets: [], bookings: [{ id: 'b1', resourceType: 'room', resourceId: 'r1', title: 'Existing', start: '2026-10-01T08:00:00Z', end: '2026-10-01T10:00:00Z', notes: '' }] };

describe('booking conflict validation', () => {
  it('rejects an overlapping booking for the same resource', () => {
    expect(() => createBooking(data, { resourceType: 'room', resourceId: 'r1', title: 'Conflict', start: '2026-10-01T09:00:00Z', end: '2026-10-01T11:00:00Z', notes: '' })).toThrow(ConflictError);
  });
  it('allows a booking on another resource', () => {
    expect(() => createBooking({ ...data, bookings: [...data.bookings] }, { resourceType: 'room', resourceId: 'r2', title: 'OK', start: '2026-10-01T09:00:00Z', end: '2026-10-01T11:00:00Z', notes: '' })).not.toThrow();
  });
});
