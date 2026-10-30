# English Club — приложение

React + TypeScript + Vite, PWA. Данные хранятся локально в IndexedDB (Dexie), состояние — Zustand.

Сделано: каркас (этап 1), движок занятий и модуль 001–004 целиком (этап 2), исправления по ревизии 30.10 (этап 2.1). Дизайн временный, его заменит отдельный визуальный стиль.

Контент курса лежит в `/content/course` как JSON и проверяется схемами из `src/content/schema.ts` (тест `content.test.ts` падает на любой ошибке в контенте).

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

Каждый push в `master` с изменениями в `app/`, `content/` или `assets/` собирает приложение и публикует его на GitHub Pages (`.github/workflows/pages.yml`). Адрес: `https://<владелец>.github.io/english-learning/`.

## Структура

```
src/
  app/        оболочка: роутинг по hash, верхняя панель, нижнее меню
  content/    схемы контента и загрузка юнитов из /content
  data/       Dexie, store, расчёт стрика
  lesson/     движок занятий: упражнения, проверка ответов, перевод по тапу
  speech/     озвучка (файлы ElevenLabs, иначе Web Speech API), распознавание речи, звуки, движение губ
  story/      спрайты, цепочка замен, сцена
  features/   экраны: path (маршрут), lesson (тетрадь юнита), review, story, heroines, profile
  ui/         временный UI-кит: кнопки, карточки, окно реплики, учебная панель
```
