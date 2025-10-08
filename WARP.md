# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Node.js Express API for an acquisitions system with user authentication and role-based access control. The application uses modern JavaScript (ES modules), PostgreSQL with Drizzle ORM, and follows a clean layered architecture pattern.

## Development Commands

### Core Development

- `npm run dev` - Start development server with file watching
- `npm run lint` - Check code style with ESLint
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

### Database Operations

- `npm run db:generate` - Generate database migrations from schema changes
- `npm run db:migrate` - Apply pending migrations to database
- `npm run db:studio` - Open Drizzle Studio for database management

### Testing Individual Components

- Test authentication endpoints: `curl -X POST http://localhost:3000/api/auth/sign-up -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password123"}'`
- Check health endpoint: `curl http://localhost:3000/health`
- View logs: `tail -f logs/combined.log`

## Architecture

### Layer Structure

The application follows a clean separation of concerns with these layers:

- **Routes** (`src/routes/`) - HTTP endpoint definitions and route handlers
- **Controllers** (`src/controllers/`) - Request/response handling and orchestration
- **Services** (`src/services/`) - Business logic and data operations
- **Models** (`src/models/`) - Database schema definitions using Drizzle ORM
- **Validations** (`src/validations/`) - Input validation schemas using Zod
- **Middleware** (`src/middleware/`) - Cross-cutting concerns (auth, logging)
- **Utils** (`src/utils/`) - Shared utility functions

### Key Architectural Patterns

- **Import Mapping**: Uses Node.js import maps (# prefix) for clean internal imports (e.g., `#config/*`, `#controllers/*`)
- **Error Handling**: Consistent error logging with Winston and structured error responses
- **Authentication**: JWT-based auth with secure HTTP-only cookies
- **Validation**: All inputs validated with Zod schemas before processing
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations

### Authentication Flow

- Users authenticate via `/api/auth/sign-in` endpoint
- JWT tokens stored in HTTP-only cookies for security
- Role-based access control with 'user' and 'admin' roles
- Token verification handled by `authenticateToken` middleware
- Role restrictions enforced by `requireRole` middleware

### Database Schema

- Single `users` table with fields: id, name, email, password (hashed), role, timestamps
- Uses Neon serverless PostgreSQL database
- Drizzle ORM provides type-safe database queries and schema management

## Environment Configuration

Required environment variables (see `.env.example`):

- `PORT` - Server port (defaults to 3000)
- `NODE_ENV` - Environment mode (development/production)
- `LOG_LEVEL` - Winston logging level
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing (critical for security)

## Code Style Guidelines

- ES modules with modern JavaScript (ES2022)
- 2-space indentation with Unix line endings
- Single quotes for strings
- Semicolons required
- Arrow functions preferred
- No unused variables (except those prefixed with `_`)
- Console logging allowed (uses Winston for structured logging)

## Common Development Workflows

### Adding New Features

1. Create route in appropriate routes file
2. Add controller function with validation
3. Implement business logic in service layer
4. Add Zod validation schema if needed
5. Update middleware if cross-cutting concerns involved

### Database Changes

1. Modify schema in `src/models/*.js`
2. Run `npm run db:generate` to create migration
3. Run `npm run db:migrate` to apply changes
4. Test with `npm run db:studio` to verify schema

### Authentication-Protected Endpoints

Use `authenticateToken` middleware for login requirement and `requireRole(['admin'])` for role-specific access.

## File Structure Context

The codebase uses a feature-based organization within a layered architecture. When adding new features (like organizations, deals, etc.), follow the existing pattern of creating corresponding files in each layer (routes, controllers, services, models, validations).

The `src/config/` directory contains shared configuration for database connections and logging that should be imported across the application layers.
