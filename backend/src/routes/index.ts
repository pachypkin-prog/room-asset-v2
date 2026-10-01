import { Router } from 'express';
import { getRooms, getRoom } from '../controllers/roomsController.js';
import { getAssets, getAsset } from '../controllers/assetsController.js';
import { getBookings, getBooking, postBooking, putBooking, deleteBooking } from '../controllers/bookingsController.js';
import { exportData, importData } from '../controllers/dataController.js';

export const router = Router();
router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoom);
router.get('/assets', getAssets);
router.get('/assets/:id', getAsset);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBooking);
router.post('/bookings', postBooking);
router.put('/bookings/:id', putBooking);
router.delete('/bookings/:id', deleteBooking);
router.get('/data/export', exportData);
router.post('/data/import', importData);
