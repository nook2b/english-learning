# English Club — приложение

React + TypeScript + Vite, PWA. Данные хранятся локально в IndexedDB (Dexie), состояние — Zustand.

Этап 1 (каркас): экраны-заглушки, локальный прогресс, установка на телефон и работа офлайн. Дизайн временный, его заменит отдельный визуальный стиль.

## Команды

```bash
npm install
npm run dev        # локальный сервер
npm test           # тесты (Vitest)
npm run lint
npm run typecheck
npm run build      # сборка в dist/
```

## Публикация

Каждый push в `master` с изменениями в `app/` собирает приложение и публикует его на GitHub Pages (`.github/workflows/pages.yml`). Адрес: `https://<владелец>.github.io/english-learning/`.

## Структура

```
src/
  app/        оболочка: роутинг по hash, верхняя панель, нижнее меню
  data/       Dexie, store, расчёт стрика
  features/   экраны: path, lesson, review, story, heroines, profile
  ui/         временный UI-кит: кнопки, карточки, окно реплики, учебная панель, заглушка спрайта
```
