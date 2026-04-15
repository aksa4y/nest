# Prime NestJS

**Готовый к продакшену шаблон NestJS с аутентификацией, базой данных и основными функциями.**



<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/github/last-commit/josephgoksu/prime-nestjs.svg" alt="GitHub last commit">
  <img src="https://img.shields.io/node/v/prime-nestjs.svg" alt="Node version">
</p>

Мощный стартовый набор на NestJS с JWT-аутентификацией, PostgreSQL, TypeORM, Swagger-документацией, планировщиком задач и поддержкой Docker из коробки.

## Возможности

- **🔐 JWT Аутентификация** — Bearer-токены с токенами обновления
- **🗄️ PostgreSQL + TypeORM** — Настраиваемый пул соединений, поддержка SSL, миграции
- **📝 Swagger API Документация** — Автогенерация на `/api` (только для разработки)
- **🐳 Docker Compose** — Запуск всего проекта одной командой
- **⏰ Планировщик задач** — Cron-задачи, интервалы и таймауты с @nestjs/schedule
- **🛡️ Авторизация** — Ролевая модель доступа с CASL
- **🧪 Тестирование** — Jest настроен для unit и e2e тестов
- **📏 Качество кода** — ESLint, Prettier, Husky, commitlint
- **🔒 Безопасность** — Helmet, CORS, валидация входных данных с class-validator
- **📊 Health Checks** — Встроенные эндпоинты для мониторинга
- **🪵 Кастомный логгер** — Сервис логгирования с transient scope

## Быстрый старт

### Требования

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL (или используйте Docker)

### Установка

```bash
git clone https://github.com/josephgoksu/prime-nestjs.git
cd prime-nestjs
npm install
cp .env.example .env
```

#### Настройка переменных окружения

Отредактируйте файл `.env` под ваши настройки:

```env
# База данных
POSTGRES_HOST=localhost          # Используйте "database" для Docker
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=postgres
POSTGRES_SSL=false
POSTGRES_SSL_REJECT_UNAUTHORIZED=true
POSTGRES_POOL_SIZE=10

# Приложение
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000

# JWT Аутентификация
JWT_SECRET=your-super-secret-key-here
JWT_ACCESS_TOKEN_EXPIRES_IN=1h
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
```

#### Запуск через Docker (Рекомендуется)

```bash
npm run docker:build
npm run docker:up
```

#### Локальный запуск

```bash
# Убедитесь, что PostgreSQL запущен
npm run start:dev
```

API доступен по адресу `http://localhost:3000`  
Swagger документация по адресу `http://localhost:3000/api`

## Разработка

### Доступные скрипты

```bash
npm run start:dev      # Разработка с hot-reload
npm run start:debug    # Режим отладки с --inspect
npm run build          # Сборка для продакшена
npm run start:prod     # Запуск продакшен сборки
npm run test           # Запуск unit тестов
npm run test:watch     # Тесты в режиме наблюдения
npm run test:cov       # Генерация отчёта о покрытии
npm run test:e2e       # Запуск e2e тестов
npm run lint           # Линтинг и исправление кода
npm run format         # Форматирование кода с Prettier
```

### Команды базы данных

```bash
npm run schema:sync              # Синхронизация схемы БД (только для разработки)
npm run migration:generate       # Генерация миграции из изменений в сущностях
npm run migration:run            # Применение ожидающих миграций
npm run migration:revert         # Откат последней миграции
npm run drop:database            # Удаление всех таблиц
```

### Docker команды

```bash
npm run docker:build   # Сборка Docker контейнеров
npm run docker:up      # Запуск всех сервисов
npm run docker:down    # Остановка всех сервисов
```

### Аудит безопасности

```bash
npm run security:audit   # Запуск npm audit
```

## Структура проекта

```
src/
├── auth/                 # Модуль JWT аутентификации
│   ├── dto/             # Login DTO
│   ├── strategy/        # JWT стратегия и гварды
│   ├── auth.controller.ts
│   └── auth.service.ts
├── config/              # Управление конфигурацией
│   ├── database.ts      # Конфигурация TypeORM DataSource
│   └── index.ts         # Загрузчик конфигурации приложения
├── logger/              # Кастомный сервис логгирования
│   └── logger.service.ts
├── tasks/               # Пример запланированных задач
│   ├── dto/            # Create/Update task DTOs
│   ├── entities/       # Task entity
│   ├── tasks.controller.ts
│   └── tasks.service.ts
├── users/               # Модуль управления пользователями
│   ├── dto/            # User DTOs
│   ├── entities/       # User entity
│   ├── enums/          # Role enum (standard, premium)
│   └── users.service.ts
├── app.module.ts        # Корневой модуль
├── app.controller.ts    # Эндпоинт health check
└── main.ts              # Точка входа приложения
```

