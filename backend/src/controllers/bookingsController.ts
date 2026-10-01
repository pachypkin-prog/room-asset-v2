import type { Request, Response } from 'express';
import { readData, writeData } from '../db/store.js';
import { ConflictError, ValidationError, createBooking, updateBooking } from '../services/bookingService.js';

function sendError(res: Response, error: unknown) {
  if (error instanceof ConflictError) return res.status(409).json({ message: error.message });
  if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
  console.error(error);
  return res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
}

function getParamId(req: Request): string | null {
  const id = req.params.id;
  return typeof id === 'string' ? id : null;
}
export async function getBookings(req: Request, res: Response) {
  const { search, date, resourceType, resourceId } = req.query;
  let bookings = (await readData()).bookings;
  if (typeof search === 'string' && search.trim()) {
    const term = search.toLocaleLowerCase();
    bookings = bookings.filter((b) => `${b.title} ${b.notes}`.toLocaleLowerCase().includes(term));
  }
  if (typeof date === 'string' && date) bookings = bookings.filter((b) => b.start.slice(0, 10) === date || b.end.slice(0, 10) === date);
  if (resourceType === 'room' || resourceType === 'asset') bookings = bookings.filter((b) => b.resourceType === resourceType);
  if (typeof resourceId === 'string' && resourceId) bookings = bookings.filter((b) => b.resourceId === resourceId);
  bookings.sort((a, b) => a.start.localeCompare(b.start));
  res.json(bookings);
}

export async function getBooking(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ message: 'Некорректный идентификатор бронирования.' });
  const booking = (await readData()).bookings.find((item) => item.id === id);
  if (!booking) return res.status(404).json({ message: 'Бронирование не найдено.' });
  res.json(booking);
}

export async function postBooking(req: Request, res: Response) {
  try {
    const data = await readData();
    const booking = createBooking(data, req.body);
    await writeData(data);
    res.status(201).json(booking);
  } catch (error) { sendError(res, error); }
}

export async function putBooking(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    if (!id) return res.status(400).json({ message: 'Некорректный идентификатор бронирования.' });
    const data = await readData();
    const booking = updateBooking(data, id, req.body);
    await writeData(data);
    res.json(booking);
  } catch (error) { sendError(res, error); }
}

export async function deleteBooking(req: Request, res: Response) {
  const id = getParamId(req);
  if (!id) return res.status(400).json({ message: 'Некорректный идентификатор бронирования.' });
  const data = await readData();
  const index = data.bookings.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: 'Бронирование не найдено.' });
  data.bookings.splice(index, 1);
  await writeData(data);
  res.status(204).send();
}
