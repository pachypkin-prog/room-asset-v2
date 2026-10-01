import type { Request, Response } from 'express';
import { readData } from '../db/store.js';

function getParamId(req: Request): string | null {
  const id = req.params.id;
  return typeof id === 'string' ? id : null;
}
export async function getRooms(_req: Request, res: Response) {
  res.json((await readData()).rooms);
}
export async function getRoom(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ message: 'Некорректный идентификатор аудитории.' });
  const room = (await readData()).rooms.find((item) => item.id === id);
  if (!room) return res.status(404).json({ message: 'Аудитория не найдена.' });
  res.json(room);
}