## API Эндпоинты

### Аутентификация

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | `/auth/login` | Вход по email/паролю |
| POST | `/auth/register` | Регистрация нового пользователя |

### Пользователи

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| GET | `/users` | Получить всех пользователей | ✅ |
| GET | `/users/:id` | Получить пользователя по ID | ✅ |
| PUT | `/users/:id` | Обновить пользователя | ✅ |
| DELETE | `/users/:id` | Удалить пользователя | ✅ |

### Задачи

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| POST | `/tasks` | Создать задачу | ✅ |
| GET | `/tasks` | Получить все задачи | ✅ |
| GET | `/tasks/:id` | Получить задачу по ID | ✅ |
| PUT | `/tasks/:id` | Обновить задачу | ✅ |
| DELETE | `/tasks/:id` | Удалить задачу | ✅ |

### Системные

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/health-check` | Эндпоинт проверки здоровья |
| GET | `/api` | Swagger документация |

## Архитектура

### Поток аутентификации

Смотрите [подробную документацию по аутентификации](documentation/auth.md) с диаграммами последовательности.

1. Клиент отправляет запрос login/register в `AuthController`
2. `AuthService` проверяет учётные данные и генерирует JWT токен
3. `UsersService` обрабатывает операции с базой данных
4. Защищённые маршруты используют `JwtAuthGuard` и `RolesGuard`

### Конфигурация

Смотрите [документацию по конфигурации](documentation/config.md) для деталей.

- Переменные окружения загружаются через `@nestjs/config`
- Типобезопасная конфигурация с валидацией
- Настройки базы данных конфигурируются через `.env`

## Переменные окружения

| Переменная | Обязательна | По умолчанию | Описание |
|------------|-------------|--------------|----------|
| `POSTGRES_HOST` | ✅ | - | Хост базы данных |
| `POSTGRES_PORT` | ❌ | 5432 | Порт базы данных |
| `POSTGRES_USER` | ✅ | - | Имя пользователя БД |
| `POSTGRES_PASSWORD` | ✅ | - | Пароль БД |
| `POSTGRES_DB` | ✅ | - | Имя базы данных |
| `POSTGRES_SSL` | ❌ | false | Включить SSL соединение |
| `POSTGRES_SSL_REJECT_UNAUTHORIZED` | ❌ | true | Отклонять неавторизованные SSL сертификаты |
| `POSTGRES_POOL_SIZE` | ❌ | 10 | Размер пула соединений |
| `PORT` | ❌ | 3000 | Порт приложения |
| `NODE_ENV` | ❌ | development | Окружение |
| `ALLOWED_ORIGINS` | ❌ | http://localhost:3000 | CORS origins (через запятую) |
| `JWT_SECRET` | ✅ | - | Секрет подписи JWT |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | ❌ | 1h | Время жизни access токена |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | ❌ | 7d | Время жизни refresh токена |

## Лучшие практики безопасности

1. **Никогда не коммитьте файл `.env`** — Добавьте его в `.gitignore`
2. **Используйте стойкие JWT секреты** — Минимум 32 случайных символа
3. **Включайте SSL в продакшене** — Установите `POSTGRES_SSL=true`
4. **Ограничивайте CORS origins** — Указывайте точные домены в `ALLOWED_ORIGINS`
5. **Регулярно проводите аудит безопасности** — Используйте `npm run security:audit`

## Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для вашей фичи (`git checkout -b feature/amazing-feature`)
3. Закоммитьте изменения (`git commit -m 'feat: add amazing feature'`)
4. Запушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

### Соглашение о коммитах

Этот проект использует [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Новая функциональность
- `fix:` Исправление багов
- `docs:` Изменения в документации
- `style:` Изменения стиля кода (форматирование)
- `refactor:` Рефакторинг кода
- `test:` Добавление тестов
- `chore:` Задачи по поддержке проекта

## Лицензия

[MIT](LICENSE)

---

**Создано с использованием NestJS v11 • TypeScript • TypeORM • PostgreSQL**

Если этот шаблон сэкономил вам время, поставьте ему ⭐️
