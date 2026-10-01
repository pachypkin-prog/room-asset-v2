import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { BookingsPage } from './pages/BookingsPage';
import { BookingFormPage } from './pages/BookingFormPage';
import { ImportExportPage } from './pages/ImportExportPage';

export default function App() {
  return <BrowserRouter  basename="/room-asset-v2"><Routes><Route element={<Layout />}><Route path="/" element={<Navigate to="/catalog" replace />} /><Route path="/catalog" element={<CatalogPage />} /><Route path="/bookings" element={<BookingsPage />} /><Route path="/bookings/new" element={<BookingFormPage />} /><Route path="/bookings/:id" element={<BookingFormPage />} /><Route path="/data" element={<ImportExportPage />} /></Route></Routes></BrowserRouter>;
}
