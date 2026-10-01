import type { Request, Response } from 'express';
import { readData } from '../db/store.js';

function getParamId(req: Request): string | null {
  const id = req.params.id;
  return typeof id === 'string' ? id : null;
}
export async function getAssets(_req: Request, res: Response) {
  res.json((await readData()).assets);
}
export async function getAsset(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ message: 'Некорректный идентификатор оборудования.' });
  const asset = (await readData()).assets.find((item) => item.id === id);
  if (!asset) return res.status(404).json({ message: 'Оборудование не найдено.' });
  res.json(asset);
}
