# Карта миграции текущего `room-assets`

Ниже зафиксировано, куда переносится каждая существенная часть исходного монолита.

| Исходный элемент | Новое место | Что меняется |
|---|---|---|
| `Room` interface | `frontend/src/types/domain.ts` + `backend/src/models/types.ts` | Тип используется отдельно клиентом и сервером |
| `Asset` interface | `frontend/src/types/domain.ts` + `backend/src/models/types.ts` | Аналогично |
| `Booking` interface | `frontend/src/types/domain.ts` + `backend/src/models/types.ts` | Аналогично |
| `AppData` | `backend/src/models/types.ts` | Основное состояние теперь принадлежит серверу |
| `mockData` | `seed/seed.example.json` | Демонстрационные данные отделены от UI |
| `initDB()` | удаляется | IndexedDB больше не является основным хранилищем |
| `saveData()` | `backend/src/db/store.ts` | Сохранение выполняется backend |
| `loadData()` | `backend/src/db/store.ts` | Чтение выполняется backend |
| `timesOverlap()` | `backend/src/utils/validation.ts` | Бизнес-правило находится на сервере |
| `validateBooking()` | `backend/src/utils/validation.ts` | Серверная валидация |
| `Header` | `frontend/src/components/Layout.tsx` | UI-композиция |
| `Navigation` | `frontend/src/components/Layout.tsx` | Навигация через React Router |
| `ResourcesList` | `frontend/src/components/Catalog.tsx` | Таблицы каталога |
| `BookingsList` | `frontend/src/components/BookingsTable.tsx` | Таблица получает данные через API |
| `BookingForm` | `frontend/src/pages/BookingFormPage.tsx` | Форма отправляет REST-запросы |
| локальный CRUD booking | `frontend/src/api/bookingsApi.ts` + `backend/src/controllers/bookingsController.ts` + `backend/src/services/bookingService.ts` | CRUD разделён между API-клиентом и сервером |
| поиск/фильтры | `frontend/src/pages/BookingsPage.tsx` + `GET /api/bookings` | UI формирует query-параметры, backend фильтрует |
| импорт/экспорт | `frontend/src/api/dataApi.ts` + `backend/src/controllers/dataController.ts` | Файл формируется/проверяется через API |
| `App.tsx` с бизнес-логикой | `frontend/src/App.tsx` | Остаётся только маршрутизация |

## Поток создания бронирования

```text
BookingFormPage
  -> bookingsApi.create()
  -> POST /api/bookings
  -> bookingsController.postBooking()
  -> bookingService.createBooking()
  -> validation + overlap check
  -> db/store.ts
  -> JSON response
  -> frontend refresh
```

## Что принципиально не переносится один-в-один

IndexedDB из исходного монолита не переносится в `frontend`. При клиент-серверной архитектуре это привело бы к двум независимым источникам данных. Серверное JSON-хранилище выбрано как минимальное учебное хранилище без отдельного DB-сервера.

## Visual migration

The frontend visual layer intentionally preserves the original Room&Assets Manager presentation from `src/App.tsx` and `src/App.css`: header, search, import/export controls, navigation tabs, booking badge, resource cards, booking table, booking form, empty states, colors, spacing, shadows, gradients and responsive behavior. Business logic and data access were moved behind API modules without changing the main user-facing workflow.
