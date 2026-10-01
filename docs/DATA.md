# DATA

## Models

`Room`: `id`, `name`, `capacity`, `features[]`.

`Asset`: `id`, `name`, `inventoryCode`, `status`.

`Booking`: `id`, `resourceType`, `resourceId`, `title`, `start`, `end`, `notes`.

## REST API

| Method | Endpoint | Назначение |
|---|---|---|
| GET | `/api/rooms` | Список аудиторий |
| GET | `/api/rooms/:id` | Аудитория |
| GET | `/api/assets` | Список оборудования |
| GET | `/api/assets/:id` | Оборудование |
| GET | `/api/bookings` | Список бронирований и фильтры |
| GET | `/api/bookings/:id` | Бронирование |
| POST | `/api/bookings` | Создание |
| PUT | `/api/bookings/:id` | Изменение |
| DELETE | `/api/bookings/:id` | Удаление |
| GET | `/api/data/export` | Экспорт JSON |
| POST | `/api/data/import` | Импорт JSON |

### Время
`start` и `end` передаются и сохраняются как ISO-8601 UTC-строки, например `2026-10-01T08:00:00Z`.
