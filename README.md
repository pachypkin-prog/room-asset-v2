# Room & Assets Manager

Кроссплатформенное учебное приложение для управления аудиториями, оборудованием и бронированиями.

## Архитектура

```text
Browser / React + Vite + MUI + Axios
              |
              | HTTP REST
              v
Node.js + Express + TypeScript
              |
              v
backend/data/room-assets.json
```

## Структура

- `frontend/` — React + TypeScript + Vite + MUI.
- `backend/` — Node.js + Express + TypeScript REST API.
- `seed/seed.example.json` — пример полного набора данных.
- `docs/` — спецификация, UI, данные/API, решения, тесты и совместимость.

## Запуск

### Все сервисы одной командой

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:4000

### Отдельно

```bash
cd backend
npm install
npm run dev
```

В другом терминале:

```bash
cd frontend
npm install
npm run dev
```

## Seed

После первого запуска backend создаёт `backend/data/room-assets.json`. Для загрузки демонстрационных данных можно открыть frontend → импорт/экспорт и выбрать `seed/seed.example.json`.

## Проверка

```bash
npm run build
npm test
```

## Основные API

- `GET /api/rooms`
- `GET /api/assets`
- `GET /api/bookings`
- `POST /api/bookings`
- `PUT /api/bookings/:id`
- `DELETE /api/bookings/:id`
- `GET /api/data/export`
- `POST /api/data/import`

## Время

В API данные хранятся в UTC и передаются как ISO-8601/RFC3339. Frontend преобразует локальное значение формы в UTC перед отправкой и форматирует UTC-время для локального часового пояса пользователя.
