import { api } from './http';
import type { Booking, BookingInput, ResourceType } from '../types/domain';
export const bookingsApi = {
  getAll: async (params?: { search?: string; date?: string; resourceType?: ResourceType; resourceId?: string }) => (await api.get<Booking[]>('/bookings', { params })).data,
  getById: async (id: string) => (await api.get<Booking>(`/bookings/${id}`)).data,
  create: async (input: BookingInput) => (await api.post<Booking>('/bookings', input)).data,
  update: async (id: string, input: BookingInput) => (await api.put<Booking>(`/bookings/${id}`, input)).data,
  remove: async (id: string) => { await api.delete(`/bookings/${id}`); }
};
