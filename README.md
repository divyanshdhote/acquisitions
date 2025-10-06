# Acquisitions API

A Node.js Express application with Neon Database integration, containerized for both development and production environments.

## 🚀 Features

- **Express.js** API server
- **Neon Database** with Drizzle ORM
- **Docker** containerization
- **Neon Local** for development
- **JWT** authentication
- **Arcjet** security middleware
- **ESLint** and **Prettier** for code quality

## 📋 Prerequisites

- **Docker** and **Docker Compose** installed
- **Node.js 20+** (for local development without Docker)
- **Neon Database** account and project ([neon.tech](https://neon.tech))

## 🛠️ Project Structure

```
acquisitions/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js             # Server startup
│   ├── index.js              # Application entry point
│   ├── config/
│   │   ├── database.js       # Database configuration
│   │   ├── logger.js         # Logging configuration
│   │   └── arcjet.js         # Security configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Database models (Drizzle)
│   ├── routes/              # API routes
│   └── services/            # Business logic
├── drizzle/                 # Database migrations
├── docker-compose.dev.yml   # Development environment
├── docker-compose.prod.yml  # Production environment
├── Dockerfile              # Multi-stage Docker build
├── .env.example           # Environment template
├── .env.development       # Development configuration
└── .env.production        # Production configuration
```

## 🏗️ Setup Instructions

### 1. Clone and Configure

```bash
git clone <repository-url>
cd acquisitions

# Copy environment files and configure them
cp .env.example .env.development
cp .env.example .env.production
```

### 2. Configure Neon Database

1. **Create a Neon account** at [neon.tech](https://neon.tech)
2. **Create a new project**
3. **Get your credentials** from the Neon Console:
   - `NEON_API_KEY`
   - `NEON_PROJECT_ID`
   - `PARENT_BRANCH_ID` (usually "main")

### 3. Update Environment Files

#### `.env.development`
```bash
# Update these with your actual Neon credentials
NEON_API_KEY=neon_api_1234567890abcdef
NEON_PROJECT_ID=aged-firefly-12345678
PARENT_BRANCH_ID=br-main-123456

# Generate a secure JWT secret
JWT_SECRET=your-development-jwt-secret-here
```

#### `.env.production`
```bash
# Update with your production Neon connection string
DATABASE_URL=postgres://username:password@ep-xyz-123.us-east-1.neon.tech/your_database_name?sslmode=require

# Use a STRONG JWT secret for production
JWT_SECRET=your-very-secure-production-jwt-secret-that-is-long-and-random

# Set your production domain
CORS_ORIGIN=https://yourdomain.com
```

## 🧑‍💻 Development Environment

The development environment uses **Neon Local**, which creates ephemeral database branches for testing.

### Start Development Environment

```bash
# Start with Docker Compose (recommended)
npm run docker:dev

# Or start manually
docker-compose -f docker-compose.dev.yml up --build
```

### Development Features

- **Hot reloading** with `--watch` flag
- **Ephemeral database branches** (created/destroyed with container)
- **Debug logging** enabled
- **Source code mounting** for live updates

### Development URLs

- **Application**: http://localhost:3000
- **Database**: `postgres://neondb_owner:password@localhost:5432/neondb`
- **Drizzle Studio**: `npm run db:studio` (run outside Docker)

### Stop Development Environment

```bash
npm run docker:dev:down

# Or manually
docker-compose -f docker-compose.dev.yml down
```

## 🚀 Production Environment

The production environment connects directly to **Neon Cloud** database.

### Deploy Production Environment

```bash
# Start production services
npm run docker:prod

# Or start manually
docker-compose -f docker-compose.prod.yml up --build -d
```

### Production Features

- **Optimized Node.js image** with multi-stage build
- **Non-root user** for security
- **Resource limits** and **health checks**
- **Production logging** configuration
- **Direct Neon Cloud** database connection

### Production Deployment Checklist

- [ ] Update `DATABASE_URL` with production Neon connection string
- [ ] Set strong `JWT_SECRET`
- [ ] Configure `CORS_ORIGIN` for your domain
- [ ] Update `ARKJET_KEY` with production key
- [ ] Verify all environment variables are set
- [ ] Test database migrations

### Stop Production Environment

```bash
npm run docker:prod:down

# Or manually
docker-compose -f docker-compose.prod.yml down
```

## 📊 Database Management

### Migrations

```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Access Drizzle Studio (development only)
npm run db:studio
```

### Database Access

#### Development (Neon Local)
- **Connection**: `postgres://neondb_owner:password@localhost:5432/neondb`
- **Features**: Ephemeral branches, local proxy

#### Production (Neon Cloud)
- **Connection**: Your Neon Cloud connection string
- **Features**: Serverless, auto-scaling, branching

## 🐳 Docker Commands

### Build Images

```bash
# Build development image
npm run docker:build:dev

# Build production image
npm run docker:build:prod

# Build specific target
docker build --target development -t acquisitions:dev .
docker build --target production -t acquisitions:prod .
```

### View Logs

```bash
# Development logs
npm run docker:logs:dev

# Production logs
npm run docker:logs:prod

# Follow logs
docker-compose -f docker-compose.dev.yml logs -f app
```

### Container Management

```bash
# List running containers
docker ps

# Execute commands in running container
docker exec -it acquisitions-app-dev sh

# Remove all containers and volumes
docker-compose -f docker-compose.dev.yml down -v
```

## 🔒 Environment Variables

### Application Variables

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `NODE_ENV` | `development` | `production` | Environment mode |
| `PORT` | `3000` | `3000` | Server port |
| `LOG_LEVEL` | `debug` | `warn` | Logging level |

### Database Variables

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `DATABASE_URL` | Neon Local | Neon Cloud | Database connection string |
| `NEON_API_KEY` | Required | Not used | Neon API key for Local |
| `NEON_PROJECT_ID` | Required | Not used | Neon project ID |
| `PARENT_BRANCH_ID` | `main` | Not used | Parent branch for ephemeral branches |

### Security Variables

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `JWT_SECRET` | Development key | **Strong production key** | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | `24h` | JWT expiration |
| `BCRYPT_ROUNDS` | `10` | `12` | Password hashing rounds |
| `ARKJET_KEY` | Optional | Required | Arcjet security key |

## 🧪 Testing

```bash
# Run tests in development container
docker exec -it acquisitions-app-dev npm test

# Run linting
npm run lint

# Run formatting
npm run format
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Neon Local Connection Issues
```bash
# Check Neon Local container logs
docker logs neon-local

# Verify environment variables
docker exec -it neon-local env | grep NEON
```

#### 2. Database Connection Errors
```bash
# Test database connectivity
docker exec -it acquisitions-app-dev npm run db:migrate

# Check database URL format
echo $DATABASE_URL
```

#### 3. Container Build Failures
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache
```

#### 4. Permission Issues
```bash
# Fix file permissions
chmod +x scripts/*

# Check container user
docker exec -it acquisitions-app-dev whoami
```

### Health Checks

```bash
# Check application health
curl http://localhost:3000/health

# Check container health
docker inspect acquisitions-app-dev | grep Health -A 10
```

## 📝 Development Workflow

1. **Setup**: Configure environment variables
2. **Start**: `npm run docker:dev`
3. **Develop**: Edit code (auto-reloads)
4. **Migrate**: `npm run db:generate && npm run db:migrate`
5. **Test**: Run tests and linting
6. **Deploy**: `npm run docker:prod`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Run linting: `npm run lint:fix`
5. Submit a pull request

## 📄 License

ISC License - see package.json for details.

---

## 🔗 Useful Links

- [Neon Documentation](https://neon.tech/docs)
- [Neon Local Guide](https://neon.com/docs/local/neon-local)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Docker Compose](https://docs.docker.com/compose/)

For support, please open an issue in the repository.