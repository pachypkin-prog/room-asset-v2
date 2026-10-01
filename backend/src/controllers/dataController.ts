import type { Request, Response } from 'express';
import { readData, writeData } from '../db/store.js';
import type { AppData } from '../models/types.js';

function isData(value: unknown): value is AppData {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<AppData>;
  return Array.isArray(data.rooms) && Array.isArray(data.assets) && Array.isArray(data.bookings);
}

export async function exportData(_req: Request, res: Response) {
  res.setHeader('Content-Disposition', 'attachment; filename="room-assets-export.json"');
  res.json(await readData());
}

export async function importData(req: Request, res: Response) {
  if (!isData(req.body)) return res.status(400).json({ message: 'Неверная структура JSON.' });
  await writeData(req.body);
  res.status(200).json({ message: 'Данные успешно импортированы.', data: req.body });
}
