# Prime NestJS

**Production-ready NestJS boilerplate with authentication, database, and essential features.**



<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/github/last-commit/josephgoksu/prime-nestjs.svg" alt="GitHub last commit">
  <img src="https://img.shields.io/node/v/prime-nestjs.svg" alt="Node version">
</p>

A robust NestJS starter kit with JWT authentication, PostgreSQL, TypeORM, Swagger docs, scheduled tasks, and Docker support out of the box.

## Features

- **🔐 JWT Authentication** — Bearer token auth with refresh tokens
- **🗄️ PostgreSQL + TypeORM** — Configurable connection pooling, SSL support, migrations
- **📝 Swagger API Docs** — Auto-generated at `/api` (dev only)
- **🐳 Docker Compose** — One command to run everything
- **⏰ Scheduled Tasks** — Cron jobs, intervals, and timeouts with @nestjs/schedule
- **🛡️ Authorization** — Role-based access control with CASL
- **🧪 Testing** — Jest configured for unit and e2e tests
- **📏 Code Quality** — ESLint, Prettier, Husky, commitlint
- **🔒 Security** — Helmet, CORS, input validation with class-validator
- **📊 Health Checks** — Built-in endpoints for monitoring
- **🪵 Custom Logger** — Transient scoped logger service

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL (or use Docker)

### Setup

```bash
git clone https://github.com/josephgoksu/prime-nestjs.git
cd prime-nestjs
npm install
cp .env.example .env
```

#### Configure Environment Variables

Edit `.env` file with your settings:

```env
# Database
POSTGRES_HOST=localhost          # Use "database" for Docker
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=postgres
POSTGRES_SSL=false
POSTGRES_SSL_REJECT_UNAUTHORIZED=true
POSTGRES_POOL_SIZE=10

# Application
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000

# JWT Authentication
JWT_SECRET=your-super-secret-key-here
JWT_ACCESS_TOKEN_EXPIRES_IN=1h
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
```

#### Run with Docker (Recommended)

```bash
npm run docker:build
npm run docker:up
```

#### Run Locally

```bash
# Make sure PostgreSQL is running
npm run start:dev
```

API available at `http://localhost:3000`  
Swagger docs at `http://localhost:3000/api`

## Development

### Available Scripts

```bash
npm run start:dev      # Development with hot-reload
npm run start:debug    # Debug mode with --inspect
npm run build          # Build for production
npm run start:prod     # Run production build
npm run test           # Run unit tests
npm run test:watch     # Watch mode for tests
npm run test:cov       # Generate coverage report
npm run test:e2e       # Run e2e tests
npm run lint           # Lint and fix code
npm run format         # Format code with Prettier
```

### Database Commands

```bash
npm run schema:sync              # Sync database schema (dev only)
npm run migration:generate       # Generate migration from entity changes
npm run migration:run            # Apply pending migrations
npm run migration:revert         # Revert last migration
npm run drop:database            # Drop all tables
```

### Docker Commands

```bash
npm run docker:build   # Build Docker containers
npm run docker:up      # Start all services
npm run docker:down    # Stop all services
```

### Security Audit

```bash
npm run security:audit   # Run npm audit
```

## Project Structure

```
src/
├── auth/                 # JWT authentication module
│   ├── dto/             # Login DTO
│   ├── strategy/        # JWT strategy and guards
│   ├── auth.controller.ts
│   └── auth.service.ts
├── config/              # Configuration management
│   ├── database.ts      # TypeORM DataSource config
│   └── index.ts         # App configuration loader
├── logger/              # Custom logger service
│   └── logger.service.ts
├── tasks/               # Scheduled tasks example
│   ├── dto/            # Create/Update task DTOs
│   ├── entities/       # Task entity
│   ├── tasks.controller.ts
│   └── tasks.service.ts
├── users/               # User management module
│   ├── dto/            # User DTOs
│   ├── entities/       # User entity
│   ├── enums/          # Role enum (standard, premium)
│   └── users.service.ts
├── app.module.ts        # Root module
├── app.controller.ts    # Health check endpoint
└── main.ts              # Application entry point
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/register` | Register new user |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users` | Get all users | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| PUT | `/users/:id` | Update user | ✅ |
| DELETE | `/users/:id` | Delete user | ✅ |

### Tasks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/tasks` | Create task | ✅ |
| GET | `/tasks` | Get all tasks | ✅ |
| GET | `/tasks/:id` | Get task by ID | ✅ |
| PUT | `/tasks/:id` | Update task | ✅ |
| DELETE | `/tasks/:id` | Delete task | ✅ |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health-check` | Health check endpoint |
| GET | `/api` | Swagger documentation |

## Architecture

### Authentication Flow

See [detailed auth documentation](documentation/auth.md) for sequence diagrams.

1. Client sends login/register request to `AuthController`
2. `AuthService` validates credentials and generates JWT token
3. `UsersService` handles database operations
4. Protected routes use `JwtAuthGuard` and `RolesGuard`

### Configuration

See [config documentation](documentation/config.md) for details.

- Environment variables loaded via `@nestjs/config`
- Type-safe configuration with validation
- Database settings configurable via `.env`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `POSTGRES_HOST` | ✅ | - | Database host |
| `POSTGRES_PORT` | ❌ | 5432 | Database port |
| `POSTGRES_USER` | ✅ | - | Database username |
| `POSTGRES_PASSWORD` | ✅ | - | Database password |
| `POSTGRES_DB` | ✅ | - | Database name |
| `POSTGRES_SSL` | ❌ | false | Enable SSL connection |
| `POSTGRES_SSL_REJECT_UNAUTHORIZED` | ❌ | true | Reject unauthorized SSL certs |
| `POSTGRES_POOL_SIZE` | ❌ | 10 | Connection pool size |
| `PORT` | ❌ | 3000 | Application port |
| `NODE_ENV` | ❌ | development | Environment |
| `ALLOWED_ORIGINS` | ❌ | http://localhost:3000 | CORS origins (comma-separated) |
| `JWT_SECRET` | ✅ | - | JWT signing secret |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | ❌ | 1h | Access token expiry |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | ❌ | 7d | Refresh token expiry |

## Security Best Practices

1. **Never commit `.env` file** — Add it to `.gitignore`
2. **Use strong JWT secrets** — At least 32 random characters
3. **Enable SSL in production** — Set `POSTGRES_SSL=true`
4. **Restrict CORS origins** — Specify exact domains in `ALLOWED_ORIGINS`
5. **Run security audits** — Use `npm run security:audit` regularly

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## License

[MIT](LICENSE)

---

**Built with NestJS v11 • TypeScript • TypeORM • PostgreSQL**

If this boilerplate saved you time, consider giving it a ⭐️
