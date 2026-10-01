import { api } from './http';
import type { Room } from '../types/domain';
export const roomsApi = { getAll: async () => (await api.get<Room[]>('/rooms')).data, getById: async (id: string) => (await api.get<Room>(`/rooms/${id}`)).data };
