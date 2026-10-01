import { api } from './http';
import type { AppData } from '../types/domain';
export async function exportData(): Promise<void> {
  const response = await api.get<AppData>('/data/export');
  const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'room-assets-export.json'; link.click(); URL.revokeObjectURL(url);
}
export async function importData(data: AppData) { return (await api.post<{ data: AppData }>('/data/import', data)).data.data; }
