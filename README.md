# Brixo IFSC API

A robust and scalable API service for retrieving Indian Financial System Code (IFSC) details with intelligent caching and smart data retrieval capabilities.

##  Features

- **Smart Data Retrieval**: Automatically fetches fresh data from external APIs when cached data is stale
- **Multi-layer Caching**: Redis-based caching for optimal performance
- **Database Persistence**: MongoDB storage for reliable data management
- **Extensible Architecture**: Easy integration of additional IFSC data providers
- **Comprehensive Validation**: Robust IFSC code validation and error handling
- **API Documentation**: Auto-generated Swagger documentation
- **Docker Support**: Containerized deployment with Docker Compose
- **Test Coverage**: Unit and integration tests for reliability

##  Architecture

The application follows a clean, modular architecture with the following components:

- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Business logic and data orchestration
- **Repository Layer**: Database operations and data persistence
- **Provider Layer**: External API integrations (Razorpay IFSC API)
- **Cache Layer**: Redis-based caching for performance optimization

##  Prerequisites

- Node.js 18+ 
- MongoDB 7.0+
- Redis 7.0+
- Docker & Docker Compose (optional)

##  Installation

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/echewisi/brixo-app
   cd brixo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/brixo-ifsc
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_DB=0
   FRESHNESS_DAYS=7
   CACHE_TTL=60
   ```

4. **Start MongoDB and Redis**
   ```bash
   # Start MongoDB
   mongod
   
   # Start Redis
   redis-server
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

### Docker Setup
(note: the docker setup is a bit rusty so i plea for some leniency)
1. **Development with Docker Compose**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Production with Docker Compose**
   ```bash
   docker-compose up --build
   ```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

##  API Documentation

Once the application is running, visit:
- **API Documentation**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

### Available Endpoints

#### GET /ifsc/:ifsc

Retrieves IFSC details for a given IFSC code.

**Parameters:**
- `ifsc` (string, required): 11-character IFSC code (e.g., HDFC0CAGSBK)

**Response:**
```json
{
  "ifsc": "HDFC0CAGSBK",
  "bank": "HDFC Bank",
  "branch": "CAGSBK",
  "address": "123 Main St, Near Railway Station",
  "contact": "1234567890",
  "city": "Mumbai",
  "district": "Mumbai",
  "state": "Maharashtra",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid IFSC code format
- `404 Not Found`: IFSC code not found
- `503 Service Unavailable`: External API service unavailable

**Example Usage:**
```bash
curl -X GET "http://localhost:3000/ifsc/HDFC0CAGSBK"
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/brixo-ifsc` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | - |
| `REDIS_DB` | Redis database number | `0` |
| `FRESHNESS_DAYS` | Data freshness threshold (days) | `7` |
| `CACHE_TTL` | Cache time-to-live (seconds) | `60` |

### Smart Data Retrieval

The application implements intelligent data retrieval with the following logic:

1. **Cache Check**: First checks Redis cache for the requested IFSC
2. **Database Check**: If cache miss, checks MongoDB for existing data
3. **Freshness Validation**: Validates if database data is within the freshness threshold
4. **External API**: Fetches fresh data from Razorpay IFSC API if data is stale
5. **Update & Cache**: Updates database and caches the fresh data


##  Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   export NODE_ENV=production
   export MONGODB_URI=mongodb://your-mongodb-host:27017/brixo-ifsc
   export REDIS_HOST=your-redis-host
   ```

3. **Start the application**
   ```bash
   npm run start:prod
   ```

### Docker Production Deployment

```bash
docker-compose up -d
```

##  Monitoring & Health Checks

The application includes health check endpoints to monitor:
- Database connectivity
- Cache service status
- External API availability

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api`
- Review the test files for usage examples

##  Future Enhancements

- [ ] Additional IFSC data providers
- [ ] Rate limiting and throttling
- [ ] Metrics and monitoring integration
- [ ] Bulk IFSC lookup endpoints
- [ ] IFSC validation service
- [ ] Historical data tracking
