import { api } from './http';
import type { Asset } from '../types/domain';
export const assetsApi = { getAll: async () => (await api.get<Asset[]>('/assets')).data, getById: async (id: string) => (await api.get<Asset>(`/assets/${id}`)).data };
