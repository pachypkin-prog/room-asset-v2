import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AppData } from '../models/types.js';

const defaultData: AppData = { rooms: [], assets: [], bookings: [] };
const seedFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../seed/seed.example.json');
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.resolve(moduleDir, '../../data');
const dataFile = path.join(dataDir, 'room-assets.json');

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(dataFile); }
  catch {
    try {
      const seed = await fs.readFile(seedFile, 'utf8');
      JSON.parse(seed);
      await fs.writeFile(dataFile, seed, 'utf8');
    } catch {
      await fs.writeFile(dataFile, JSON.stringify(defaultData, null, 2), 'utf8');
    }
  }
}

export async function readData(): Promise<AppData> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(raw) as AppData;
}

export async function writeData(data: AppData): Promise<void> {
  await ensureStore();
  const tempFile = `${dataFile}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tempFile, dataFile);
}

export { dataFile };
